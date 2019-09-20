import React from 'react';
import { Link, animateScroll } from 'react-scroll';
import { ScrollContext } from '../contexts/ScrollContext';
import '../styles/BigHeader.less';
import { LinkButton } from './LinkButton';

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

  if(scrollTop < winHeight - 48) {
    return (<BigHeaderHero {...props} />);
  } else {
    return (<BigHeaderFixed {...props} />);
  }
};

const BigHeaderHero: React.FC<P> = React.memo(({ menu }) => {
  return (
    <header className='BigHeaderHero'>
      <h1 className='BigHeaderHero-Title'>akouryy.net</h1>

      <ul className='BigHeaderHero-Menu'>
        {menu.map(([to, title]) => (
          <li className='BigHeaderHero-MenuItem' key={to}>
            <Link duration={1000} offset={-48} smooth to={to}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
});

const BigHeaderFixed: React.FC<P> = React.memo(() => {
  const onClick = React.useCallback(
    (): void => animateScroll.scrollToTop({ duration: 1000 }),
    [],
  );

  return (
    <>
      <div className='BigHeaderHero' />

      <header className='BigHeaderFixed'>
        <h1 className='BigHeaderFixed-Title'>
          <LinkButton classNames='BigHeaderFixed-TitleLink' onClick={onClick}>
            akouryy.net
          </LinkButton>
        </h1>
      </header>
    </>
  );
});
