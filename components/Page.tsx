import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import { BasePage } from './BasePage'
import { HeaderFixed } from './HeaderFixed'
import { Main } from './Main'

interface P {
  canonical?: string
  className?: string
  title?: string
}

export const Page: React.FC<PropsWithChildren<P>> = ({ canonical, children, className, title }) => {
  React.useEffect(() => {
    const cl = document.documentElement.classList
    cl.add('Root-_Day')
    cl.remove('Root-_Night')
  }, [])

  return (
    <BasePage canonical={canonical} className={classNames('Page', className)} title={title}>
      <HeaderFixed />
      <Main>
        {children}
      </Main>
    </BasePage>
  )
}
