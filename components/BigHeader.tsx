import React from 'react';
import { ScrollContext } from '../contexts/ScrollContext';
import '../styles/BigHeader.less';

interface P {
  children?: never;
}

export const BigHeader: React.FC<P> = () => {
  const { winHeight, scrollTop } = React.useContext(ScrollContext);
  const isNightDominant = scrollTop < winHeight / 2;

  React.useEffect(() => {
    const rootDayClass = 'Root-_Day';
    const rootNightClass = 'Root-_Night';

    const cl = document.documentElement.classList;
    if(isNightDominant) {
      cl.add(rootNightClass);
      cl.remove(rootDayClass);
    } else {
      cl.add(rootDayClass);
      cl.remove(rootNightClass);
    }
  }, [isNightDominant]);

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
            programming
          </a>
        </li>
      </ul>
    </header>
  );
};
