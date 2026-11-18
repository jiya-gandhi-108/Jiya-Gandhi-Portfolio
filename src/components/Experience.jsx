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

      <div ref={ref} className="relative mt-12 pl-8 sm:pl-10">
        <span aria-hidden className="absolute bottom-0 left-[6px] top-0 w-px bg-line sm:left-[8px]" />
        <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-0 left-[6px] top-0 w-px origin-top bg-accent sm:left-[8px]" />

        {list.map((e, i) => (
          <FadeUp key={e.id} delay={i * 0.05}>
            <article className="group relative border-b border-line py-7 last:border-b-0">
              <span aria-hidden className="absolute -left-8 top-9 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg transition-colors group-hover:bg-accent sm:-left-10" />
              <div className="grid gap-2 sm:grid-cols-[210px_1fr] sm:gap-8">
                <div>
                  <p className="mono text-accent">{e.period}</p>
                  {e.location && <p className="mono mt-1 text-muted">{e.location}</p>}
                </div>
                <div>
                  <h3 className="h-card text-[clamp(1.35rem,2.4vw,1.9rem)]">
                    {e.role} <span className="text-ink/45">@ {e.org}</span>
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/70">{e.summary || e.desc}</p>
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
