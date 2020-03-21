import React from 'react';
import Link from 'next/link';
import '../styles/PageIndex.less';
import { BasePage } from '../components/BasePage';
import { BigHeader } from '../components/BigHeader';
import { Section } from '../components/Section';

const headerMenu: ReadonlyArray<[string, string]> = Object.freeze([
  ['PageIndex-Profile', 'profile'],
  ['PageIndex-Contact', 'contact'],
  ['PageIndex-Programming', 'programming'],
  ['PageIndex-Links', 'links'],
]);

interface P {
  children?: never;
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
              <p>東京大学理学部情報科学科 在学中</p>
              <p>Comming soon</p>
            </Section>
            <Section id='PageIndex-Contact' title='連絡先'>
              <p>メールアドレスは公開していません</p>
              <p><a href='https://twitter.com/akouryy1'>Twitter @akouryy1</a></p>
              <p>Comming soon</p>
            </Section>
            <Section id='PageIndex-Programming' title='プログラミング'>
              <p>プログラミングが好きです</p>
              <p>
                進捗:
              </p>
              <p>Comming soon</p>
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
                    akouryy.hatenablog.jp:{' '}
                    <a href='https://akouryy.hatenablog.jp'>
                      Lを探す日常
                    </a>
                    {' '}(プログラミングのブログ、更新頻度低)
                  </li>
                </ul>
              </Section>
              <Section title='各種アカウント'>
                <ul className='BasePage-NormalList'>
                  <li>
                    Twitter: <a href='https://twitter.com/akouryy1'>@akouryy1</a>
                  </li>
                  <li>
                    AtCoder: <a href='https://atcoder.jp/users/akouryy'>@akouryy</a>
                  </li>
                </ul>
              </Section>
            </Section>
          </main>
        </div>
      </div>
    </BasePage>
  );
};

export default PageIndex;
