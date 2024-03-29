import Link from 'next/link'
import React from 'react'
import { BasePage } from '../components/BasePage'
import { BigHeader } from '../components/BigHeader'
import { ExternalLink } from '../components/ExternalLink'
import { Section } from '../components/Section'

const headerMenu: ReadonlyArray<[string, string]> = Object.freeze([
  ['PageIndex-Profile', 'profile'],
  ['PageIndex-Contact', 'contact'],
  ['PageIndex-Programming', 'programming'],
  ['PageIndex-Links', 'links'],
])

interface P {
  children?: never
}

const PageIndex: React.FC<P> = () => {
  return (
    <BasePage canonical='/'>
      <div className='PageIndex'>
        <BigHeader
          menu={headerMenu}
        />
        <div className='PageIndex-MainContainer'>
          <main className='PageIndex-Main'>
            <Section id='PageIndex-Profile' title='自己紹介'>
              <p>@akouryy</p>
            </Section>
            <Section id='PageIndex-Programming' title='プログラミング'>
              <Section title=''>
                よく使う言語: Ruby, TypeScript, Scala, Rust
              </Section>
              <Section title='実績'>
                <ul>
                  <li>
                    競技プログラミング
                    <ul>
                      {/* <li>
                        <ExternalLink follow href='https://codingcompetitions.withgoogle.com/codejam'>
                          Google Code Jam
                        </ExternalLink>
                        {' '}
                        2021 Round3 進出
                      </li>
                      <li>Google Code Jam 2020 Round3 進出</li>
                      <li>Google Code Jam 2019 Round3 進出</li> */}
                      <li>
                        第15回
                        <ExternalLink follow href='https://www.ioi-jp.org'>日本情報オリンピック</ExternalLink>
                        {' '}
                        (2015-2016) 本選出場、
                        <em>春合宿参加</em>
                      </li>
                      <li>
                        第14回日本情報オリンピック (2014-2015) 本選出場、
                        <em>春合宿参加</em>
                      </li>
                      <li>第13回日本情報オリンピック (2013-2014) 本選出場</li>
                    </ul>
                  </li>
                  <li>
                    その他
                    <ul>
                      <li>
                        <ExternalLink follow href='http://isucon.net'>ISUCON</ExternalLink>
                        13 5位{' '}
                        <small>チーム FetchDecodeExecWrite</small>
                      </li>
                      <li>ISUCON12 本選5位 (学生3位)</li>
                      <li>ISUCON11 <em>本選3位</em></li>
                      <li>ISUCON10 本選6位</li>
                      <li>ISUCON9 本選出場</li>
                      <li>ISUCON8 本選出場</li>
                    </ul>
                  </li>
                </ul>
              </Section>
            </Section>
            <Section id='PageIndex-Links' title='リンク'>
              <Section title='サイト'>
                <ul className='BasePage-NormalList'>
                  <li>
                    <Link href='/'>akouryy.net</Link>
                  </li>
                  <li>
                    <a href='https://akouryy.hatenablog.jp'>
                      Lを探す日常 (akouryy.hatenablog.jp)
                    </a>
                    : プログラミングのブログ、更新頻度低
                  </li>
                </ul>
              </Section>
              <Section title='アカウント'>
                <ul className='BasePage-NormalList'>
                  <li>
                    GitHub:
                    {' '}
                    <a href='https://github.com/akouryy'>@akouryy</a>
                  </li>
                  <li>
                    AtCoder:
                    {' '}
                    <a href='https://atcoder.jp/users/akouryy'>@akouryy</a>
                  </li>
                </ul>
              </Section>
            </Section>
          </main>
        </div>
      </div>
    </BasePage>
  )
}

export default PageIndex
