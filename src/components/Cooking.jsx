import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Reveal } from './Reveal'

// A little frying pan that flips near the heading — the literal "cooking".
function Pan({ style }) {
  return (
    <motion.span style={style} className="inline-block align-middle">
      <motion.svg
        width="46" height="46" viewBox="0 0 64 64" fill="none"
        animate={{ rotate: [0, -16, 0, 10, 0], y: [0, -3, 0, -1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        {/* pan body */}
        <ellipse cx="26" cy="40" rx="17" ry="7" fill="rgb(var(--line))" />
        <path d="M9 38a17 7 0 0 0 34 0v-2a17 7 0 0 1-34 0z" fill="rgb(var(--ink))" opacity="0.35" />
        <ellipse cx="26" cy="36" rx="17" ry="7" fill="rgb(var(--graphite))" stroke="rgb(var(--accent))" strokeWidth="2" />
        {/* handle */}
        <rect x="41" y="33" width="20" height="5" rx="2.5" transform="rotate(-14 41 33)" fill="rgb(var(--accent))" />
        {/* flipping food */}
        <motion.circle
          cx="26" cy="30" r="4" fill="rgb(var(--accent))"
          animate={{ y: [0, -16, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
    </motion.span>
  )
}

export default function Cooking({ project }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })

  const leftX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-135%'])
  const rightX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '135%'])
  const cloudFade = useTransform(scrollYProgress, [0.2, 0.9], reduce ? [0, 0] : [1, 0])
  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.7], [reduce ? 1 : 0.25, 1])
  const cardScale = useTransform(scrollYProgress, [0.1, 0.8], [reduce ? 1 : 0.94, 1])
  const panReveal = useTransform(scrollYProgress, [0.5, 0.95], [reduce ? 1 : 0, 1])

  if (!project) return null

  const updates = Array.isArray(project.updates) ? project.updates : []
  const latest = [...updates].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0]

  return (
    <section id="cooking" ref={ref} className="mx-auto max-w-7xl px-5 py-20 sm:px-10 sm:py-28">
      <div className="flex items-center gap-3">
        <Reveal variant="left"><p className="font-sans text-xs uppercase tracking-[0.25em] text-accent">fresh out the kitchen</p></Reveal>
        <Pan style={{ opacity: panReveal }} />
      </div>
      <Reveal variant="up" delay={0.05}>
        <h2 className="display mt-2 text-4xl font-600 leading-[1.05] text-ink sm:text-5xl">
          Currently <span className="italic star">cooking</span>
        </h2>
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <p className="mt-4 max-w-lg font-sans text-sm text-muted">The one thing I&apos;m building right now — scroll and let the clouds clear.</p>
      </Reveal>

      {/* reveal stage */}
      <div className="relative mt-12 overflow-hidden rounded-2xl border border-line">
        <motion.div style={{ opacity: cardOpacity, scale: cardScale }} className="origin-center">
          <Link to={`/project/${project.id}`} className="group block bg-graphite">
            <div className="grid gap-0 md:grid-cols-2">
              {/* image / initials */}
              <div className="relative h-56 overflow-hidden md:h-full md:min-h-[340px]">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="grid h-full w-full place-items-center tech-grid">
                    <span className="display text-6xl font-700 text-line">{project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}</span>
                  </div>
                )}
              </div>

              {/* details */}
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  {project.status && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-sans text-xs font-600 uppercase tracking-wide text-accent">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                      </span>
                      {project.status}
                    </span>
                  )}
                  {project.tag && <span className="font-sans text-xs uppercase tracking-[0.2em] text-muted">{project.tag}</span>}
                </div>

                <h3 className="display mt-4 text-2xl font-600 leading-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                  {project.title}
                </h3>
                {project.subtitle && <p className="mt-2 font-sans text-sm text-muted sm:text-base">{project.subtitle}</p>}

                {latest && (
                  <div className="mt-6 rounded-lg border border-line bg-bg p-4">
                    <p className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.15em] text-muted">
                      <Clock size={13} className="text-accent" /> Latest update{latest.date ? ` · ${latest.date}` : ''}
                    </p>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink/90">{latest.note}</p>
                  </div>
                )}

                <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-600 text-accent">
                  See the full project <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* the clouds that part on scroll */}
        {!reduce && (
          <>
            <motion.div style={{ x: leftX, opacity: cloudFade }} className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3/4">
              <Cloud side="left" />
            </motion.div>
            <motion.div style={{ x: rightX, opacity: cloudFade }} className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3/4">
              <Cloud side="right" />
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

function Cloud({ side }) {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="none" className="h-full w-full"
      style={{ filter: 'blur(2px)', transform: side === 'right' ? 'scaleX(-1)' : 'none' }} aria-hidden>
      <defs>
        <radialGradient id={`cl-${side}`} cx="35%" cy="45%" r="75%">
          <stop offset="0%" stopColor="rgb(var(--paper))" stopOpacity="0.97" />
          <stop offset="70%" stopColor="rgb(var(--paper))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(var(--paper))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill={`url(#cl-${side})`}>
        <circle cx="120" cy="150" r="130" />
        <circle cx="230" cy="120" r="110" />
        <circle cx="90" cy="260" r="120" />
        <circle cx="250" cy="270" r="130" />
        <circle cx="320" cy="190" r="120" />
        <rect x="0" y="120" width="320" height="200" />
      </g>
    </svg>
  )
}
