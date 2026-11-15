import React, { PropsWithChildren } from 'react'

interface P {}

export const Main: React.FC<PropsWithChildren<P>> = ({ children }) => {
  return (
    <div className='Main-Container'>
      <main className='Main'>
        {children}
      </main>
    </div>
  )
}
