import classnames from 'classnames'
import React, { PropsWithChildren } from 'react'

interface P {
  classNames?: Parameters<typeof classnames>[0]
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const LinkButton: React.FC<PropsWithChildren<P>> = React.memo(function RawLinkButton({ classNames, children, onClick }) {
  return (
    <button
      className={classnames(classNames, 'LinkButton')}
      onClick={onClick}
      type='button'
    >
      {children}
    </button>
  )
})
