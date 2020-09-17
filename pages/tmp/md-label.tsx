/* eslint-disable no-alert */
/* eslint-disable max-len */

import classnames from 'classnames'
import React from 'react'
import uuidv4 from 'uuid/v4'
import '../../styles/PageTmpMdLabel.less'
import { Button } from '../../components/Button'
import { LinkButton } from '../../components/LinkButton'
import { Modal } from '../../components/Modal'
import { Page } from '../../components/Page'
import { Section } from '../../components/Section'
import { identity } from '../../lib/util'

type DateLabel = 'morning' | 'noon' | 'night' | 'post'

const dateLabels = Array<DateLabel>('morning', 'noon', 'night', 'post')

const isDateLabel = (s: string): s is DateLabel => identity<string[]>(dateLabels).includes(s)

const rotDate: Record<DateLabel, DateLabel> =
  { morning: 'noon', noon: 'night', night: 'post', post: 'morning' }

const dateHanzi: Record<DateLabel, string> =
  { morning: '朝', noon: '昼', night: '夜', post: '終' }

type PriorityLabel = 'precious' | 'high' | 'middle' | 'low'

const priorityLabels = Array<PriorityLabel>('precious', 'high', 'middle', 'low')

const isPriorityLabel = (s: string): s is PriorityLabel => identity<string[]>(priorityLabels).includes(s)

const rotPriority: Record<PriorityLabel, PriorityLabel> =
  { precious: 'low', high: 'precious', middle: 'high', low: 'middle' }

const priorityHanzi: Record<PriorityLabel, string> =
  { precious: '貴', high: '高', middle: '中', low: '低' }

const priorityCode: Record<PriorityLabel, number> =
  { precious: 4, high: 3, middle: 2, low: 1 }

type CategoryLabel = 'prog' | 'infra'

const categoryLabels = Array<CategoryLabel>('prog', 'infra')

const isCategoryLabel = (s: string): s is CategoryLabel => identity<string[]>(categoryLabels).includes(s)

const rotCategory: Record<CategoryLabel, CategoryLabel> =
  { prog: 'infra', infra: 'prog' }

const categoryHanzi: Record<CategoryLabel, string> =
  { prog: '理', infra: '盤' }

interface MdLine {
  id: string
  text: string
  date: DateLabel
  priority: PriorityLabel
  category: CategoryLabel
}

const toLines = (str: string): MdLine[] => {
  return str.split('\n')
    .filter((l) => l.length > 0)
    .map((l): MdLine => ({
      id: uuidv4(),
      text: l,
      date: 'post',
      priority: 'low',
      category: 'prog',
    }))
}

interface LineFilter {
  date?: DateLabel | false
  priority?: PriorityLabel | false
  category?: CategoryLabel | false
}

/// /////////////////////////////////////////////////////////////////////////////
const MdLineView: React.FC<{
  children?: never
  line: MdLine
  mergeTwoLines: (line: MdLine) => void
  startEditLine: (line: MdLine) => void
  updateLine: (line: MdLine) => void
}> = ({ line, mergeTwoLines, startEditLine, updateLine }) => {
  return (
    <div className={classnames(
      'PageTmpMdLabel-MdLineView',
      `PageTmpMdLabel-MdLineView-_date_${line.date}`,
      `PageTmpMdLabel-MdLineView-_priority_${line.priority}`,
      `PageTmpMdLabel-MdLineView-_category_${line.category}`,
    )}
    >
      <div className='PageTmpMdLabel-MdLineView-Menu'>
        <LinkButton
          classNames='PageTmpMdLabel-MdLineView-Rot'
          onClick={() => updateLine({ ...line, date: rotDate[line.date] })}
        >
          {dateHanzi[line.date]}
        </LinkButton>
        {' '}
        <LinkButton
          classNames='PageTmpMdLabel-MdLineView-Rot'
          onClick={() => updateLine({ ...line, priority: rotPriority[line.priority] })}
        >
          {priorityHanzi[line.priority]}
        </LinkButton>
        {' '}
        <LinkButton
          classNames='PageTmpMdLabel-MdLineView-Rot'
          onClick={() => updateLine({ ...line, category: rotCategory[line.category] })}
        >
          {categoryHanzi[line.category]}
        </LinkButton>
        <br />
        <Button onClick={() => mergeTwoLines(line)}>併</Button>
        <Button onClick={() => startEditLine(line)}>編</Button>
      </div>
      <div className='PageTmpMdLabel-MdLineView-Text'>
        {line.text}
      </div>
    </div>
  )
}

/// /////////////////////////////////////////////////////////////////////////////
const EditModal: React.FC<{
  children?: never
  line: MdLine | null
  replaceLines: (oldID: string, ls: MdLine[]) => void
}> = ({ line, replaceLines }) => {
  const [isShown, setShown] = React.useState(false)
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    setShown(!!line)
    if (line) {
      setText(line.text)
    }
  }, [line])

  const update = (): void => {
    if (!line) { return }

    const ls = text.split('\n\n').map((t, i): MdLine => ({
      ...line,
      id: i === 0 ? line.id : uuidv4(),
      text: t,
    }))

    replaceLines(line.id, ls)

    setShown(false)
  }

  if (!isShown) { return null }

  return (
    <Modal hider={() => setShown(false)}>
      <p>2連続の改行を区切りとして分割されます</p>

      <textarea
        className='PageTmpMdLabel-EditModal-TextArea'
        cols={100}
        onChange={(ev) => setText(ev.target.value)}
        rows={30}
        value={text}
      />
      <Button onClick={update}>更新</Button>
    </Modal>
  )
}

