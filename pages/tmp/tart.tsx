import classNames from 'classnames'
import { type ChangeEvent, type FC, type MouseEvent, useCallback, useState } from 'react'
import { z } from 'zod'
import { LinkButton } from '../../components/LinkButton'
import { Page } from '../../components/Page'

const ELLIPSIS = 1 as const
const PAREN = 2 as const

type Fluit =
  string | Fluit[] | { t: typeof ELLIPSIS, s: string } | { t: typeof PAREN, o: string, f: Fluit }

function stringFluitToHTML(str: string): { __html: string } {
  let html = str.replaceAll(/&/gu, '&amp;').replaceAll(/</gu, '&lt;').replaceAll(/>/gu, '&gt;')

  for(let i = 0; i < 10; i += 1) {
    html = html.replaceAll(String.fromCharCode('₀'.charCodeAt(0) + i), `<sub>${i}</sub>`)
  }

  return { __html: html }
}

const EllipsisView: FC<{ s: string }> = ({ s }) => {
  const [visible, setVisible] = useState(false)

  return (
    <LinkButton classNames='PageTmpTart-EllipsisView' onClick={useCallback(() => { setVisible(!visible) }, [visible])}>
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

const FluitView: FC<{ fluit: Fluit, level: number }> = ({ fluit, level }) => (
  <span>
    {typeof fluit === 'string' ? (
      <span dangerouslySetInnerHTML={stringFluitToHTML(fluit)} />
    ) : Array.isArray(fluit) ? fluit.map((f, i) => (
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

interface TartTree {
  entries: Fluit[] | Fluit[][]
  result: Fluit
  children: TartTree[]
}

const FluitSchema: z.ZodType<Fluit> = z.lazy(() => z.union([
  z.string(),
  z.array(FluitSchema),
  z.object({ t: z.literal(ELLIPSIS), s: z.string() }),
  z.object({ t: z.literal(PAREN), o: z.string(), f: FluitSchema }),
]))

const TartTreeSchema: z.ZodType<TartTree> = z.lazy(() => z.object({
  entries: z.array(z.array(FluitSchema)),
  result: FluitSchema,
  children: z.array(TartTreeSchema),
}))

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
            <table className='PageTmpTart-TartView-Table' key={j}>
              <tbody>
                <tr className='PageTmpTart-TartView-Row'>
                  {es.map((e, i) => (
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
      if(typeof reader.result !== 'string') { return }
      const parseResult = TartTreeSchema.safeParse(JSON.parse(reader.result))
      if(parseResult.success) {
        setTree(parseResult.data)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    reader.readAsText(ev.target.files![0])
  }

  const fileClick = ({ currentTarget: fileInputElement }: MouseEvent<HTMLInputElement>): void => {
    fileInputElement.value = ''
  }

  const expandClick = (): void => {
    [...document.getElementsByTagName('details')].forEach((detailsElement) => { detailsElement.open = true })
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
