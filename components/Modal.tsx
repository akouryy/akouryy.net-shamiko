import React from 'react';
import '../styles/Modal.less';

interface P {
  hider: (_: false) => void;
}

export const Modal: React.FC<P> = ({ children, hider }) => {
  return (
    <div className="Modal-Background" onClick={() => hider(false)}>
      <div className="Modal">
        {children}
      </div>
    </div>
  );
};
