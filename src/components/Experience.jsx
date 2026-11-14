import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { experience as allExperience } from '../lib/data'
import { Reveal } from './Reveal'

export default function Experience({ items }) {
  const reduce = useReducedMotion()
  const experience = items && items.length ? items : allExperience

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="up" delay={0.05}><h2 className="display text-4xl font-600 leading-[1.05] text-ink sm:text-5xl">My <span className="italic star">Journey</span></h2></Reveal>
      <Reveal variant="up" delay={0.1}><p className="mt-4 max-w-xl font-sans text-sm text-muted">Three roles, one direction: freelance, agency and in-house work that took me from backend APIs to AI agents.</p></Reveal>

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
            key={e.id || e.role + e.org}
            variants={{
              hidden: { opacity: 0, x: reduce ? 0 : -24 },
              show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.21, 0.5, 0.2, 1] } },
            }}
                        className="group relative border-b border-line last:border-b-0"
          >
            {/* timeline dot */}
            <span className="absolute -left-8 top-9 grid place-items-center sm:-left-10">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-line bg-bg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent" />
              <span className="absolute h-3.5 w-3.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-60" />
            </span>

            <div className="py-8">
              <div className="grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-8">
                <div>
                  <p className="font-sans text-sm font-600 text-ink/80 transition-colors group-hover:text-accent">{e.period}</p>
                  {e.location && <p className="mt-1 font-sans text-sm text-muted">{e.location}</p>}
                </div>
                <div>
                  <Link to={`/journey/${e.id}`} className="block">
                    <h3 className="display flex items-start gap-2 text-xl font-600 text-ink transition-colors group-hover:text-accent sm:text-2xl">
                      <span>{e.role} <span className="text-muted transition-colors group-hover:text-ink">&mdash; {e.org}</span></span>
                      <ArrowUpRight size={20} className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                    </h3>
                  </Link>
                  <p className="mt-2 max-w-2xl font-sans text-base leading-relaxed text-ink/85">{e.desc}</p>
                  {e.points?.length > 0 && (
                    <ul className="mt-4 max-w-3xl space-y-2">
                      {e.points.map((pt) => (
                        <li key={pt} className="flex gap-3 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                          <span aria-hidden className="star mt-[1px] shrink-0">&#10022;</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {e.stack?.length > 0 && (
                    <p className="mt-4 max-w-3xl font-sans text-sm leading-relaxed text-ink/70">
                      <span className="font-600 text-ink">Stack: </span>{e.stack.join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
