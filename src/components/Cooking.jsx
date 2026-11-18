import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, Clock } from 'lucide-react'
import { MaskHeading, FadeUp } from './Motion'
import { initials, StackTags } from './Projects'

const EASE = [0.76, 0, 0.24, 1]
const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(/[,|]/).map((s) => s.trim()).filter(Boolean))

function Detail({ title, children, className = '', delay = 0, light = false }) {
  return (
    <FadeUp delay={delay} className={`rounded-2xl border p-6 sm:p-7 ${light ? 'border-black/10 bg-white' : 'border-line bg-graphite'} ${className}`}>
      {light
        ? <h4 className="h-card inline-block rounded-md bg-accent px-2 py-0.5 text-lg text-black">{title}</h4>
        : <h4 className="h-card text-lg text-accent">{title}</h4>}
      <div className={`mt-3 text-base leading-relaxed ${light ? 'text-black/75' : 'text-ink/80'}`}>{children}</div>
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
  // light showcase image ("theme": "light") -> the whole section switches to light mode
  const L = project.theme === 'light'

  return (
    <section id="cooking" className="wrap py-16 sm:py-24">
      <div className={L ? '-mx-5 rounded-[28px] bg-light px-5 py-10 text-black sm:-mx-8 sm:px-8 sm:py-14 lg:-mx-10 lg:px-10' : ''}>
      <MaskHeading
        text="Currently cooking"
        accent={[1]}
        className={`h-sec ${L ? '!text-black' : ''}`}
        accentClass={L ? 'rounded-lg bg-accent px-[0.12em] text-black' : 'text-accent'}
      />
      <p className={`mt-5 max-w-xl text-[17px] leading-relaxed ${L ? 'text-black/65' : 'text-ink/70'}`}>The one thing on the stove right now, and everything that goes into it.</p>

      <div ref={stage} className="relative mt-10 overflow-hidden rounded-2xl">
        <div className={`grid items-center overflow-hidden rounded-2xl border md:grid-cols-2 ${L ? 'border-black/10 bg-white' : 'border-line bg-graphite'}`}>
          <Link to={`/project/${project.id}`} className="group relative block aspect-[4/3] overflow-hidden" aria-label={`Open ${project.title}`}>
            {project.image_url ? (
              <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="grid h-full w-full place-items-center"><span className="font-display text-7xl font-900 text-line">{initials(project.title)}</span></div>
            )}
          </Link>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            {meta && (L
              ? <p className="date inline-block self-start rounded-full bg-accent px-3 py-1 text-black">{meta}</p>
              : <p className="date text-accent">{meta}</p>)}
            <h3 className={`h-card mt-3 text-[clamp(1.7rem,3.2vw,2.75rem)] ${L ? 'text-black' : ''}`}>{project.title}</h3>
            {project.subtitle && <p className={`mt-2 font-display text-lg font-600 ${L ? 'text-black/60' : 'text-ink/60'}`}>{project.subtitle}</p>}
            <p className={`mt-5 text-[17px] leading-relaxed ${L ? 'text-black/75' : 'text-ink/80'}`}>{project.summary || project.built}</p>
            {latest && (
              <div className="mt-6 rounded-xl border border-line bg-bg p-4">
                <p className="date flex items-center gap-2 text-accent"><Clock size={13} /> Latest{latest.date ? ` · ${latest.date}` : ''}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{latest.note}</p>
              </div>
            )}
            <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
              <Link to={`/project/${project.id}`} className="btn-primary">View Details <ArrowUpRight size={16} /></Link>
              {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className={L ? 'icon-btn border-black/20 text-black hover:border-black hover:text-black' : 'icon-btn'} aria-label="Source on GitHub"><Github size={16} /></a>}
            </div>
          </div>
        </div>

        {/* the curtain */}
        {!reduce && (
          <>
            <motion.div aria-hidden initial={{ x: 0 }} animate={open ? { x: '-101%' } : {}} transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
              className={`pointer-events-none absolute inset-y-0 left-0 z-10 flex w-1/2 items-center justify-end border-r border-accent pr-4 ${L ? 'bg-black' : 'bg-graphite'}`}>
              <span className="font-display text-[clamp(1.4rem,4vw,3.5rem)] font-900 uppercase tracking-[-0.03em] text-ink">psst,</span>
            </motion.div>
            <motion.div aria-hidden initial={{ x: 0 }} animate={open ? { x: '101%' } : {}} transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
              className={`pointer-events-none absolute inset-y-0 right-0 z-10 flex w-1/2 items-center border-l border-accent pl-4 ${L ? 'bg-accent' : 'bg-graphite'}`}>
              <span className={`font-display text-[clamp(1.4rem,4vw,3.5rem)] font-900 uppercase tracking-[-0.03em] ${L ? 'text-black' : 'text-accent'}`}>sneak peek</span>
            </motion.div>
          </>
        )}
      </div>

      {/* the full breakdown */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {project.problem && <Detail light={L} title="The aim">{project.problem}</Detail>}
        {project.built && <Detail light={L} title="What it does" delay={0.05}>{project.built}</Detail>}
        {handled.length > 0 && (
          <Detail light={L} title="What I'm building">
            <ul className="space-y-2">
              {handled.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${L ? 'bg-black' : 'bg-accent'}`} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Detail>
        )}
        {stack.length > 0 && <Detail light={L} title="The stack" delay={0.05}><StackTags items={stack} light={L} /></Detail>}
        {project.outcome && (
          <Detail light={L} title="Where it's headed" className="md:col-span-2">{project.outcome}</Detail>
        )}
      </div>
      </div>
    </section>
  )
}
