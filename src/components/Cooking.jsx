import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { MaskHeading } from './Motion'
import { initials } from './Projects'

const EASE = [0.76, 0, 0.24, 1]

// "Currently cooking": the card hides behind two solid panels that slide apart when you reach it.
export default function Cooking({ project }) {
  const reduce = useReducedMotion()
  const stage = useRef(null)
  const open = useInView(stage, { once: true, amount: 0.55 }) || reduce

  if (!project) return null
  const updates = Array.isArray(project.updates) ? project.updates : []
  const latest = [...updates].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0]

  return (
    <section id="cooking" className="wrap py-16 sm:py-24">
      <div className="flex items-end gap-4">
        <MaskHeading text="Currently cooking" accent={[1]} />
        <span aria-hidden className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/50 px-3 py-1">
          <span className="h-2 w-2 animate-blink rounded-full bg-accent" />
          <span className="mono text-accent">WIP</span>
        </span>
      </div>
      <p className="mt-5 max-w-lg text-base text-ink/65">The one thing on the stove right now.</p>

      <div ref={stage} className="relative mt-10 overflow-hidden rounded-2xl">
        <Link to={`/project/${project.id}`} className="card group grid overflow-hidden md:grid-cols-2">
          <div className="relative h-60 overflow-hidden md:h-full md:min-h-[380px]">
            {project.image_url ? (
              <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="grid h-full w-full place-items-center"><span className="font-display text-7xl font-900 text-line">{initials(project.title)}</span></div>
            )}
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            {project.tag && <p className="mono text-muted">{project.tag}</p>}
            <h3 className="h-card mt-4 text-[clamp(1.6rem,3vw,2.5rem)] transition-colors group-hover:text-accent">{project.title}</h3>
            {project.subtitle && <p className="mt-3 text-base text-ink/70">{project.subtitle}</p>}
            {latest && (
              <div className="mt-6 rounded-xl border border-line bg-bg p-4">
                <p className="mono flex items-center gap-2 text-accent"><Clock size={12} /> Latest{latest.date ? ` · ${latest.date}` : ''}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/85">{latest.note}</p>
              </div>
            )}
            <span className="mt-7 inline-flex items-center gap-2 font-display text-sm font-700 uppercase text-accent">
              See the full build <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>

        {/* the curtain */}
        {!reduce && (
          <>
            <motion.div aria-hidden initial={{ x: 0 }} animate={open ? { x: '-101%' } : {}} transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
              className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-1/2 items-center justify-end border-r border-accent bg-graphite pr-4">
              <span className="font-display text-[clamp(1.4rem,4vw,3.5rem)] font-900 uppercase tracking-[-0.03em] text-ink">psst,</span>
            </motion.div>
            <motion.div aria-hidden initial={{ x: 0 }} animate={open ? { x: '101%' } : {}} transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
              className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-1/2 items-center border-l border-accent bg-graphite pl-4">
              <span className="font-display text-[clamp(1.4rem,4vw,3.5rem)] font-900 uppercase tracking-[-0.03em] text-accent">sneak peek</span>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
