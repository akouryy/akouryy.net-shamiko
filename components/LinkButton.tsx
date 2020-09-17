import classnames from 'classnames'
import React from 'react'
import '../styles/LinkButton.less'

interface P {
  classNames?: Parameters<typeof classnames>[0]
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const LinkButton: React.FC<P> = React.memo(({ classNames, children, onClick }) => {
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
