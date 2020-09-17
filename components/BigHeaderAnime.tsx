import { times } from 'lodash'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../styles/BigHeaderAnime.less'
import { withNonNullScrollProps } from '../contexts/ScrollContext'
import { namedMemo } from '../lib/namedComponent'

class Squircle {
  id: string
  x: number
  y: number
  size: number
  rotateDuration: number
  speed: number
  isClockwise: boolean

  constructor(
    xMin: number, xMax: number, yMin: number, yMax: number,
    sizeMin: number, sizeMax: number, durMin: number, durMax: number,
    speedMin: number, speedMax: number,
  ) {
    this.id = uuidv4()
    this.x = xMin + Math.random() * (xMax - xMin)
    this.y = yMin + Math.random() * (yMax - yMin)
    this.size = sizeMin + Math.random() * (sizeMax - sizeMin)
    this.rotateDuration = durMin + Math.random() * (durMax - durMin)
    this.speed = speedMin + Math.random() * (speedMax - speedMin)
    this.isClockwise = Math.random() < 0.5
  }
}

export const BigHeaderAnime: React.FC = withNonNullScrollProps(
  'BigHeaderAnime',
  ({ scroll: { docWidth, winHeight } }) => {
    const [squircles, updateSquircles] = React.useState(Array<Squircle>())

    React.useEffect(() => {
      const newSquircles = times(24).map<Squircle>((i) => new Squircle(
        docWidth / 4 * (i % 4), docWidth / 4 * (1 + i % 4),
        winHeight / 3 * Math.floor(i / 4 % 3), winHeight / 3 * (1 + Math.floor(i / 4 % 3)),
        20, 150,
        5, 30,
        60, 120,
      ))
      updateSquircles(newSquircles)
    }, [docWidth, winHeight])

    return (
      <svg
        className='BigHeaderAnime'
        viewBox={`0 0 ${docWidth} ${winHeight}`}
      >
        {squircles.map((squircle) => (
          <BigHeaderAnimeSquircle docWidth={docWidth} key={squircle.id} {...squircle} />
        ))}
      </svg>
    )
  },
)

type SquircleProps = Squircle & {
  docWidth: number
}

const BigHeaderAnimeSquircle: React.FC<SquircleProps> = namedMemo('BigHeaderAnimeSquircle', ({
  x: x0, y, size, rotateDuration, speed, isClockwise, docWidth,
}) => {
  return (
    <>
      {[-1, 0, 1].map((d) => {
        const x = x0 + docWidth * d
        const s = size / 2
        return (
          <path
            className='BigHeaderAnimeSquircle'
            d={`
              M ${x - s},${y}
              c 0,${s} 0,${s} ${s},${s}
              s ${s},0 ${s},-${s}
              s 0,-${s} -${s},-${s}
              s -${s},0 -${s},${s} Z
            `}
            key={d}
            transform-origin={`${x} ${y}`}
            strokeWidth={3}
          >
            <animateTransform
              additive='sum'
              attributeName='transform'
              begin={-100}
              dur={speed}
              from={`${docWidth * 0.5}, 0`}
              repeatCount='indefinite'
              to={`${docWidth * -0.5}, 0`}
              type='translate'
            />
            <animateTransform
              additive='sum'
              attributeName='transform'
              begin={-100}
              dur={rotateDuration}
              from='0 0 0'
              repeatCount='indefinite'
              to={`${isClockwise ? 360 : -360} 0 0`}
              type='rotate'
            />
            <animateTransform
              additive='sum'
              attributeName='transform'
              begin='mouseup'
              dur={0.3}
              from='0 0 0'
              to={`${isClockwise ? 270 : -270} 0 0`}
              type='rotate'
            />
          </path>
        )
      })}
    </>
  )
})
