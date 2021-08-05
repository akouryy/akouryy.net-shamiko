import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface P {
  // children?: never;
}

export const Main: React.FC<P> = ({ children }) => {
  return (
    <div className='Main-Container'>
      <main className='Main'>
        {children}
      </main>
    </div>
  )
}
