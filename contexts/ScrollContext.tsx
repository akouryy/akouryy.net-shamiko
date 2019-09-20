import throttle from 'lodash/throttle';
import React from 'react';

export type ScrollProps = {
  docHeight: number;
  docWidth: number;
  scrollTop: number;
  winHeight: number;
};

const defaultScrollProps = {
  docHeight: 1000,
  docWidth: 1000,
  scrollTop: 0,
  winHeight: 1000,
};

export const ScrollContext = React.createContext<ScrollProps>(defaultScrollProps);

export const calcScrollProps = (): ScrollProps => {
  if(typeof document === 'undefined') {
    return defaultScrollProps;
  }

  const scrollNode = document.scrollingElement || document.documentElement;

  return {
    docHeight: document.body.clientHeight,
    docWidth: document.body.clientWidth,
    scrollTop: scrollNode.scrollTop,
    winHeight: window.innerHeight,
  };
};

export const useScrollProps = (): ScrollProps => {
  const [props, update] = React.useState(calcScrollProps());

  React.useEffect(() => {
    const handler = throttle(() => update(calcScrollProps()), 16);
    const options = { capture: false, passive: true };
    document.addEventListener('scroll', handler, options);
    window.addEventListener('resize', handler, options);
    return (): void => {
      document.removeEventListener('scroll', handler, options);
      window.removeEventListener('resize', handler, options);
    };
  }, []);

  return props;
};
