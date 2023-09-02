import React from 'react'
import { animateScroll, Link as ScrollLink } from 'react-scroll'
import { ScrollContext } from '../contexts/ScrollContext'
import { namedMemo } from '../lib/namedComponent'
import { LinkButton } from './LinkButton'

interface P {
  menu: ReadonlyArray<[string, string]>
}

export const BigHeader: React.FC<P> = (props) => {
  const sc = React.useContext(ScrollContext)
  const { winHeight, scrollTop } = sc ?? { winHeight: 10000, scrollTop: 0 }
  const isNightDominant = scrollTop < winHeight / 2

  React.useEffect(() => {
    const rootDayClass = 'Root-_Day'
    const rootNightClass = 'Root-_Night'

    const cl = document.documentElement.classList
    if(isNightDominant) {
      cl.add(rootNightClass)
      cl.remove(rootDayClass)
    } else {
      cl.add(rootDayClass)
      cl.remove(rootNightClass)
    }
  }, [isNightDominant])

  if(scrollTop < winHeight - 48) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return (<BigHeaderHero {...props} />)
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return (<BigHeaderFixed {...props} />)
}

const BigHeaderHero = namedMemo<P>('BigHeaderHero', ({ menu }) => {
  return (
    <header className='BigHeaderHero'>
      <div className='BigHeaderHero-ForeGround'>
        <h1 className='BigHeaderHero-Title'>akouryy.net</h1>

        <ul className='BigHeaderHero-Menu'>
          {menu.map(([to, title], i) => (
            <li className='BigHeaderHero-MenuItem' key={to}>
              <ScrollLink duration={300 * (i + 1.5)} offset={-48} smooth to={to}>
                {title}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>

      {/* <BigHeaderAnime /> */}
    </header>
  )
})

const BigHeaderFixed: React.FC<P> = namedMemo('BigHeaderFixed', () => {
  const onClick = React.useCallback(
    (): void => animateScroll.scrollToTop({ duration: 1000 }),
    [],
  )

  return (
    <>
      <div className='BigHeaderHero' />

      <header className='BigHeaderFixed'>
        <h1 className='BigHeaderFixed-Title'>
          <LinkButton classNames='BigHeaderFixed-TitleLink' onClick={onClick}>
            akouryy.net
          </LinkButton>
        </h1>
      </header>
    </>
  )
})
