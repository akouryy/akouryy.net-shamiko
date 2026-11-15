import React, { PropsWithChildren } from 'react'

interface P {
  hider: (_: false) => void
}

export const Modal: React.FC<PropsWithChildren<P>> = ({ children, hider }) => {
  const onKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    if(ev.key === 'Escape') {
      hider(false)
    }
  }

  return (
    <div
      className='Modal-Background'
      onClick={(): void => { hider(false) }}
      onKeyPress={onKeyPress}
      role='button'
      tabIndex={0}
    >
      <div
        className='Modal'
        onClick={(ev): void => { ev.stopPropagation() }}
      >
        {children}
      </div>
    </div>
  )
}
