import { useLayoutEffect, useMemo, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, Download, MapPin } from 'lucide-react'

const EASE = [0.2, 0.7, 0.1, 1]
const STATS_H = 118 // height the '15+ / location' block opens up to (desktop)
const clamp01 = (v) => Math.min(1, Math.max(0, v))
const lerp = (a, b, k) => a + (b - a) * k

// The hero is a pinned, two-stage scroll:
//   stage 1  : photo in the centre, JIYA top-left, GANDHI bottom-right, and roles + headline + buttons
//              sitting small in the empty space on the left
//   scrolling: only the name fades. The photo slides centre -> left while the text column slides
//              left -> right and grows; "15+ client projects" and the location open up inside it
// Hover (desktop): a circle around the cursor shows the photo in colour and turns the lime name white.

function useCursorOn(setting) {
  return useMemo(() => {
    if (typeof window === 'undefined' || setting === 'none') return false
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return fine && !reduce
  }, [setting])
}

const nameCls = 'absolute block select-none whitespace-nowrap font-display font-900 uppercase leading-[0.8] tracking-[-0.045em]'

export default function Hero({ profile, started }) {
  const reduce = useReducedMotion()
  const cursorOn = useCursorOn(profile.heroCursor)
  const runway = useRef(null)
  const cardRef = useRef(null)
  const rolesRef = useRef(null)
  const lowerRef = useRef(null)

  const { scrollYProgress: p } = useScroll({ target: runway, offset: ['start start', 'end end'] })
  const t = (input, output) => useTransform(p, input, output) // eslint-disable-line react-hooks/rules-of-hooks

  // only the name fades out
  const nameOpacity = t([0, 0.28], [1, 0])
  const jiyaY = t([0, 0.32], [0, -90])
  const gandhiY = t([0, 0.32], [0, 90])
  const hintOpacity = t([0, 0.1], [1, 0])
  // photo: centre -> left (desktop), centre -> top-left and smaller (mobile)
  const imgLeft = t([0.12, 0.58], ['50%', '25%'])
  const imgScale = t([0.12, 0.58], [1, 0.9])
  const mImgLeft = t([0.12, 0.55], ['50%', '27%'])
  const mImgTop = t([0.12, 0.55], ['17%', '2%'])
  const mImgScale = t([0.12, 0.55], [1, 0.58])
  // lower block (headline + buttons): bottom-left -> right side, grows a little
  const colLeft = t([0.12, 0.6], ['3%', '52%'])
  const colBottom = t([0.45, 0.66], ['5%', '13%'])
  const colScale = t([0.12, 0.6], [0.8, 1])
  // the 15+ / location block opens up inside the column once it has arrived
  const statsH = t([0.5, 0.72], [0, STATS_H])
  const statsO = t([0.58, 0.74], [0, 1])
  const mStatsH = t([0.45, 0.68], [0, 84])

  // roles: top-right corner -> sits right above the headline. Positions depend on the card size,
  // so we measure the card and the blocks and keep them in a motion value.
  const dims = useMotionValue({ W: 0, H: 0, rw: 0, rh: 0, low: 0, jr: 0 })
  // start: scaled so the two lines fit between JIYA and the right edge. End: fits the right column.
  const s1 = (d) => Math.min(1, (d.W * 0.97 - (d.jr + 28)) / (d.rw || 1))
  const s2 = (d) => Math.min(1, (d.W * 0.45) / (d.rw || 1))
  const kR = (v) => clamp01((v - 0.12) / 0.48)
  const rolesScale = useTransform([p, dims], ([v, d]) => lerp(s1(d), s2(d), kR(v)))
  const rolesLeft = useTransform([p, dims], ([v, d]) => lerp(d.W * 0.97 - d.rw * s1(d), d.W * 0.52, kR(v)))
  const rolesTop = useTransform([p, dims], ([v, d]) =>
    lerp(d.H * 0.05 + 40, d.H * 0.87 - d.low - 36 - d.rh * s2(d), clamp01((v - 0.12) / 0.54)),
  )
  useLayoutEffect(() => {
    const measure = () => {
      const c = cardRef.current, r = rolesRef.current, l = lowerRef.current
      if (!c || !r || !l || !c.clientWidth) return
      const j = c.querySelector('[data-jiya]')
      dims.set({ W: c.clientWidth, H: c.clientHeight, rw: r.offsetWidth, rh: r.offsetHeight, low: l.offsetHeight - statsH.get() + STATS_H, jr: j ? j.offsetLeft + j.offsetWidth : 0 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (cardRef.current) ro.observe(cardRef.current)
    document.fonts?.ready?.then(measure)
    return () => ro.disconnect()
  }, [dims, statsH])

  const intro = (delay = 0, y = 30) => ({
    initial: { opacity: 0, y: reduce ? 0 : y },
    animate: started ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: EASE },
  })

  const onMove = (e) => {
    const el = cardRef.current
    if (!el || !cursorOn) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  const setRadius = (v) => cursorOn && cardRef.current?.style.setProperty('--r', v)

  const head = profile.headline || []
  const roles = profile.roles || []

  // the two names, rendered twice on desktop (lime base + white copy under the cursor circle)
  const Names = ({ white = false }) => (
    <>
      <motion.span aria-hidden data-jiya={white ? undefined : ''} style={{ opacity: nameOpacity, y: jiyaY }}
        className={`${nameCls} left-[2.5%] top-[5%] text-[clamp(8rem,16vw,17rem)] ${white ? 'text-ink' : 'text-accent'}`}>
        {profile.first}
      </motion.span>
      <motion.span aria-hidden style={{ opacity: nameOpacity, y: gandhiY }}
        className={`${nameCls} bottom-[2%] right-[2.5%] text-[clamp(7rem,14.5vw,16rem)] ${white ? 'text-ink' : 'text-accent'}`}>
        {profile.last}
      </motion.span>
    </>
  )
  const Photo = ({ color = false }) => (
    <motion.img
      src={profile.cutout_url}
      alt={color ? '' : `Portrait of ${profile.name}`}
      aria-hidden={color || undefined}
      draggable={false}
      style={{ left: imgLeft, x: '-50%', scale: imgScale }}
      className={`absolute bottom-0 h-[82%] w-auto max-w-none origin-bottom ${cursorOn && !color ? 'grayscale' : ''}`}
    />
  )

  return (
    <section id="top" ref={runway} className="relative h-[230vh] lg:h-[260vh]">
      <h1 className="sr-only">{profile.name}, {roles.join(' and ')}</h1>

      <div className="sticky top-0 h-[100svh] px-3 pb-3 pt-[64px] sm:px-4">
        {/* ---------------- DESKTOP (lg+) ---------------- */}
        <motion.div
          {...intro(0.05, 20)}
          ref={cardRef}
          onMouseMove={onMove}
          onMouseEnter={() => setRadius('170px')}
          onMouseLeave={() => setRadius('0px')}
          className="reveal-host relative hidden h-full overflow-hidden rounded-[22px] border border-line bg-bg lg:block"
        >
          {/* photo: grey base + colour copy revealed under the cursor */}
          <div className="absolute inset-0"><Photo /></div>
          {cursorOn && <div aria-hidden className="reveal-mask pointer-events-none absolute inset-0"><Photo color /></div>}

          {/* name: lime base + white copy under the cursor */}
          <div className="pointer-events-none absolute inset-0 z-10"><Names /></div>
          {cursorOn && <div aria-hidden className="reveal-mask pointer-events-none absolute inset-0 z-10"><Names white /></div>}

          <motion.div aria-hidden style={{ opacity: hintOpacity }} className="mono absolute right-[3%] top-[5%] z-20 text-sm text-ink/60">
            scroll ↓
          </motion.div>

          {/* roles: top-right at first, then slides down into place above the headline */}
          <motion.p
            ref={rolesRef}
            style={{ left: rolesLeft, top: rolesTop, scale: rolesScale }}
            className="absolute z-20 w-max origin-top-left font-display text-[clamp(2.4rem,4.4vw,4.8rem)] font-900 uppercase leading-[1.02] tracking-[-0.035em]"
          >
            <span className="block text-accent">{roles[0]}</span>
            <span className="block text-ink">&amp; {roles[1]}</span>
          </motion.p>

          {/* headline + buttons: bottom-left at first, then slides right and grows. Nothing here fades out. */}
          <motion.div ref={lowerRef} style={{ left: colLeft, bottom: colBottom, scale: colScale }} className="absolute z-20 w-[44%] max-w-[640px] origin-bottom-left">
            <p className="bar font-display text-[clamp(1.15rem,1.7vw,1.6rem)] font-800 uppercase leading-[1.3] tracking-[-0.01em]">
              <span className="block text-accent">{head[0]}</span>
              <span className="block text-ink">{head[1]}</span>
              <span className="block text-accent">{head[2]}</span>
            </p>
            <motion.div style={{ height: statsH, opacity: statsO }} className="overflow-hidden">
              <div className="pt-8">
                <p className="font-display text-[clamp(1.6rem,2.4vw,2.4rem)] font-800 leading-none text-ink">
                  <span className="text-accent">15+</span> client projects delivered
                </p>
                <p className="mt-3 flex items-center gap-2 text-base text-ink/70"><MapPin size={16} className="text-accent" /> {profile.location}</p>
              </div>
            </motion.div>
            <div className="mt-8 flex gap-3">
              <a href="#work" className="btn-primary">See my work <ArrowDownRight size={16} /></a>
              {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost bg-bg/70"><Download size={15} /> Resume</a>}
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- MOBILE / TABLET (< lg) ---------------- */}
        <motion.div {...intro(0.05, 20)} className="relative h-full overflow-hidden rounded-[20px] border border-line bg-bg lg:hidden">
          <motion.img
            src={profile.cutout_url}
            alt={`Portrait of ${profile.name}`}
            draggable={false}
            style={{ left: mImgLeft, top: mImgTop, x: '-50%', scale: mImgScale }}
            className="absolute h-[54%] w-auto max-w-none origin-top"
          />
          <motion.span aria-hidden style={{ opacity: nameOpacity, y: jiyaY }}
            className={`${nameCls} left-4 top-4 z-10 text-[27vw] text-accent sm:text-[22vw]`}>
            {profile.first}
          </motion.span>

          {/* bottom column: GANDHI (fades), roles, headline, 15+ (opens up), buttons */}
          <div className="absolute inset-x-5 bottom-5 z-20 sm:inset-x-8">
            <motion.p aria-hidden style={{ opacity: nameOpacity }}
              className="mb-4 whitespace-nowrap text-right font-display text-[20vw] font-900 uppercase leading-[0.8] tracking-[-0.045em] text-accent sm:text-[17vw]">
              {profile.last}
            </motion.p>
            <p className="font-display text-[clamp(1.6rem,7.6vw,3rem)] font-900 uppercase leading-[1.02] tracking-[-0.035em]">
              <span className="block text-accent">{roles[0]}</span>
              <span className="block text-ink">&amp; {roles[1]}</span>
            </p>
            <p className="bar mt-3 font-display text-[clamp(0.9rem,4vw,1.4rem)] font-800 uppercase leading-[1.28]">
              <span className="block text-accent">{head[0]}</span>
              <span className="block text-ink">{head[1]}</span>
              <span className="block text-accent">{head[2]}</span>
            </p>
            <motion.div style={{ height: mStatsH, opacity: statsO }} className="overflow-hidden">
              <div className="pt-4">
                <p className="font-display text-[clamp(1.2rem,5.6vw,2rem)] font-800 leading-none text-ink"><span className="text-accent">15+</span> client projects delivered</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-ink/70"><MapPin size={15} className="text-accent" /> {profile.location}</p>
              </div>
            </motion.div>
            <div className="mt-4 flex gap-3">
              <a href="#work" className="btn-primary flex-1 justify-center whitespace-nowrap px-3 text-[13px]">See my work <ArrowDownRight size={16} /></a>
              {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost flex-1 justify-center whitespace-nowrap px-3 text-[13px]"><Download size={15} /> Resume</a>}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
