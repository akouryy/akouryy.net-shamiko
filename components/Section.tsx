import React from 'react';
import '../styles/Section.less';

interface P {
  id?: string;
  title: string | JSX.Element;
}

export const Section: React.FC<P> = ({ children, id, title }) => {
  return (
    <section className='Section' id={id}>
      <h1 className='Section-Title'>{title}</h1>
      {children}
    </section>
  );
};
