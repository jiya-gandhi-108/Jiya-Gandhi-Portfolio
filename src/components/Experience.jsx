import { motion, useReducedMotion } from 'framer-motion'
import { experience } from '../lib/data'
import { Reveal } from './Reveal'

export default function Experience() {
  const reduce = useReducedMotion()

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">the road so far</p></Reveal>
      <Reveal variant="up" delay={0.05}><h2 className="display text-4xl font-600 leading-[1.05] text-ink sm:text-5xl">Experience</h2></Reveal>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="relative mt-12 pl-8 sm:pl-10"
      >
        {/* the timeline rail */}
        <motion.span
          aria-hidden
          initial={{ scaleY: reduce ? 1 : 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute left-[7px] top-2 h-full w-px origin-top bg-line sm:left-[9px]"
        />

        {experience.map((e) => (
          <motion.div
            key={e.role + e.org}
            variants={{
              hidden: { opacity: 0, x: reduce ? 0 : -24 },
              show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.21, 0.5, 0.2, 1] } },
            }}
            whileHover={reduce ? {} : { x: 6 }}
            className="group relative border-b border-line py-8 last:border-b-0"
          >
            {/* timeline dot */}
            <span className="absolute -left-8 top-9 grid place-items-center sm:-left-10">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-line bg-bg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent" />
              <span className="absolute h-3.5 w-3.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-60" />
            </span>

            <div className="grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-8">
              <p className="font-sans text-sm uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-accent">{e.period}</p>
              <div>
                <h3 className="display text-xl font-600 text-ink sm:text-2xl">
                  {e.role} <span className="text-muted transition-colors group-hover:text-ink">&mdash; {e.org}</span>
                </h3>
                <p className="mt-2 max-w-2xl font-sans text-base leading-relaxed text-muted">{e.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
