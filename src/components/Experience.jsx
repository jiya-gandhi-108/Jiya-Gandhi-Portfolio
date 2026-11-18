import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { experience as allExperience } from '../lib/data'
import { MaskHeading, FadeUp } from './Motion'

// Home page keeps it short: role, org, dates, one line. The full story lives on /journey/:id.
export default function Experience({ items }) {
  const reduce = useReducedMotion()
  const list = items?.length ? items : allExperience
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const fill = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1])

  return (
    <section id="experience" className="wrap py-16 sm:py-24">
      <MaskHeading text="The journey so far" accent={[3]} />
      <p className="mt-5 max-w-lg text-base text-ink/65">Freelance, agency, in-house. Three roles, one lane: backend APIs to AI agents.</p>

      <div ref={ref} className="relative mt-12 pl-10 sm:pl-12">
        <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-[2px] bg-line" />
        <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-0 left-[11px] top-0 w-[2px] origin-top bg-accent" />

        {list.map((e, i) => (
          <FadeUp key={e.id} delay={i * 0.05}>
            <article className="group relative border-b border-line py-7 last:border-b-0">
              <span aria-hidden className="absolute -left-10 top-8 h-6 w-6 rounded-full border-[3px] border-accent bg-bg transition-colors group-hover:bg-accent sm:-left-12" />
              <div className="grid gap-3 sm:grid-cols-[230px_1fr] sm:gap-8">
                <div>
                  <p className="date text-accent">{e.period}</p>
                  {e.location && <p className="date mt-1 font-500 text-ink/55">{e.location}</p>}
                </div>
                <div>
                  <h3 className="h-card text-[clamp(1.35rem,2.4vw,1.9rem)]">{e.role}</h3>
                  <p className="mt-1.5 font-display text-lg font-600 normal-case tracking-[-0.01em] text-ink/60 sm:text-xl">@ {e.org}</p>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/75">{e.summary || e.desc}</p>
                  <Link to={`/journey/${e.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-700 uppercase tracking-[0.02em] text-accent underline decoration-accent/40 decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent">
                    Know more about me <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
