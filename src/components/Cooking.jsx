import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, Clock } from 'lucide-react'
import { MaskHeading, FadeUp } from './Motion'
import { initials, StackTags } from './Projects'

const EASE = [0.76, 0, 0.24, 1]
const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(/[,|]/).map((s) => s.trim()).filter(Boolean))

function Detail({ title, children, className = '', delay = 0 }) {
  return (
    <FadeUp delay={delay} className={`card p-6 sm:p-7 ${className}`}>
      <h4 className="h-card text-lg text-accent">{title}</h4>
      <div className="mt-3 text-base leading-relaxed text-ink/80">{children}</div>
    </FadeUp>
  )
}

// "Currently cooking": the card hides behind two panels that slide apart when you reach it,
// then the details (aim, what it does, what I'm building, stack, where it's headed) fade in below.
export default function Cooking({ project }) {
  const reduce = useReducedMotion()
  const stage = useRef(null)
  const open = useInView(stage, { once: true, amount: 0.55 }) || reduce

  if (!project) return null
  const stack = toList(project.stack)
  const handled = toList(project.handled)
  const updates = Array.isArray(project.updates) ? project.updates : []
  const latest = [...updates].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0]
  const meta = [project.tag, project.year].filter(Boolean).join(' · ')

  return (
    <section id="cooking" className="wrap py-16 sm:py-24">
      <MaskHeading text="Currently cooking" accent={[1]} />
      <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/70">The one thing on the stove right now, and everything that goes into it.</p>

      <div ref={stage} className="relative mt-10 overflow-hidden rounded-2xl">
        <div className="card grid overflow-hidden md:grid-cols-2">
          <Link to={`/project/${project.id}`} className="group relative block h-64 overflow-hidden md:h-full md:min-h-[400px]" aria-label={`Open ${project.title}`}>
            {project.image_url ? (
              <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="grid h-full w-full place-items-center"><span className="font-display text-7xl font-900 text-line">{initials(project.title)}</span></div>
            )}
          </Link>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            {meta && <p className="date text-accent">{meta}</p>}
            <h3 className="h-card mt-3 text-[clamp(1.7rem,3.2vw,2.75rem)]">{project.title}</h3>
            {project.subtitle && <p className="mt-2 font-display text-lg font-600 text-ink/60">{project.subtitle}</p>}
            <p className="mt-5 text-[17px] leading-relaxed text-ink/80">{project.summary || project.built}</p>
            {latest && (
              <div className="mt-6 rounded-xl border border-line bg-bg p-4">
                <p className="date flex items-center gap-2 text-accent"><Clock size={13} /> Latest{latest.date ? ` · ${latest.date}` : ''}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{latest.note}</p>
              </div>
            )}
            <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
              <Link to={`/project/${project.id}`} className="btn-primary">View Details <ArrowUpRight size={16} /></Link>
              {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Source on GitHub"><Github size={16} /></a>}
            </div>
          </div>
        </div>

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

      {/* the full breakdown */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {project.problem && <Detail title="The aim">{project.problem}</Detail>}
        {project.built && <Detail title="What it does" delay={0.05}>{project.built}</Detail>}
        {handled.length > 0 && (
          <Detail title="What I'm building">
            <ul className="space-y-2">
              {handled.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Detail>
        )}
        {stack.length > 0 && <Detail title="The stack" delay={0.05}><StackTags items={stack} /></Detail>}
        {project.outcome && (
          <Detail title="Where it's headed" className="md:col-span-2">{project.outcome}</Detail>
        )}
      </div>
    </section>
  )
}
