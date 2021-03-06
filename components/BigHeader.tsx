import React from 'react'
import { Link as ScrollLink, animateScroll } from 'react-scroll'
import { ScrollContext } from '../contexts/ScrollContext'
import '../styles/BigHeader.less'
import { namedMemo } from '../lib/namedComponent'
import { BigHeaderAnime } from './BigHeaderAnime'
import { LinkButton } from './LinkButton'

interface P {
  menu: ReadonlyArray<[string, string]>
  children?: never
}

export const BigHeader: React.FC<P> = (props) => {
  const sc = React.useContext(ScrollContext)
  const { winHeight, scrollTop } = sc ?? { winHeight: 10000, scrollTop: 0 }
  const isNightDominant = scrollTop < winHeight / 2

  React.useEffect(() => {
    const rootDayClass = 'Root-_Day'
    const rootNightClass = 'Root-_Night'

    const cl = document.documentElement.classList
    if (isNightDominant) {
      cl.add(rootNightClass)
      cl.remove(rootDayClass)
    } else {
      cl.add(rootDayClass)
      cl.remove(rootNightClass)
    }
  }, [isNightDominant])

  if (scrollTop < winHeight - 48) {
    return (<BigHeaderHero {...props} />)
  }
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

      <BigHeaderAnime />
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
