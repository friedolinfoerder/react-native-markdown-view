/* @flow */

import React from 'react'

import {
  Image,
  Text,
  View,
} from 'react-native'

import type {
  CodeBlockNode,
  EmptyNode,
  HeadingNode,
  ImageNode,
  InlineContentNode,
  LinkNode,
  ListNode,
  TableNode,
  TextNode,
  OutputFunction,
  RenderState,
  RenderStyles,
} from './types'

function renderTextBlock(styleName, styleName2) {
  return (node: InlineContentNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
    <Text key={state.key} style={styleName2 ? [styles[styleName], styles[styleName2]] : styles[styleName]}>
      {'\n'}
      {typeof node.content === 'string' ? node.content : output(node.content, state)}
      {'\n'}
    </Text>
  )
}

function renderTextContent(styleName) {
  return (node: InlineContentNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
    <Text key={state.key} style={styles[styleName]}>
      {typeof node.content === 'string' ? node.content : output(node.content, state)}
    </Text>
  )
}

export default Object.freeze({
  blockQuote: renderTextBlock('blockQuote'),
  br: (node: EmptyNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
    <Text key={state.key} style={styles['br']}>
      {'\n\n'}
    </Text>
  ),
  codeBlock: renderTextBlock('codeBlock'),
  del: renderTextContent('del'),
  em: renderTextContent('em'),
  heading: (node: InlineContentNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
    renderTextBlock('heading', 'heading' + node.level)(node, output, state, styles)
  ),
  hr: (node: EmptyNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
    <View key={state.key} style={styles['hr']}/>
  ),
  image: (node: ImageNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
    <Image key={state.key} style={styles['image']} source={{uri: node.target}}/>
  ),
  inlineCode: renderTextContent('inlineCode'),
  link: renderTextContent('link'),
  // TODO: Implement
  list: (node: ListNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
    null
  ),
  newline: (node: EmptyNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
    <Text key={state.key} style={styles['newline']}>
      {'\n'}
    </Text>
  ),
  paragraph: renderTextContent('paragraph'),
  strong: renderTextContent('strong'),
  // TODO: Implement
  table: (node: TableNode, output: OutputFunction, state: RenderState, styles: RenderStyles) => (
    null
  ),
  text: renderTextContent('text'),
  u: renderTextContent('u')
})