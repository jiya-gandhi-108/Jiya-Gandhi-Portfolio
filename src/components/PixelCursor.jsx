import { useEffect, useRef, useState } from 'react'

// White pixel-art arrow cursor with a hard black outline (drop-shadow), scaled
// at an integer factor so pixels stay crisp. Grows over interactive elements,
// dips on click. Off for touch / reduced-motion.
const ROWS = [
  'B...............',
  'BB..............',
  'BBB.............',
  'BBBB............',
  'BBBBB...........',
  'BBBBBB..........',
  'BBBBBBB.........',
  'BBBBBBBB........',
  'BBBBBBBBB.......',
  'BBBBBBBBBB......',
  'BBBBBBB.........',
  'BBB.BBBB........',
  'BB...BBB........',
  '......BBB.......',
  '......BBB.......',
  '.......B........',
]

export default function PixelCursor() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const [hot, setHot] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setOn(true)
    document.documentElement.classList.add('custom-cursor')
    const move = (e) => {
      const el = ref.current
      if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      const t = e.target
      setHot(!!(t && t.closest && t.closest('a,button,[role="button"],input,textarea,label,select')))
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', dn)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', dn)
      window.removeEventListener('mouseup', up)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [])

  if (!on) return null
  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ willChange: 'transform' }}>
      <svg
        width="28" height="28" viewBox="0 0 16 16" shapeRendering="crispEdges"
        style={{
          imageRendering: 'pixelated',
          transform: `scale(${down ? 0.82 : hot ? 1.28 : 1})`,
          transformOrigin: '1px 1px',
          transition: 'transform .09s ease-out',
          filter:
            'drop-shadow(1px 0 0 #000) drop-shadow(-1px 0 0 #000) drop-shadow(0 1px 0 #000) drop-shadow(0 -1px 0 #000)',
        }}
      >
        {ROWS.map((row, y) => row.split('').map((c, x) => (c === 'B' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#ffffff" /> : null)))}
      </svg>
    </div>
  )
}
