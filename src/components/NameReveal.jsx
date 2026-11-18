import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Intro: first name on the top panel, last name on the bottom. They split apart to reveal the hero.
export default function NameReveal({ first = 'Jiya', last = 'Gandhi', onDone }) {
  const reduce = useReducedMotion()
  const [go, setGo] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (reduce) { setGone(true); onDone?.(); return }
    const a = setTimeout(() => setGo(true), 1100)
    const b = setTimeout(() => { setGone(true); onDone?.() }, 2000)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [reduce, onDone])

  if (gone) return null
  const ease = [0.76, 0, 0.24, 1]
  const word = 'px-4 text-center font-display text-[22vw] font-900 uppercase leading-[0.8] tracking-[-0.05em] text-accent md:text-[15vw]'

  return (
    <div className="fixed inset-0 z-[10000]" aria-hidden>
      <motion.div className="absolute inset-x-0 top-0 flex h-1/2 items-end justify-center overflow-hidden bg-bg"
        initial={{ y: 0 }} animate={{ y: go ? '-100%' : 0 }} transition={{ duration: 0.9, ease }}>
        <motion.p className={`${word} translate-y-[0.06em]`} initial={{ y: '100%' }} animate={{ y: '6%' }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.1, 1] }}>
          {first}
        </motion.p>
      </motion.div>
      <motion.div className="absolute inset-x-0 bottom-0 flex h-1/2 items-start justify-center overflow-hidden bg-bg"
        initial={{ y: 0 }} animate={{ y: go ? '100%' : 0 }} transition={{ duration: 0.9, ease }}>
        <motion.p className={word} initial={{ y: '-100%' }} animate={{ y: '-6%' }} transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.7, 0.1, 1] }}>
          {last}
        </motion.p>
      </motion.div>
    </div>
  )
}
