import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { howIWork } from '../lib/data'
import { MaskHeading } from './Motion'

// A lime line draws through the five steps as you scroll; each step lights up when the line reaches it.
function Step({ s, i, n, progress }) {
  const at = i / (n - 1 || 1)
  const on = useTransform(progress, [Math.max(0, at - 0.12), at], [0.25, 1])
  const color = useTransform(progress, [Math.max(0, at - 0.06), at], ['rgb(40 40 40)', 'rgb(140 255 46)'])
  return (
    <motion.li style={{ opacity: on }} className="relative pl-10 md:pl-0 md:pt-12">
      <motion.span style={{ backgroundColor: color }} className="absolute left-[7px] top-1.5 h-3.5 w-3.5 rounded-full md:left-0 md:top-[-5px]" />
      <span className="font-display text-5xl font-900 leading-none tracking-[-0.04em] text-ink">{s.step}</span>
      <h3 className="h-card mt-3 text-xl">{s.title}</h3>
      <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-ink/65">{s.desc}</p>
    </motion.li>
  )
}

export default function Process() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const fill = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1])

  return (
    <section id="process" className="wrap py-16 sm:py-24">
      <MaskHeading text="How I work" accent={[2]} />
      <p className="mt-5 max-w-lg text-base text-ink/65">First call to a working system you can run yourself. Five steps, zero mystery.</p>

      <div ref={ref} className="relative mt-14">
        {/* rail: vertical on mobile, horizontal on md+ */}
        <span aria-hidden className="absolute bottom-2 left-[13px] top-2 w-px bg-line md:inset-x-0 md:bottom-auto md:left-0 md:top-0 md:h-px md:w-full" />
        <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-2 left-[13px] top-2 w-px origin-top bg-accent md:hidden" />
        <motion.span aria-hidden style={{ scaleX: fill }} className="absolute inset-x-0 top-0 hidden h-px origin-left bg-accent md:block" />
        <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
          {howIWork.map((s, i) => <Step key={s.step} s={s} i={i} n={howIWork.length} progress={fill} />)}
        </ol>
      </div>
    </section>
  )
}
