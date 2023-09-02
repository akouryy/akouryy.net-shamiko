import classNames from 'classnames'
import React, { ChangeEvent, FC, MouseEvent, useCallback, useState } from 'react'
import { LinkButton } from '../../components/LinkButton'
import { Page } from '../../components/Page'

const ELLIPSIS = 1 as const
const PAREN = 2 as const

type Fluit =
  string | Fluit[] | { t: typeof ELLIPSIS, s: string } | { t: typeof PAREN, o: string, f: Fluit }

function stringFluitToHTML(str: string): { __html: string } {
  let html = str.replaceAll(/&/g, '&amp;').replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;')

  for(let i = 0; i < 10; ++i) {
    html = html.replaceAll(String.fromCharCode('₀'.charCodeAt(0) + i), `<sub>${i}</sub>`)
  }

  return { __html: html }
}

const EllipsisView: FC<{ s: string }> = ({ s }) => {
  const [visible, setVisible] = useState(false)

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <LinkButton classNames='PageTmpTart-EllipsisView' onClick={useCallback(() => setVisible(!visible), [visible])}>
      {visible ? (
        s
      ) : (
        '…'
      )}
    </LinkButton>
  )
}

function fluitToString(fluit: Fluit): string {
  if(typeof fluit === 'string') {
    return fluit
  }
  if(Array.isArray(fluit)) {
    return fluit.map(fluitToString).join('')
  }
  return '…'
}

const FluitView: FC<{ fluit: Fluit, level: number }> = ({ fluit, level }) => {
  return (
    <span>
      {typeof fluit === 'string' ? (
        // eslint-disable-next-line react/no-danger
        <span dangerouslySetInnerHTML={stringFluitToHTML(fluit)} />
      ) : Array.isArray(fluit) ? fluit.map((f, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <FluitView fluit={f} key={i} level={level} />
      )) : fluit.t === ELLIPSIS ? (
        <EllipsisView s={fluit.s} />
      ) : (
        <>
          <span className={classNames('PageTmpTart-FluitView-Paren', `_Level${level % 7}`)}>
            {fluit.o}
          </span>
          <FluitView fluit={fluit.f} level={level + 1} />
          <span className={classNames('PageTmpTart-FluitView-Paren', `_Level${level % 7}`)}>
            {
              fluit.o.replace('(', ')').replace('{', '}').replace('[', ']')
                .replace('【', '】').replace('❰', '❱')
            }
          </span>
        </>
      )}
    </span>
  )
}

interface TartTree {
  entries: Fluit[] | Fluit[][]
  result: Fluit
  children: TartTree[]
}

function isSingleLine(entries: Fluit[] | Fluit[][]): entries is Fluit[] {
  // TODO: 配列はFluit内でも利用される
  return !Array.isArray(entries[0]) && false
}

function forceMultiLine(entries: Fluit[] | Fluit[][]): Fluit[][] {
  return isSingleLine(entries) ? [entries] : entries
}

const TartView: FC<{ tree: TartTree }> = ({ tree }) => {
  const entries = forceMultiLine(tree.entries)

  return (
    <div className='PageTmpTart-TartView'>
      <details className='PageTmpTart-TartView-Details'>
        <summary className='PageTmpTart-TartView-Summary'>
          {entries.flat(1).map((e) => fluitToString(e).substring(0, 20)).join(' // ')}
        </summary>

        <details className='PageTmpTart-TartView-Details' open>
          <summary className='PageTmpTart-TartView-Summary'>
            info
          </summary>
          {entries.map((es, j) => (
            // eslint-disable-next-line react/no-array-index-key
            <table className='PageTmpTart-TartView-Table' key={j}>
              <tbody>
                <tr className='PageTmpTart-TartView-Row'>
                  {es.map((e, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <td className='PageTmpTart-TartView-Entry' key={i}>
                      <div className='PageTmpTart-TartView-EntryWrapper'>
                        <FluitView fluit={e} level={0} />
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          ))}
          {tree.result !== '' && (
            <table className='PageTmpTart-TartView-Table'>
              <tbody>
                <tr className='PageTmpTart-TartView-Row'>
                  <td className='PageTmpTart-TartView-Result' colSpan={tree.entries.length}>
                    <div className='PageTmpTart-TartView-ResultWrapper'>
                      <FluitView fluit={tree.result} level={0} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </details>

        {tree.children.map((child, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TartView key={i} tree={child} />
        ))}
      </details>
    </div>
  )
}

const PageTmpTart: FC<Record<string, never>> = () => {
  const [tree, setTree] = useState<TartTree>({ entries: [], result: '', children: [] })

  const fileChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader()
    reader.onload = () => {
      setTree(JSON.parse(reader.result as string) as TartTree)
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    reader.readAsText(ev.target.files![0])
  }

  const fileClick = (ev: MouseEvent<HTMLInputElement>): void => {
    if(ev.target instanceof HTMLInputElement) {
      ev.target.value = ''
    }
  }

  const expandClick = (): void => {
    [...document.getElementsByTagName('details')].forEach((d) => { d.open = true })
  }

  return (
    <Page canonical='/tmp/tart' className='PageTmpTart-Page' title='Tart Viewer'>
      <input onChange={fileChange} onClick={fileClick} type='file' />
      <button onClick={expandClick} type='button'>
        全て展開
      </button>
      <TartView tree={tree} />
    </Page>
  )
}

export default PageTmpTart
