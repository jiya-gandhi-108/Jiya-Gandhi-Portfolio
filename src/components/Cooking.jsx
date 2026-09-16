import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Reveal } from './Reveal'

/* A little frying pan that flips near the heading — the literal "cooking". */
function Pan({ visible }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={visible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 1.5, ease: 'backOut' }}
      className="inline-block align-middle"
    >
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

/* One soft, layered bank of cumulus cloud — shaped, white, with a shine. */
function CloudBank({ side }) {
  const flip = side === 'right'
  const uid = `cl-${side}`
  return (
    <motion.div
      className="absolute inset-y-0 h-full w-full"
      animate={{ x: [0, flip ? -14 : 14, 0], y: [0, -7, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <svg viewBox="0 0 520 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full"
        style={{ filter: 'drop-shadow(0 10px 22px rgba(20,24,40,0.25))' }} aria-hidden>
        <defs>
          {/* volume: bright white on top → cool grey underside */}
          <linearGradient id={`${uid}-body`} gradientUnits="userSpaceOnUse" x1="0" y1="60" x2="0" y2="380">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="42%" stopColor="#f3f6fc" />
            <stop offset="78%" stopColor="#dbe2f1" />
            <stop offset="100%" stopColor="#c2cbe2" />
          </linearGradient>
          {/* specular shine near the top */}
          <radialGradient id={`${uid}-shine`} gradientUnits="userSpaceOnUse" cx="180" cy="150" r="170">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          {/* feathered edges so the silhouette stays soft, not cut out */}
          <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <g filter={`url(#${uid}-soft)`}>
          {/* veil that keeps the centre covered before it parts */}
          <path d="M40 400 V250 Q40 210 90 210 h360 q40 0 40 45 V400 Z" fill={`url(#${uid}-body)`} />
          {/* main cumulus mass — lumpy top, flat base */}
          <g fill={`url(#${uid}-body)`}>
            <circle cx="95"  cy="270" r="92" />
            <circle cx="185" cy="235" r="105" />
            <circle cx="290" cy="220" r="115" />
            <circle cx="395" cy="245" r="100" />
            <circle cx="470" cy="285" r="82" />
            <circle cx="240" cy="300" r="110" />
            <circle cx="140" cy="310" r="90" />
            <circle cx="360" cy="315" r="95" />
            <rect x="55" y="300" width="420" height="110" rx="50" />
          </g>
          {/* upper fluff for depth */}
          <g fill={`url(#${uid}-body)`} opacity="0.9">
            <circle cx="150" cy="150" r="58" />
            <circle cx="225" cy="128" r="66" />
            <circle cx="305" cy="140" r="60" />
          </g>
          {/* shine / gloss on top-left */}
          <g fill={`url(#${uid}-shine)`}>
            <ellipse cx="200" cy="185" rx="150" ry="70" />
            <ellipse cx="300" cy="165" rx="90" ry="45" />
          </g>
          {/* tiny bright specular pops */}
          <circle cx="175" cy="150" r="26" fill="#ffffff" opacity="0.5" />
          <circle cx="255" cy="135" r="20" fill="#ffffff" opacity="0.45" />
        </g>
      </svg>
    </motion.div>
  )
}

export default function Cooking({ project }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const show = inView || reduce

  const partEase = [0.6, 0, 0.2, 1]

  if (!project) return null
  const updates = Array.isArray(project.updates) ? project.updates : []
  const latest = [...updates].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0]

  return (
    <section id="cooking" ref={ref} className="relative w-full py-24 sm:py-32">
      {/* heading */}
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="flex items-center gap-3">
          <Reveal variant="left"><p className="font-sans text-xs uppercase tracking-[0.25em] text-accent">fresh out the kitchen</p></Reveal>
          <Pan visible={show} />
        </div>
        <Reveal variant="up" delay={0.05}>
          <h2 className="display mt-2 text-4xl font-600 leading-[1.05] text-ink sm:text-5xl">
            Currently <span className="italic star">cooking</span>
          </h2>
        </Reveal>
        <Reveal variant="up" delay={0.1}>
          <p className="mt-4 max-w-lg font-sans text-sm text-muted">The one thing I&apos;m building right now.</p>
        </Reveal>
      </div>

      {/* full-bleed reveal stage */}
      <div className="relative mt-12 w-full overflow-hidden py-6">
        <motion.div
          initial={{ opacity: reduce ? 1 : 0.2, y: reduce ? 0 : 34, scale: reduce ? 1 : 0.94 }}
          animate={show ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: reduce ? 0 : 0.55, ease: partEase }}
          className="origin-center"
        >
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

        {/* the clouds — part once, when the section comes into view */}
        {!reduce && (
          <>
            <motion.div
              initial={{ x: '0%', opacity: 1 }}
              animate={show ? { x: '-114%', opacity: 0 } : {}}
              transition={{ duration: 1.8, delay: 0.15, ease: partEase, opacity: { duration: 1.9, delay: 0.4 } }}
              style={{ willChange: 'transform' }}
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[62%]"
            >
              <CloudBank side="left" />
            </motion.div>
            <motion.div
              initial={{ x: '0%', opacity: 1 }}
              animate={show ? { x: '114%', opacity: 0 } : {}}
              transition={{ duration: 1.8, delay: 0.15, ease: partEase, opacity: { duration: 1.9, delay: 0.4 } }}
              style={{ willChange: 'transform' }}
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[62%]"
            >
              <CloudBank side="right" />
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
