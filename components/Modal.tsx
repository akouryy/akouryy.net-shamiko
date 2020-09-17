import React from 'react'
import '../styles/Modal.less'

interface P {
  hider: (_: false) => void
}

export const Modal: React.FC<P> = ({ children, hider }) => {
  const onKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    if (ev.key === 'Escape') {
      hider(false)
    }
  }

  return (
    <div
      className='Modal-Background'
      onClick={(): void => hider(false)}
      onKeyPress={onKeyPress}
      role='button'
      tabIndex={0}
    >
      {/* eslint-disable
        jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className='Modal'
        onClick={(ev): void => ev.stopPropagation()}
      >
        {/* eslint-enable
          jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        {children}
      </div>
    </div>
  )
}
