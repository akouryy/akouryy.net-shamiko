import React from 'react';
import '../styles/PageIndex.less';
import { BasePage } from '../components/BasePage';
import { BigHeader } from '../components/BigHeader';
import { Section } from '../components/Section';

const Home: React.FC = () => {
  return (
    <BasePage canonical='/'>
      <div className='PageIndex'>
        <BigHeader menu={[
          ['#PageIndex-Profile', 'profile'],
          ['#PageIndex-Contact', 'contact'],
          ['#PageIndex-Programming', 'programming'],
        ]} />
        <main className="PageIndex-Main">
          <Section id='PageIndex-Profile' title='自己紹介'>
            Comming sooner or later
          </Section>
          <Section id='PageIndex-Contact' title='連絡先'>
            Comming sooner or later
            <br />
            <a href='https://twitter.com/akouryy1'>Twitter @akouryy1</a>
          </Section>
          <Section id='PageIndex-Programming' title='プログラミング'>
            Comming sooner or later
          </Section>
        </main>
      </div>
    </BasePage>
  );
};

export default Home;
