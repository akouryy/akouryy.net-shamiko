import React from 'react';
import '../styles/PageIndex.less';
import { BasePage } from '../components/BasePage';
import { BigHeader } from '../components/BigHeader';

const Home: React.FC = () => {
  return (
    <BasePage canonical='/'>
      <div className='PageIndex'>
        <BigHeader />
        Coming sooner or later.
      </div>
    </BasePage>
  );
};

export default Home;
