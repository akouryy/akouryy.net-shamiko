import classnames from 'classnames';
import React from 'react';

interface P {
  classNames?: Parameters<typeof classnames>[0];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<P> = React.memo(({ classNames, children, onClick }) => {
  return (
    <button
      className={classnames(classNames, 'Button')}
      onClick={onClick}
      type='button'
    >
      {children}
    </button>
  );
});
