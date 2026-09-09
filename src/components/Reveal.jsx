import { motion, useReducedMotion } from 'framer-motion'

// Scroll-reveal wrapper with a few distinct motions so sections don't all use
// the same fade-up. Fires once when scrolled into view.
const VARIANTS = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -36 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 36 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(8px)' }, show: { opacity: 1, filter: 'blur(0px)' } },
}

export function Reveal({ children, variant = 'up', delay = 0, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const M = motion[as] || motion.div
  if (reduce) return <M className={className}>{children}</M>
  return (
    <M
      className={className}
      variants={VARIANTS[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.5, 0.2, 1] }}
    >
      {children}
    </M>
  )
}

// Container that staggers its <RevealItem> children.
export function RevealGroup({ children, className = '', stagger = 0.08 }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', variant = 'up' }) {
  return (
    <motion.div className={className} variants={VARIANTS[variant]} transition={{ duration: 0.5, ease: [0.21, 0.5, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}