/// /////////////////////////////////////////////////////////////////////////////
const FilterSelect: React.FC<{
  children?: never
  onUpdate: (v: string) => void
  options: Array<[string, string]>
  value: string
}> = ({ onUpdate, options, value }) => {
  return (
    <select onChange={(ev) => onUpdate(ev.target.value)} value={value}>
      {options.map(([v, d]) => (
        <option key={v} value={v}>{d}</option>
      ))}
    </select>
  )
}

/// /////////////////////////////////////////////////////////////////////////////
interface P {
  children?: never
}

const PageTmpMdLabel: React.FC<P> = () => {
  React.useEffect(() => {
    window.addEventListener('beforeunload', (ev) => {
      ev.returnValue = '変更は保存されません'
    })
  }, [])

  const [showMarkdownModal, setShowMarkdownModal] = React.useState(false)
  const [inputText, setInputText] = React.useState('')
  const [showJSONModal, setShowJSONModal] = React.useState(false)
  const [inputJSONText, setInputJSONText] = React.useState('')
  const [lines, setLines] = React.useState(Array<MdLine>())
  const [editingLine, setEditingLine] = React.useState<MdLine | null>(null)
  const [lineFilter, setLineFilter] = React.useState<LineFilter>({})

  const parseAndSetJSONLines = (str: string | null): boolean => {
    const ls = str && (JSON.parse(str) as MdLine[])
    if (Array.isArray(ls) && ls.length >= 1 && ls[0].priority) {
      setLines(ls)
      return true
    }
    return false
  }

  React.useEffect(() => {
    parseAndSetJSONLines(window.localStorage.getItem('PageTmpMdLabel.lines'))
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem('PageTmpMdLabel.lines', JSON.stringify(lines))
  }, [lines])

  const mergeTwoLines = (firstLine: MdLine): void => {
    const i = lines.findIndex((l) => l.id === firstLine.id)

    if (i + 1 === lines.length) { return }
    const line: MdLine = {
      ...lines[i],
      text: `${lines[i].text}\n${lines[i + 1].text}`,
    }
    setLines([...lines.slice(0, i), line, ...lines.slice(i + 2)])
  }

  const replaceLines = (id: string, newLines: MdLine[]): void => {
    const i = lines.findIndex((l) => l.id === id)
    setLines([...lines.slice(0, i), ...newLines, ...lines.slice(i + 1)])
  }

  const updateLine = (line: MdLine): void => replaceLines(line.id, [line])

  const filteredLines = lines.filter((l) => (
    (!lineFilter.date || l.date === lineFilter.date) &&
    (!lineFilter.priority || priorityCode[l.priority] >= priorityCode[lineFilter.priority]) &&
    (!lineFilter.category || l.category === lineFilter.category)
  ))

  return (
    <Page canonical='/tmp/md-label' title='Markdown Labeler'>
      <Section title='Markdown Labeler (仮)'>
        <p>ISUCON9本選前日に作った</p>

        <Button onClick={() => setShowMarkdownModal(true)}>Markdown入力</Button>
        <Button onClick={() => { setShowJSONModal(true); setInputJSONText(JSON.stringify(lines)) }}>
          Im/Export as JSON
        </Button>

        {showMarkdownModal && (
          <Modal hider={() => setShowMarkdownModal(false)}>
            <p>Markdownを入力してください</p>
            <textarea
              cols={100}
              onChange={(ev) => setInputText(ev.target.value)}
              rows={30}
              value={inputText}
            />
            <Button onClick={() => window.confirm('古いデータを消しますか?') && setLines(toLines(inputText))}>
              置換
            </Button>
            <Button onClick={() => setLines([...lines, ...toLines(inputText)])}>追加</Button>
          </Modal>
        )}

        {showJSONModal && (
          <Modal hider={() => setShowJSONModal(false)}>
            <p>Markdownとラベルの情報を保持するJSONを入力してください</p>
            <textarea
              cols={100}
              onChange={(ev) => setInputJSONText(ev.target.value)}
              rows={30}
              value={inputJSONText}
            />
            <Button onClick={() => {
              if (window.confirm('古いデータを消しますか?')) {
                if (parseAndSetJSONLines(inputJSONText)) {
                  window.alert('ok')
                }
              }
            }}
            >
              置換
            </Button>
          </Modal>
        )}

        <br />

        <FilterSelect
          onUpdate={(v) => setLineFilter({ ...lineFilter, date: isDateLabel(v) && v })}
          options={[
            ['all', '全時間帯'],
            ['morning', '朝'],
            ['noon', '昼'],
            ['night', '夜'],
            ['post', '終了後'],
          ]}
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          value={lineFilter.date || 'all'}
        />

        <FilterSelect
          onUpdate={(v) => setLineFilter({ ...lineFilter, priority: isPriorityLabel(v) && v })}
          options={[
            ['low', '全重要度'],
            ['middle', '「中」以上'],
            ['high', '「高」以上'],
            ['precious', '「貴」'],
          ]}
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          value={lineFilter.priority || 'low'}
        />

        <FilterSelect
          onUpdate={(v) => setLineFilter({ ...lineFilter, category: isCategoryLabel(v) && v })}
          options={[
            ['all', '全カテゴリ'],
            ['prog', 'プログラム(理)'],
            ['infra', '基盤(盤)'],
          ]}
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          value={lineFilter.category || 'all'}
        />

        <main className='PageTmpMdLabel-Lines'>
          {filteredLines.map((line) => (
            <MdLineView
              key={line.id}
              line={line}
              mergeTwoLines={mergeTwoLines}
              startEditLine={setEditingLine}
              updateLine={updateLine}
            />
          ))}
        </main>
        <EditModal line={editingLine} replaceLines={replaceLines} />
      </Section>
    </Page>
  )
}

export default PageTmpMdLabel
