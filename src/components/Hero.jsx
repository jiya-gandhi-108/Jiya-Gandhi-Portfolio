import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, Download } from 'lucide-react'
import { stats } from '../lib/data'

const EASE = [0.2, 0.7, 0.1, 1]
const MODES = ['reveal', 'magnet', 'crosshair', 'trail', 'none']

// Which cursor effect to use: ?cursor=xyz in the URL wins (handy for previewing), else data.js.
function useCursorMode(fallback) {
  return useMemo(() => {
    if (typeof window === 'undefined') return 'none'
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return 'none'
    const q = new URLSearchParams(window.location.search).get('cursor')
    return MODES.includes(q) ? q : MODES.includes(fallback) ? fallback : 'none'
  }, [fallback])
}

// Big lime word, split into letters so the magnet effect can move each one.
function Letters({ text, className = '', style }) {
  return (
    <motion.span aria-hidden style={style} className={`absolute block select-none font-display font-900 uppercase leading-[0.8] tracking-[-0.045em] text-accent ${className}`}>
      {text.split('').map((c, i) => (
        <span key={i} data-ch className="inline-block transition-transform duration-300 ease-out will-change-transform">{c}</span>
      ))}
    </motion.span>
  )
}

export default function Hero({ profile, started }) {
  const reduce = useReducedMotion()
  const mode = useCursorMode(profile.heroCursor)
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const imgWrapRef = useRef(null)
  const revealRef = useRef(null)
  const crossX = useRef(null)
  const crossY = useRef(null)
  const readout = useRef(null)
  const trailRef = useRef(null)
  const last = useRef({ x: -999, y: -999 })
  const [inside, setInside] = useState(false)

  // scroll: the letters drift apart, the photo eases in, the headline fades
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const still = reduce ? [0, 0] : null
  const xLeft = useTransform(scrollYProgress, [0, 1], still || ['0%', '-18%'])
  const xRight = useTransform(scrollYProgress, [0, 1], still || ['0%', '18%'])
  const yMid = useTransform(scrollYProgress, [0, 1], still || ['0%', '-45%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.1])
  const fade = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [1, 0])

  const [L1, L2, L3] = profile.heroLetters || ['JIYA', 'GAN', 'DHI']
  const head = profile.headline || []

  const intro = (delay = 0, y = 24) => ({
    initial: { opacity: 0, y: reduce ? 0 : y },
    animate: started ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: EASE },
  })

  const onMove = (e) => {
    const card = cardRef.current
    if (!card || mode === 'none') return
    const r = card.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top

    if (mode === 'reveal' && revealRef.current && imgWrapRef.current) {
      const ir = imgWrapRef.current.getBoundingClientRect()
      revealRef.current.style.setProperty('--x', `${e.clientX - ir.left}px`)
      revealRef.current.style.setProperty('--y', `${e.clientY - ir.top}px`)
    }
    if (mode === 'magnet') {
      card.querySelectorAll('[data-ch]').forEach((el) => {
        const b = el.getBoundingClientRect()
        const dx = b.left + b.width / 2 - e.clientX
        const dy = b.top + b.height / 2 - e.clientY
        const d = Math.hypot(dx, dy)
        const R = 280
        if (d < R) {
          const f = (1 - d / R) * 34
          el.style.transform = `translate(${(dx / d) * f}px, ${(dy / d) * f}px) rotate(${(dx / R) * 6}deg)`
        } else el.style.transform = ''
      })
    }
    if (mode === 'crosshair') {
      if (crossX.current) crossX.current.style.transform = `translateX(${x}px)`
      if (crossY.current) crossY.current.style.transform = `translateY(${y}px)`
      if (readout.current) {
        readout.current.style.transform = `translate(${x + 14}px, ${y + 14}px)`
        readout.current.textContent = `X ${String(Math.round(x)).padStart(4, '0')}  Y ${String(Math.round(y)).padStart(4, '0')}`
      }
    }
    if (mode === 'trail' && trailRef.current) {
      const gx = Math.round(x / 12) * 12
      const gy = Math.round(y / 12) * 12
      if (Math.hypot(gx - last.current.x, gy - last.current.y) >= 12) {
        last.current = { x: gx, y: gy }
        const p = document.createElement('span')
        p.className = 'pix'
        p.style.left = `${gx - 6}px`
        p.style.top = `${gy - 6}px`
        trailRef.current.appendChild(p)
        setTimeout(() => p.remove(), 720)
      }
    }
  }

  const onLeave = () => {
    setInside(false)
    cardRef.current?.querySelectorAll('[data-ch]').forEach((el) => { el.style.transform = '' })
  }

  useEffect(() => {
    if (revealRef.current) revealRef.current.style.setProperty('--r', inside ? '170px' : '0px')
  }, [inside])

  return (
    <section id="top" ref={sectionRef} className="px-3 pt-[72px] sm:px-4 sm:pt-[76px]">
      <h1 className="sr-only">{profile.name}, {profile.role}</h1>

      {/* ---------------- DESKTOP (lg+) ---------------- */}
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setInside(true)}
        onMouseLeave={onLeave}
        className={`relative hidden overflow-hidden rounded-[22px] border border-line bg-bg lg:block ${mode === 'crosshair' ? 'cursor-none' : ''}`}
        style={{ height: 'clamp(660px, calc(100svh - 92px), 960px)' }}
      >
        {/* portrait: sits in the lower right so the headline gets clean space above it */}
        <motion.div ref={imgWrapRef} style={{ scale: imgScale }} className="absolute bottom-0 right-0 top-[25%] w-[56%] origin-bottom">
          <img
            src={profile.avatar_url}
            alt={`Portrait of ${profile.name}`}
            className={`h-full w-full object-cover ${mode === 'reveal' ? 'grayscale' : ''}`}
            style={{ objectPosition: '55% 18%' }}
            loading="eager"
          />
          {mode === 'reveal' && (
            <img
              ref={revealRef}
              src={profile.avatar_url}
              alt=""
              aria-hidden
              className="reveal-mask absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: '55% 18%' }}
            />
          )}
          {/* soft blend into the black on the left and top edges */}
          <div aria-hidden className="absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-bg to-transparent" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-bg to-transparent" />
        </motion.div>

        {/* four thin columns with the receipts, like the reference's phase markers */}
        <motion.div {...intro(0.5, 0)} className="absolute inset-x-[3%] top-[40%] z-[6] grid h-[30%] grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col justify-between border-l border-ink/15 pl-3">
              <span className="mono text-muted">{String(i + 1).padStart(3, '0')}</span>
              <div>
                <p className="font-display text-[clamp(1.8rem,2.6vw,2.6rem)] font-800 leading-none text-ink">{s.value}</p>
                <p className="mono mt-1.5 text-accent">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* the big letters */}
        <motion.div style={{ opacity: fade }} className="pointer-events-none absolute inset-0 z-10"><motion.div {...intro(0.05, 40)} className="absolute inset-0">
          <Letters text={L1} style={{ x: xLeft }} className="left-[2.5%] top-[8%] text-[clamp(8rem,15.5vw,17rem)]" />
          <Letters text={L2} style={{ y: yMid }} className="left-[33%] top-[38%] text-[clamp(8rem,15.5vw,17rem)]" />
          <Letters text={L3} style={{ x: xRight }} className="bottom-[1%] right-[2.5%] text-[clamp(8rem,15.5vw,17rem)]" />
        </motion.div></motion.div>

        {/* headline, top right */}
        <motion.div style={{ opacity: fade }} className="absolute right-[3%] top-[8%] z-20 w-[40%] max-w-[600px]"><motion.div {...intro(0.25)}>
          <p className="font-display text-[clamp(1.6rem,3vw,3.2rem)] font-800 uppercase leading-[0.95] tracking-[-0.025em]">
            <span className="block text-accent">{head[0]}</span>
            <span className="block text-ink">{head[1]}</span>
            <span className="block text-accent">{head[2]}</span>
          </p>
          <div className="bar mt-4">
            <p className="font-display text-base font-800 uppercase leading-tight text-accent">{profile.name}</p>
            <p className="mono mt-0.5 text-ink/80">{profile.role} · {profile.location.split(',')[0]}</p>
          </div>
        </motion.div></motion.div>

        {/* bottom left: what I do + CTAs */}
        <motion.div {...intro(0.4)} className="absolute bottom-[4.5%] left-[3%] z-20 flex items-end gap-5">
          <div className="mono leading-tight text-accent">
            <p>{profile.location.split(',')[0]}</p>
            <p className="text-ink">{new Date().getFullYear()}</p>
          </div>
          <div>
            <ul className="bar border-ink/40 font-display text-[15px] font-700 uppercase leading-[1.35] text-ink">
              {profile.heroList.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="#work" className="btn-primary">See my work <ArrowDownRight size={16} /></a>
              {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost bg-bg/60"><Download size={15} /> Résumé</a>}
            </div>
          </div>
        </motion.div>

        {/* cursor effect layers */}
        {mode === 'crosshair' && (
          <div aria-hidden className={`pointer-events-none absolute inset-0 z-30 transition-opacity ${inside ? 'opacity-100' : 'opacity-0'}`}>
            <span ref={crossX} className="absolute inset-y-0 left-0 w-px bg-accent/80" />
            <span ref={crossY} className="absolute inset-x-0 top-0 h-px bg-accent/80" />
            <span ref={readout} className="mono absolute left-0 top-0 whitespace-pre rounded bg-accent px-1.5 py-0.5 text-black" />
          </div>
        )}
        {mode === 'trail' && <div ref={trailRef} aria-hidden className="pointer-events-none absolute inset-0 z-30" />}
      </div>

      {/* ---------------- MOBILE / TABLET (< lg) ---------------- */}
      <div className="overflow-hidden rounded-[20px] border border-line bg-bg lg:hidden">
        <motion.p
          aria-hidden
          {...intro(0.05, 30)}
          className="relative z-10 px-4 pt-5 font-display text-[31vw] font-900 uppercase leading-[0.8] tracking-[-0.045em] text-accent sm:text-[26vw]"
        >
          {L1}
        </motion.p>
        <div className="relative -mt-[7vw] aspect-[4/5] sm:aspect-[5/4]">
          <img src={profile.avatar_url} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover" style={{ objectPosition: '56% 22%' }} />
          <div aria-hidden className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-bg to-transparent" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
          <p aria-hidden className="absolute -bottom-[1vw] right-3 font-display text-[22vw] font-900 uppercase leading-[0.8] tracking-[-0.045em] text-accent sm:text-[19vw]">
            {L2}{L3}
          </p>
        </div>

        <div className="px-5 pb-7 pt-6 sm:px-8">
          <motion.p {...intro(0.2)} className="font-display text-[clamp(1.9rem,8.4vw,3.4rem)] font-800 uppercase leading-[0.95] tracking-[-0.025em]">
            <span className="block text-accent">{head[0]}</span>
            <span className="block text-ink">{head[1]}</span>
            <span className="block text-accent">{head[2]}</span>
          </motion.p>
          <div className="bar mt-4">
            <p className="font-display text-base font-800 uppercase text-accent">{profile.name}</p>
            <p className="mono mt-0.5 text-ink/80">{profile.role} · {profile.location.split(',')[0]}</p>
          </div>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/75">{profile.tldr}</p>

          <div className="mt-7 grid grid-cols-2 gap-y-6">
            {stats.map((s, i) => (
              <div key={s.label} className="border-l border-ink/15 pl-3">
                <span className="mono text-muted">{String(i + 1).padStart(3, '0')}</span>
                <p className="mt-2 font-display text-3xl font-800 leading-none text-ink">{s.value}</p>
                <p className="mono mt-1.5 text-accent">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#work" className="btn-primary justify-center">See my work <ArrowDownRight size={16} /></a>
            {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost justify-center"><Download size={15} /> Résumé</a>}
          </div>
        </div>
      </div>
    </section>
  )
}
