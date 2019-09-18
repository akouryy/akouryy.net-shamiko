import Head from 'next/head';
import React from 'react';
import '../styles/BasePage.less';
import 'normalize.css';
import { useScrollProps, ScrollContext } from '../contexts/ScrollContext';

interface P {
  canonical?: string;
  title?: string;
}

export const BasePage: React.FC<P> = ({ canonical, children, title }) => {
  const scrollProps = useScrollProps();

  return (
    <ScrollContext.Provider value={scrollProps}>
      <Head>
        <title>{title ? `${title} - akouryy.net` : 'akouryy.net'}</title>
        {canonical && (
          <link rel='canonical' href={`https://akouryy.net${canonical}`} />
        )}
      </Head>
      {children}
    </ScrollContext.Provider>
  );
};
