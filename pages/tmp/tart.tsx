import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import '../../styles/PageTmpTart.less'
import { LinkButton } from '../../components/LinkButton'
import { Page } from '../../components/Page'
import { NoChild } from '../../lib/reactutil/NoChild'

const ELLIPSIS = 1 as const

type Fluit = string | Fluit[] | { t: typeof ELLIPSIS, s: string }

function stringFluitToHTML(str: string): { __html: string } {
  let html = str.replaceAll(/&/g, '&amp;').replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;')

  for (let i = 0; i < 10; ++i) {
    html = html.replaceAll(String.fromCharCode('₀'.charCodeAt(0) + i), `<sub>${i}</sub>`)
  }

  return { __html: html }
}

const EllipsisView: FC<{ s: string } & NoChild> = ({ s }) => {
  const [visible, setVisible] = useState(false)

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <LinkButton classNames='PageTmpTart-EllipsisView' onClick={() => setVisible(!visible)}>
      {visible ? (
        s
      ) : (
        '…'
      )}
    </LinkButton>
  )
}

function fluitToString(fluit: Fluit): string {
  if (typeof fluit === 'string') {
    return fluit
  }
  if (Array.isArray(fluit)) {
    return fluit.map(fluitToString).join('')
  }
  return '…'
}

const FluitView: FC<{ fluit: Fluit } & NoChild> = ({ fluit }) => {
  return (
    <span>
      {typeof fluit === 'string' ? (
        // eslint-disable-next-line react/no-danger
        <span dangerouslySetInnerHTML={stringFluitToHTML(fluit)} />
      ) : Array.isArray(fluit) ? fluit.map((f, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <FluitView fluit={f} key={i} />
      )) : (
        <EllipsisView s={fluit.s} />
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

const TartView: FC<{ tree: TartTree } & NoChild> = ({ tree }) => {
  const entries = forceMultiLine(tree.entries)

  return (
    <div className='TartView'>
      <details className='TartView-Details'>
        <summary className='TartView-Summary'>
          {entries.flat(1).map((e) => fluitToString(e).substring(0, 20)).join(' // ')}
        </summary>

        <details className='TartView-Details' open>
          <summary className='TartView-Summary'>
            info
          </summary>
          {entries.map((es, j) => (
            // eslint-disable-next-line react/no-array-index-key
            <table className='TartView-Table' key={j}>
              <tbody>
                <tr className='TartView-Row'>
                  {es.map((e, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <td key={i} className='TartView-Entry'>
                      <div className='TartView-EntryWrapper'>
                        <FluitView fluit={e} />
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          ))}
          {tree.result !== '' && (
            <table className='TartView-Table'>
              <tbody>
                <tr className='TartView-Row'>
                  <td className='TartView-Result' colSpan={tree.entries.length}>
                    <div className='TartView-ResultWrapper'>
                      <FluitView fluit={tree.result} />
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

const PageTmpTart: FC<NoChild> = () => {
  const [tree, setTree] = useState<TartTree>({ entries: [], result: '', children: [] })

  const fileChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader()
    reader.onload = () => {
      setTree(JSON.parse(reader.result as string) as TartTree)
    }
    reader.readAsText(ev.target.files![0])
  }

  const fileClick = (ev: MouseEvent<HTMLInputElement>): void => {
    if (ev.target instanceof HTMLInputElement) {
      ev.target.value = ''
    }
  }

  return (
    <Page canonical='/tmp/tart' title='Tart Viewer'>
      <input onChange={fileChange} onClick={fileClick} type='file' />
      <TartView tree={tree} />
    </Page>
  )
}

export default PageTmpTart
