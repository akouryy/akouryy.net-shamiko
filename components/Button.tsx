import classnames from 'classnames'
import React, { type PropsWithChildren } from 'react'

interface P {
  classNames?: Parameters<typeof classnames>[0]
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<PropsWithChildren<P>> = React.memo(function RawButton({ classNames, children, onClick }) {
  return (
    <button
      className={classnames(classNames, 'Button')}
      onClick={onClick}
      type='button'
    >
      {children}
    </button>
  )
})
