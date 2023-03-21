/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import classnames from 'classnames'
import React, { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../../components/Button'
import { LinkButton } from '../../components/LinkButton'
import { Modal } from '../../components/Modal'
import { Page } from '../../components/Page'
import { Section } from '../../components/Section'
import { NoChild } from '../../lib/reactutil/NoChild'
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
  line: MdLine
  mergeTwoLines: (line: MdLine) => void
  startEditLine: (line: MdLine) => void
  updateLine: (line: MdLine) => void
} & NoChild> = ({ line, mergeTwoLines, startEditLine, updateLine }) => {
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
          onClick={useCallback(() => updateLine({ ...line, date: rotDate[line.date] }), [line, updateLine])}
        >
          {dateHanzi[line.date]}
        </LinkButton>
        {' '}
        <LinkButton
          classNames='PageTmpMdLabel-MdLineView-Rot'
          onClick={useCallback(() => updateLine({ ...line, priority: rotPriority[line.priority] }), [line, updateLine])}
        >
          {priorityHanzi[line.priority]}
        </LinkButton>
        {' '}
        <LinkButton
          classNames='PageTmpMdLabel-MdLineView-Rot'
          onClick={useCallback(() => updateLine({ ...line, category: rotCategory[line.category] }), [line, updateLine])}
        >
          {categoryHanzi[line.category]}
        </LinkButton>
        <br />
        <Button onClick={useCallback(() => mergeTwoLines(line), [line, mergeTwoLines])}>併</Button>
        <Button onClick={useCallback(() => startEditLine(line), [line, startEditLine])}>編</Button>
      </div>
      <div className='PageTmpMdLabel-MdLineView-Text'>
        {line.text}
      </div>
    </div>
  )
}

/// /////////////////////////////////////////////////////////////////////////////
const EditModal: React.FC<{
  line: MdLine | null
  replaceLines: (oldID: string, ls: MdLine[]) => void
} & NoChild> = ({ line, replaceLines }) => {
  const [isShown, setShown] = React.useState(false)
  const [text, setText] = React.useState('')

  React.useEffect(() => {
    setShown(!!line)
    if(line) {
      setText(line.text)
    }
  }, [line])

  const update = useCallback((): void => {
    if(!line) { return }

    const ls = text.split('\n\n').map((t, i): MdLine => ({
      ...line,
      id: i === 0 ? line.id : uuidv4(),
      text: t,
    }))

    replaceLines(line.id, ls)

    setShown(false)
  }, [line, replaceLines, text])

  const hider = useCallback(() => setShown(false), [])

  if(!isShown) { return null }

  return (
    <Modal hider={hider}>
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
  onUpdate: (v: string) => void
  options: Array<[string, string]>
  value: string
} & NoChild> = ({ onUpdate, options, value }) => {
  return (
    <select onChange={(ev) => onUpdate(ev.target.value)} value={value}>
      {options.map(([v, d]) => (
        <option key={v} value={v}>{d}</option>
      ))}
    </select>
  )
}

/// /////////////////////////////////////////////////////////////////////////////

const PageTmpMdLabel: React.FC<NoChild> = () => {
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

  const parseAndSetJSONLines = useCallback((str: string | null): boolean => {
    const ls = str && (JSON.parse(str) as MdLine[])
    if(Array.isArray(ls) && ls.length >= 1 && ls[0].priority) {
      setLines(ls)
      return true
    }
    return false
  }, [])

  React.useEffect(() => {
    parseAndSetJSONLines(window.localStorage.getItem('PageTmpMdLabel.lines'))
  }, [parseAndSetJSONLines])

  React.useEffect(() => {
    window.localStorage.setItem('PageTmpMdLabel.lines', JSON.stringify(lines))
  }, [lines])

  const mergeTwoLines = useCallback((firstLine: MdLine): void => {
    const i = lines.findIndex((l) => l.id === firstLine.id)

    if(i + 1 === lines.length) { return }
    const line: MdLine = {
      ...lines[i],
      text: `${lines[i].text}\n${lines[i + 1].text}`,
    }
    setLines([...lines.slice(0, i), line, ...lines.slice(i + 2)])
  }, [lines])

  const replaceLines = useCallback((id: string, newLines: MdLine[]): void => {
    const i = lines.findIndex((l) => l.id === id)
    setLines([...lines.slice(0, i), ...newLines, ...lines.slice(i + 1)])
  }, [lines])

  const updateLine = useCallback((line: MdLine): void => replaceLines(line.id, [line]), [replaceLines])

  const filteredLines = lines.filter((l) => (
    (!lineFilter.date || l.date === lineFilter.date) &&
    (!lineFilter.priority || priorityCode[l.priority] >= priorityCode[lineFilter.priority]) &&
    (!lineFilter.category || l.category === lineFilter.category)
  ))

  const markdownModalHider = useCallback(() => setShowMarkdownModal(false), [])
  const markdownModalReplace =
    useCallback(() => window.confirm('古いデータを消しますか?') && setLines(toLines(inputText)), [inputText, setLines])
  const markdownModalAdd =
    useCallback(() => setLines([...lines, ...toLines(inputText)]), [inputText, lines, setLines])
  const jsonModalHider = useCallback(() => setShowJSONModal(false), [])
  const jsonModalReplace = useCallback(() => {
    if(window.confirm('古いデータを消しますか?') && parseAndSetJSONLines(inputJSONText)) {
      setShowJSONModal(false)
    }
  }, [inputJSONText, parseAndSetJSONLines])

  return (
    <Page canonical='/tmp/md-label' title='Markdown Labeler'>
      <Section title='Markdown Labeler (仮)'>
        <p>ISUCON9本選前日に作った</p>

        <Button onClick={useCallback(() => setShowMarkdownModal(true), [])}>Markdown入力</Button>
        <Button onClick={useCallback(() => { setShowJSONModal(true); setInputJSONText(JSON.stringify(lines)) }, [lines])}>
          Im/Export as JSON
        </Button>

        {showMarkdownModal && (
          <Modal hider={markdownModalHider}>
            <p>Markdownを入力してください</p>
            <textarea
              cols={100}
              onChange={(ev) => setInputText(ev.target.value)}
              rows={30}
              value={inputText}
            />
            <Button onClick={markdownModalReplace}>置換</Button>
            <Button onClick={markdownModalAdd}>追加</Button>
          </Modal>
        )}

        {showJSONModal && (
          <Modal hider={jsonModalHider}>
            <p>Markdownとラベルの情報を保持するJSONを入力してください</p>
            <textarea
              cols={100}
              onChange={(ev) => setInputJSONText(ev.target.value)}
              rows={30}
              value={inputJSONText}
            />
            <Button onClick={jsonModalReplace}>置換</Button>
          </Modal>
        )}

        <br />

        <FilterSelect
          onUpdate={useCallback((v) => setLineFilter({ ...lineFilter, date: isDateLabel(v) && v }), [lineFilter])}
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
          onUpdate={useCallback((v) => setLineFilter({ ...lineFilter, priority: isPriorityLabel(v) && v }), [lineFilter])}
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
          onUpdate={useCallback((v) => setLineFilter({ ...lineFilter, category: isCategoryLabel(v) && v }), [lineFilter])}
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
