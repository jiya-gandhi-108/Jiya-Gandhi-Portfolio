import { Fragment, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const EASE = [0.2, 0.7, 0.1, 1]

// Section heading: each word rises out of its own mask, one after another.
// `accent` = indexes of words to paint lime.
export function MaskHeading({ text, as = 'h2', className = 'h-sec', accent = [], delay = 0 }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const Tag = motion[as] || motion.h2
  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.06em] align-bottom">
            <motion.span
              className={`inline-block ${accent.includes(i) ? 'text-accent' : ''}`}
              variants={{
                hidden: { y: reduce ? 0 : '105%' },
                show: { y: 0, transition: { duration: 0.75, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  )
}

// Paragraph whose words light up one by one as you scroll past it.
export function ScrollHighlight({ text, className = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')
  if (reduce) return <p className={className}>{text}</p>
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  )
}
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <>
      <motion.span aria-hidden style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}

// Box that opens from a smaller rounded window to full size when it enters view.
export function ClipReveal({ children, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: 'inset(14% 14% 14% 14% round 28px)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)' }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// Simple fade/slide-up for body copy.
export function FadeUp({ children, className = '', delay = 0, as = 'div' }) {
  const reduce = useReducedMotion()
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}
