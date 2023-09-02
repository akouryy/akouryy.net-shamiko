import React, { PropsWithChildren } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
