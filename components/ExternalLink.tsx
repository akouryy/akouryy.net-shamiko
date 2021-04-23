import classnames from 'classnames'
import React from 'react'

interface P {
  follow?: boolean
  href: string
}

export const ExternalLink: React.FC<P> = ({ children, follow, href }) => {
  return (
    // (false positive)
    // eslint-disable-next-line react/jsx-no-target-blank
    <a
      href={href}
      rel={classnames('noopener noreferrer', !follow && 'nofollow')}
      target='_blank'
    >
      {children}
    </a>
  )
}
