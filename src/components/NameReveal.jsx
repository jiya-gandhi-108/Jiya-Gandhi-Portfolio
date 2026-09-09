import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

// Intro: the full name shows split across the middle (first name on the top
// panel, last name on the bottom). After a beat the two panels slide apart —
// the name splits open to reveal the hero underneath.
export default function NameReveal({ first = 'Jiya', last = 'Gandhi', onDone }) {
  const reduce = useReducedMotion()
  const [go, setGo] = useState(false) // trigger the split
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (reduce) { setGone(true); onDone?.(); return }
    const a = setTimeout(() => setGo(true), 1250)
    const b = setTimeout(() => { setGone(true); onDone?.() }, 2200)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [reduce, onDone])

  if (gone) return null
  const ease = [0.76, 0, 0.24, 1]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000]">
        {/* top panel holds the first name (bottom-aligned to the split line) */}
        <motion.div
          className="absolute inset-x-0 top-0 flex h-1/2 items-end justify-center overflow-hidden bg-paper"
          initial={{ y: 0 }}
          animate={{ y: go ? '-100%' : 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.h1
            className="font-reveal -translate-y-3 sm:-translate-y-6 px-4 text-center text-[16vw] font-900 leading-[0.9] tracking-tight text-bg md:text-[12vw]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {first.toUpperCase()}
          </motion.h1>
        </motion.div>

        {/* bottom panel holds the last name (top-aligned to the split line) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex h-1/2 items-start justify-center overflow-hidden bg-paper"
          initial={{ y: 0 }}
          animate={{ y: go ? '100%' : 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.h1
            className="font-reveal translate-y-3 sm:translate-y-6 px-4 text-center text-[16vw] font-900 leading-[0.9] tracking-tight text-bg md:text-[12vw]"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {last.toUpperCase()}
          </motion.h1>
        </motion.div>

        {/* thin accent line on the split seam */}
        <motion.div
          className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: go ? 0 : 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        />
      </div>
    </AnimatePresence>
  )
}
