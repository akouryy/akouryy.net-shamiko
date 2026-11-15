import classnames from 'classnames'
import React, { PropsWithChildren } from 'react'

interface P {
  follow?: boolean
  href: string
}

export const ExternalLink: React.FC<PropsWithChildren<P>> = ({ children, follow, href }) => {
  return (
    <a
      href={href}
      rel={classnames('noopener noreferrer', !(follow ?? false) && 'nofollow')}
      target='_blank'
    >
      {children}
    </a>
  )
}
