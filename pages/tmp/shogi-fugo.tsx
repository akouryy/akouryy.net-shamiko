import React, { useState } from 'react'
import { Page } from '../../components/Page'
import { Section } from '../../components/Section'

const PieceE2J = {
  p: '歩',
  l: '香',
  n: '桂',
  s: '銀',
  g: '金',
  b: '角',
  r: '飛',
  k: '玉',
  P: 'と',
  L: '杏',
  N: '圭',
  S: '全',
  B: '馬',
  R: '龍',
}
const NotationRegExp = /([sg]?)(?:([1-9])([1-9])|(=))([plnsgbrkPLNSBR])([右直左]?[上寄引]?)([+*]?)/g

function convertNotations(input: string): string {
  let isNextSente = true
  return input.replace(NotationRegExp, (
    _, player: string, col: string, row: string, same: string,
    piece: string, move: string, promote: string,
  ) => {
    const isSente = player === 's' || player === '' && isNextSente
    isNextSente = !isSente
    return `${
        isSente ? '☗' : '☖'
      }${
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        same === '=' ? '同' : String.fromCodePoint('０'.codePointAt(0)! + +col) + '？一二三四五六七八九'[+row]
      }${
        PieceE2J[piece as keyof typeof PieceE2J]
      }${
        move
      }${
        promote === '+' ? '成' : promote === '*' ? '打' : ''
      }`
  })
}

const PageTmpShogiFugo: React.FC<Record<string, never>> = () => {
  const [input, setInput] = useState('')
  const output = convertNotations(input)

  return (
    <Page canonical='/tmp/md-label' title='Markdown Labeler'>
      <Section title='将棋符号入力'>
        <p>
          <code>
            記法:
            {NotationRegExp.toString()}
          </code>
        </p>
        <p>
          <textarea
            cols={100}
            onChange={(ev) => setInput(ev.target.value)}
            rows={15}
            value={input}
          />
        </p>
        <p>
          <textarea cols={100} readOnly rows={15} value={output} />
        </p>
      </Section>
    </Page>
  )
}

export default PageTmpShogiFugo
