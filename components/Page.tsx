import React from 'react';
import { BasePage } from './BasePage';
import { HeaderFixed } from './HeaderFixed';
import { Main } from './Main';

interface P {
  canonical?: string;
  title?: string;
}

export const Page: React.FC<P> = ({ canonical, children, title }) => {
  React.useEffect(() => {
    const cl = document.documentElement.classList;
    cl.add('Root-_Day');
    cl.remove('Root-_Night');
  }, []);

  return (
    <BasePage canonical={canonical} title={title}>
      <HeaderFixed />
      <Main>
        {children}
      </Main>
    </BasePage>
  );
};
