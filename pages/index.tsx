import Link from 'next/link'
import React from 'react'
import { BasePage } from '../components/BasePage'
import { BigHeader } from '../components/BigHeader'
import { ExternalLink } from '../components/ExternalLink'
import { Section } from '../components/Section'
import '../styles/PageIndex.less'

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
              <p>東京大学大学院情報理工学系研究科コンピュータ科学専攻 在学中</p>
            </Section>
            <Section id='PageIndex-Contact' title='連絡先'>
              <p>メールアドレスは公開していません</p>
              <p><a href='https://twitter.com/akouryy1'>Twitter @akouryy1</a></p>
            </Section>
            <Section id='PageIndex-Programming' title='プログラミング'>
              <Section title=''>
                プログラミングが好きです
                <br />
                よく使う言語: Scala, TypeScript, Ruby, C++
              </Section>
              <Section title='実績'>
                <ul>
                  <li>
                    競技プログラミング
                    <ul>
                      <li>
                        <ExternalLink follow href='https://codingcompetitions.withgoogle.com/codejam'>
                          Google Code Jam
                        </ExternalLink>
                        {' '}
                        2020 Round3 出場
                      </li>
                      <li>Google Code Jam 2019 Round3 出場権獲得</li>
                      <li>
                        第15回
                        <ExternalLink follow href='https://www.ioi-jp.org'>日本情報オリンピック</ExternalLink>
                        {' '}
                        (2015-2016) 本選出場、春合宿参加
                      </li>
                      <li>第14回日本情報オリンピック (2014-2015) 本選出場、春合宿参加</li>
                      <li>第13回日本情報オリンピック (2013-2014) 本選出場</li>
                    </ul>
                  </li>
                  <li>
                    その他
                    <ul>
                      <li>
                        <ExternalLink follow href='http://isucon.net'>ISUCON</ExternalLink>
                        10 (2020) 本選6位
                      </li>
                      <li>ISUCON9 (2019) 本選出場</li>
                      <li>ISUCON8 (2018) 本選出場</li>
                    </ul>
                  </li>
                </ul>
              </Section>
            </Section>
            <Section id='PageIndex-Links' title='リンク'>
              <Section title='サイト'>
                <ul className='BasePage-NormalList'>
                  <li>
                    akouryy.net:
                    <ul>
                      <li><Link href='/'>トップページ</Link></li>
                      <li><Link href='/info'>このサイトについて</Link></li>
                    </ul>
                  </li>
                  <li>
                    <a href='https://akouryy.hatenablog.jp'>
                      Lを探す日常 (akouryy.hatenablog.jp)
                    </a>
                    : プログラミングのブログ、更新頻度低
                  </li>
                </ul>
              </Section>
              <Section title='各種アカウント'>
                <ul className='BasePage-NormalList'>
                  <li>
                    Twitter:
                    {' '}
                    <a href='https://twitter.com/akouryy1'>@akouryy1</a>
                  </li>
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
