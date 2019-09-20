import Link from 'next/link';
import React from 'react';
import '../styles/HeaderFixed.less';

interface P {
  children?: never;
}

export const HeaderFixed: React.FC<P> = () => {
  return (
    <>
      <header className='HeaderFixed'>
        <h1 className='HeaderFixed-Title'>
          <Link href='/'>
            <a className='HeaderFixed-TitleLink'>
              akouryy.net
            </a>
          </Link>
        </h1>
      </header>
      <div className='HeaderFixed-BodyMargin' />
    </>
  );
}
