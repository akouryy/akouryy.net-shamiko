import classNames from 'classnames'
import Head from 'next/head'
import React from 'react'
import { useScrollProps, ScrollContext } from '../contexts/ScrollContext'

interface P {
  canonical?: string
  className?: string
  title?: string
}

export const BasePage: React.FC<P> = ({ canonical, children, className, title }) => {
  const scrollProps = useScrollProps()

  return (
    <ScrollContext.Provider value={scrollProps}>
      <div className={classNames('BasePage', className)}>
        <Head>
          <title>{title ? `${title} - akouryy.net` : 'akouryy.net'}</title>
          {canonical && (
            <link rel='canonical' href={`https://akouryy.net${canonical}`} />
          )}
        </Head>
        {children}
        <footer className='BasePage-Footer'>&copy; akouryy 2019-2021</footer>
      </div>
    </ScrollContext.Provider>
  )
}
