import React from 'react';
import '../styles/Modal.less';

interface P {
  hider: (_: false) => void;
}

export const Modal: React.FC<P> = ({ children, hider }) => {
  const onKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    if(ev.key === 'Escape') {
      hider(false);
    }
  };

  return (
    <div
      className='Modal-Background'
      onClick={(): void => hider(false)}
      onKeyPress={onKeyPress}
      role='button'
      tabIndex={0}
    >
      <div className='Modal'>
        {children}
      </div>
    </div>
  );
};
