import { motion, useReducedMotion } from 'framer-motion'
import { howIWork } from '../lib/data'
import { Reveal } from './Reveal'

// "How I work" — the 5-step delivery process, now interactive.
export default function Process() {
  const reduce = useReducedMotion()

  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">the process</p></Reveal>
      <Reveal variant="up" delay={0.05}>
        <h2 className="display text-4xl font-600 leading-[1.05] text-ink sm:text-5xl">How I <span className="italic star">work</span></h2>
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <p className="mt-4 max-w-xl font-sans text-sm text-muted">From first conversation to a working system you can run yourself.</p>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        className="mt-12 grid gap-4 md:grid-cols-5"
      >
        {howIWork.map((s, i) => (
          <motion.div
            key={s.step}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.5, 0.2, 1] } },
            }}
            whileHover={reduce ? {} : { y: -6 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-graphite p-6
                       transition-colors duration-300 hover:border-accent/60"
          >
            {/* animated top accent bar */}
            <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            {/* connector arrow to the next step (desktop) */}
            {i < howIWork.length - 1 && (
              <span className="pointer-events-none absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-line transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:block">
                &rarr;
              </span>
            )}
            <span className="display text-4xl font-700 text-accent transition-transform duration-300 group-hover:scale-110 sm:text-5xl">
              {s.step}
            </span>
            <h3 className="display mt-4 text-lg font-600 text-ink">{s.title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{s.desc}</p>
            {/* faint step glow on hover */}
            <span className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/20" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
