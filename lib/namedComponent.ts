import React from 'react'

export const named = <P extends unknown>(name: string, component: React.FC<P>): React.FC<P> => {
  // eslint-disable-next-line no-param-reassign
  component.displayName = name

  return component
}

export const namedMemo = <P extends Record<never, unknown>>(
  name: string,
  component: React.FC<P>,
  propsAreEqual?: (
    (b: Readonly<React.PropsWithChildren<P>>, a: Readonly<React.PropsWithChildren<P>>) => boolean
  ),
): React.NamedExoticComponent<P> => {
  return React.memo(named(name, component), propsAreEqual)
}
