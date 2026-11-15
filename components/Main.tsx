import React, { type PropsWithChildren } from 'react'

export const Main: React.FC<PropsWithChildren> =({ children }) => (
  <div className='Main-Container'>
    <main className='Main'>
      {children}
    </main>
  </div>
)
