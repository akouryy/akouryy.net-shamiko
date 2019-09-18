import React from 'react';
import '../styles/BigHeader.less';

interface P {
  children?: never;
}

export const BigHeader: React.FC<P> = () => {
  return (
    <header className="BigHeader">
      <h1 className='BigHeader-Title'>akouryy.net</h1>

      <ul className='BigHeader-Menu'>
        <li className='BigHeader-MenuItem'>
          <a href='#profile'>
            profile
          </a>
        </li>
        <li className='BigHeader-MenuItem'>
          <a href='https://twitter.com/akouryy1'>contact</a>
        </li>
        <li className='BigHeader-MenuItem'>
          <a href='#other'>
            other
          </a>
        </li>
      </ul>
    </header>
  );
};
