import Head from 'next/head';
import React from 'react';
import 'normalize.css';
import '../styles/BasePage.less';
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
      <footer>&copy; akouryy 2019-2020</footer>
    </ScrollContext.Provider>
  );
};
