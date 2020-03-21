import React from 'react';
import { v1 as uuidv1 } from 'uuid';
import '../styles/BigHeaderAnime.less';
import { useScrollProps } from '../contexts/ScrollContext';

class Squircle {
  id: string;
  x: number;
  y: number;
  size: number;
  rotateDuration: number;
  isClockwise: boolean;

  constructor(
    xMin: number, xMax: number, yMin: number, yMax: number,
    sizeMin: number, sizeMax: number, durMin: number, durMax: number,
  ) {
    this.id = uuidv1();
    this.x = xMin + Math.random() * (xMax - xMin);
    this.y = yMin + Math.random() * (yMax - yMin);
    this.size = sizeMin + Math.random() * (sizeMax - sizeMin);
    this.rotateDuration = durMin + Math.random() * (durMax - durMin);
    this.isClockwise = Math.random() < 0.5;
  }
}

export const BigHeaderAnime: React.FC = () => {
  const { docWidth, winHeight } = useScrollProps();

  const [squircles, updateSquircles] = React.useState(Array<Squircle>());

  React.useEffect(() => {
    updateSquircles([...Array(24)].map<Squircle>((_, i) => new Squircle(
      docWidth / 4 * (i % 4),
      docWidth / 4 * (1 + i % 4),
      winHeight / 3 * Math.floor(i / 4 % 3),
      winHeight / 3 * (1 + Math.floor(i / 4 % 3)),
      20, 150,
      5, 30,
    )));
  }, []);

  return (
    <svg className='BigHeaderAnime' viewBox={`0 0 ${docWidth} ${winHeight}`}>
      {squircles.map((squircle) => (
        <BigHeaderAnimeSquircle key={squircle.id} {...squircle} />
      ))}
    </svg>
  );
};

const BigHeaderAnimeSquircle: React.FC<Squircle> = React.memo(({
  x, y, size, rotateDuration, isClockwise,
}) => {
  const ref = React.useRef<SVGPathElement>(null);

  const [spinning, setSpinning] = React.useState<number | null>(null);

  const onClick = React.useCallback(() => {
    const path = ref.current;
    if(path) {
      const parent = path.parentElement;
      if(parent instanceof SVGSVGElement) {
        setSpinning(parent.getCurrentTime());
        setTimeout(() => setSpinning(null), 300);
      }
    }
  }, []);

  return (
    <path
      className='BigHeaderAnimeSquircle'
      d={`
        M ${x - 50},${y} c 0,50 0,50 50,50 s 50,0 50,-50 s 0,-50 -50,-50 s -50,0 -50,50 Z
      `}
      onClick={onClick}
      ref={ref}
      transform={`scale(${size / 100})`}
      transform-origin={`${x} ${y}`}
      strokeWidth={300 / size}
    >
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
      {spinning && (
        <animateTransform
          additive='sum'
          attributeName='transform'
          begin={spinning}
          dur={0.3}
          from='0 0 0'
          repeatCount='indefinite'
          to={`${isClockwise ? 270 : -270} 0 0`}
          type='rotate'
        />
      )}
    </path>
  );
});
