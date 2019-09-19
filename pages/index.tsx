import React from 'react';
import '../styles/PageIndex.less';
import { BasePage } from '../components/BasePage';
import { BigHeader } from '../components/BigHeader';
import { Section } from '../components/Section';

const headerMenu: ReadonlyArray<[string, string]> = Object.freeze([
  ['PageIndex-Profile', 'profile'],
  ['PageIndex-Contact', 'contact'],
  ['PageIndex-Programming', 'programming'],
]);

const Home: React.FC = () => {
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
                {' '}
                <a href='http://isucon.net/archives/53570241.html'>ISUCON9</a>
                {' '}
                本選出場
              </p>
              <p>Comming soon</p>
            </Section>
          </main>
        </div>
        <footer>&copy; akouryy 2019</footer>
      </div>
    </BasePage>
  );
};

export default Home;
