import Link from 'next/link'
import React from 'react'

interface P {
  children?: never
}

export const HeaderFixed: React.FC<P> = () => {
  return (
    <>
      <header className='HeaderFixed'>
        <h1 className='HeaderFixed-Title'>
          <Link className='HeaderFixed-TitleLink' href='/'>
            akouryy.net
          </Link>
        </h1>
      </header>
      <div className='HeaderFixed-BodyMargin' />
    </>
  )
}
