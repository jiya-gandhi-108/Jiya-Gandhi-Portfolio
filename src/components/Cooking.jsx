import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Clock, ChevronDown } from 'lucide-react'
import { Reveal } from './Reveal'

/* A little frying pan that flips near the heading — the literal "cooking". */
function Pan({ style }) {
  return (
    <motion.span style={style} className="inline-block align-middle">
      <motion.svg
        width="44" height="44" viewBox="0 0 64 64" fill="none"
        animate={{ rotate: [0, -15, 0, 9, 0], y: [0, -3, 0, -1, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <ellipse cx="26" cy="40" rx="17" ry="7" fill="rgb(var(--line))" />
        <path d="M9 38a17 7 0 0 0 34 0v-2a17 7 0 0 1-34 0z" fill="rgb(var(--ink))" opacity="0.35" />
        <ellipse cx="26" cy="36" rx="17" ry="7" fill="rgb(var(--graphite))" stroke="rgb(var(--accent))" strokeWidth="2" />
        <rect x="41" y="33" width="20" height="5" rx="2.5" transform="rotate(-14 41 33)" fill="rgb(var(--accent))" />
        <motion.circle cx="26" cy="30" r="4" fill="rgb(var(--accent))"
          animate={{ y: [0, -16, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.svg>
    </motion.span>
  )
}

/* One soft, layered bank of cloud that slowly drifts on its own. */
function CloudBank({ side }) {
  const flip = side === 'right'
  return (
    <motion.div
      className="absolute inset-y-0 h-full w-full"
      animate={{ x: [0, flip ? -14 : 14, 0], y: [0, -8, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full"
        style={{ filter: 'blur(14px)' }} aria-hidden>
        <defs>
          <radialGradient id={`puff-${side}`} cx="40%" cy="45%" r="70%">
            <stop offset="0%" stopColor="rgb(var(--paper))" stopOpacity="1" />
            <stop offset="60%" stopColor="rgb(var(--paper))" stopOpacity="0.96" />
            <stop offset="100%" stopColor="rgb(var(--paper))" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`base-${side}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--paper))" stopOpacity="0.98" />
            <stop offset="70%" stopColor="rgb(var(--paper))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="rgb(var(--paper))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="70" width="380" height="280" fill={`url(#base-${side})`} />
        <g fill={`url(#puff-${side})`}>
          <circle cx="110" cy="150" r="150" />
          <circle cx="240" cy="110" r="120" />
          <circle cx="70" cy="270" r="140" />
          <circle cx="250" cy="290" r="150" />
          <circle cx="360" cy="200" r="135" />
          <circle cx="180" cy="210" r="120" />
          <circle cx="330" cy="330" r="110" />
        </g>
      </svg>
    </motion.div>
  )
}

export default function Cooking({ project }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  // Reveal spread across a wide scroll window so it unfolds slowly, while the
  // section is actually on screen — smoothed with a spring.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.35'] })
  const p = useSpring(scrollYProgress, { stiffness: 55, damping: 22, mass: 0.5 })

  const leftX = useTransform(p, [0.08, 0.72], ['0%', '-112%'])
  const rightX = useTransform(p, [0.08, 0.72], ['0%', '112%'])
  const cloudFade = useTransform(p, [0.45, 0.85], [1, 0])
  const cardOpacity = useTransform(p, [0.12, 0.6], [reduce ? 1 : 0.2, 1])
  const cardScale = useTransform(p, [0.12, 0.78], [reduce ? 1 : 0.9, 1])
  const cardY = useTransform(p, [0.12, 0.78], [reduce ? 0 : 34, 0])
  const panReveal = useTransform(p, [0.5, 0.9], [reduce ? 1 : 0, 1])
  const hintFade = useTransform(p, [0, 0.22], [reduce ? 0 : 1, 0])

  if (!project) return null
  const updates = Array.isArray(project.updates) ? project.updates : []
  const latest = [...updates].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0]

  return (
    <section id="cooking" ref={ref} className="relative w-full py-24 sm:py-32">
      {/* heading */}
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
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
          <p className="mt-4 max-w-lg font-sans text-sm text-muted">The one thing I&apos;m building right now — keep scrolling and let the clouds clear.</p>
        </Reveal>
      </div>

      {/* full-bleed reveal stage */}
      <div className="relative mt-12 w-full overflow-hidden py-6">
        <motion.div style={{ opacity: cardOpacity, scale: cardScale, y: cardY }} className="origin-center">
          <div className="mx-auto max-w-6xl px-5 sm:px-10">
            <Link to={`/project/${project.id}`} className="group block overflow-hidden rounded-2xl border border-line bg-graphite">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="relative h-60 overflow-hidden md:h-full md:min-h-[360px]">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="grid h-full w-full place-items-center tech-grid">
                      <span className="display text-6xl font-700 text-line">{project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}</span>
                    </div>
                  )}
                </div>
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
                  <h3 className="display mt-4 text-2xl font-600 leading-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">{project.title}</h3>
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
          </div>
        </motion.div>

        {/* the clouds — full width, part on scroll */}
        {!reduce && (
          <>
            <motion.div style={{ x: leftX, opacity: cloudFade, willChange: 'transform' }} className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[62%]">
              <CloudBank side="left" />
            </motion.div>
            <motion.div style={{ x: rightX, opacity: cloudFade, willChange: 'transform' }} className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[62%]">
              <CloudBank side="right" />
            </motion.div>
            <motion.div style={{ opacity: hintFade }} className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex flex-col items-center text-muted">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em]">scroll to plate up</span>
              <ChevronDown size={16} className="mt-1 animate-bounce text-accent" />
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
