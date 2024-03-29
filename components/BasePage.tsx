import classNames from 'classnames'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { ScrollContext, useScrollProps } from '../contexts/ScrollContext'

interface P {
  canonical?: string
  className?: string
  title?: string
}

export const BasePage: React.FC<PropsWithChildren<P>> = ({ canonical, children, className, title }) => {
  const scrollProps = useScrollProps()

  return (
    <ScrollContext.Provider value={scrollProps}>
      <div className={classNames('BasePage', className)}>
        <Head>
          <title>{title != null ? `${title} - akouryy.net` : 'akouryy.net'}</title>
          {canonical != null && (
            <link href={`https://akouryy.net${canonical}`} rel='canonical' />
          )}
        </Head>
        {children}
        <footer className='BasePage-Footer'>&copy; akouryy 2019-2021</footer>
      </div>
    </ScrollContext.Provider>
  )
}
