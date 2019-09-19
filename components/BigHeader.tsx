import React from 'react';
import { Link } from 'react-scroll';
import { ScrollContext } from '../contexts/ScrollContext';
import '../styles/BigHeader.less';

interface P {
  menu: ReadonlyArray<[string, string]>;
  children?: never;
}

export const BigHeader: React.FC<P> = (props) => {
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

  return (<BigHeaderPure {...props} />);
};

const BigHeaderPure: React.FC<P> = React.memo(({ menu }) => {
  return (
    <header className='BigHeader'>
      <h1 className='BigHeader-Title'>akouryy.net</h1>

      <ul className='BigHeader-Menu'>
        {menu.map(([to, title]) => (
          <li className='BigHeader-MenuItem' key={to}>
            <Link duration={500} smooth to={to}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
});
