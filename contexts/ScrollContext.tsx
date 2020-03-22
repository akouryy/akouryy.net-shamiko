import throttle from 'lodash/throttle';
import React from 'react';
import { named } from '../lib/namedComponent';

export type NonNullScrollProps = {
  docHeight: number;
  docWidth: number;
  scrollTop: number;
  winHeight: number;
};

export type ScrollProps = NonNullScrollProps | null;

export const ScrollContext = React.createContext<ScrollProps>(null);

ScrollContext.displayName = 'ScrollContext';

export const calcScrollProps = (): ScrollProps => {
  if(typeof document === 'undefined') {
    return null;
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
  const [props, update] = React.useState<ScrollProps>(null);

  React.useEffect(() => {
    const handler = throttle(() => update(calcScrollProps()), 16);
    const options = { capture: false, passive: true };
    handler();
    document.addEventListener('scroll', handler, options);
    window.addEventListener('resize', handler, options);
    return (): void => {
      document.removeEventListener('scroll', handler, options);
      window.removeEventListener('resize', handler, options);
    };
  }, []);

  return props;
};

export const withNonNullScrollProps = <P extends { scroll: NonNullScrollProps }>(
  name: string, component: React.FC<P>,
): React.FC<Omit<P, 'scroll'>> => {
  const NamedComponent = named(name, component);
  return named(`withNonNullScrollProps[${name}]`, (props) => {
    const scroll = React.useContext(ScrollContext);
    if(scroll) {
      const allProps = { scroll, ...props } as P;
      return (<NamedComponent {...allProps} />);
    } else {
      return (<></>);
    }
  });
};
