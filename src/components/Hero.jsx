import { useMemo, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight, Download, MapPin } from 'lucide-react'

const EASE = [0.2, 0.7, 0.1, 1]

// The hero is a pinned, two-stage scroll:
//   stage 1  : photo in the centre, JIYA top-left, GANDHI bottom-right, two buttons
//   scrolling: the name fades out, the photo slides from the centre to the left
//   stage 2  : roles, headline, 15+ projects, location and the buttons fade in on the right
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

  const { scrollYProgress: p } = useScroll({ target: runway, offset: ['start start', 'end end'] })
  const t = (input, output) => useTransform(p, input, output) // eslint-disable-line react-hooks/rules-of-hooks

  // stage 1 out
  const nameOpacity = t([0, 0.28], [1, 0])
  const jiyaY = t([0, 0.32], [0, -90])
  const gandhiY = t([0, 0.32], [0, 90])
  const stage1Opacity = t([0, 0.16], [1, 0])
  const stage1Events = t([0, 0.1], ['auto', 'none'])
  // photo: centre -> left (desktop), centre -> top-left and smaller (mobile)
  const imgLeft = t([0.12, 0.58], ['50%', '25%'])
  const imgScale = t([0.12, 0.58], [1, 0.9])
  const mImgLeft = t([0.12, 0.55], ['50%', '27%'])
  const mImgTop = t([0.12, 0.55], ['17%', '2%'])
  const mImgScale = t([0.12, 0.55], [1, 0.58])
  // stage 2 in, one item after another
  const inA = { opacity: t([0.45, 0.6], [0, 1]), y: t([0.45, 0.6], [40, 0]) }
  const inB = { opacity: t([0.53, 0.68], [0, 1]), y: t([0.53, 0.68], [40, 0]) }
  const inC = { opacity: t([0.61, 0.76], [0, 1]), y: t([0.61, 0.76], [40, 0]) }
  const inD = { opacity: t([0.69, 0.84], [0, 1]), y: t([0.69, 0.84], [40, 0]) }
  const stage2Events = t([0.7, 0.8], ['none', 'auto'])

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
      <motion.span aria-hidden style={{ opacity: nameOpacity, y: jiyaY }}
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

          {/* stage 1 buttons + scroll hint */}
          <motion.div style={{ opacity: stage1Opacity, pointerEvents: stage1Events }} className="absolute bottom-[5%] left-[3%] z-20 flex gap-3">
            <a href="#work" className="btn-primary">See my work <ArrowDownRight size={16} /></a>
            {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost bg-bg/70"><Download size={15} /> Resume</a>}
          </motion.div>
          <motion.div aria-hidden style={{ opacity: stage1Opacity }} className="mono absolute left-1/2 top-[4%] z-20 -translate-x-1/2 text-muted">
            scroll ↓
          </motion.div>

          {/* stage 2 text, right side */}
          <motion.div style={{ pointerEvents: stage2Events }} className="absolute right-[4%] top-1/2 z-20 w-[44%] max-w-[640px] -translate-y-1/2">
            <motion.p style={inA} className="font-display text-[clamp(2.2rem,4.2vw,4.4rem)] font-900 uppercase leading-[0.9] tracking-[-0.035em]">
              <span className="block text-accent">{roles[0]}</span>
              <span className="block text-ink">&amp; {roles[1]}</span>
            </motion.p>
            <motion.p style={inB} className="bar mt-7 font-display text-[clamp(1.15rem,1.7vw,1.6rem)] font-800 uppercase leading-[1.05] tracking-[-0.015em]">
              <span className="block text-accent">{head[0]}</span>
              <span className="block text-ink">{head[1]}</span>
              <span className="block text-accent">{head[2]}</span>
            </motion.p>
            <motion.div style={inC} className="mt-8">
              <p className="font-display text-[clamp(1.6rem,2.4vw,2.4rem)] font-800 leading-none text-ink">
                <span className="text-accent">15+</span> client projects delivered
              </p>
              <p className="mt-3 flex items-center gap-2 text-base text-ink/70"><MapPin size={16} className="text-accent" /> {profile.location}</p>
            </motion.div>
            <motion.div style={inD} className="mt-8 flex gap-3">
              <a href="#work" className="btn-primary">See my work <ArrowDownRight size={16} /></a>
              {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost"><Download size={15} /> Resume</a>}
            </motion.div>
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
          <motion.span aria-hidden style={{ opacity: nameOpacity, y: gandhiY }}
            className={`${nameCls} bottom-[92px] right-3 z-10 text-[21vw] text-accent sm:bottom-[100px] sm:text-[18vw]`}>
            {profile.last}
          </motion.span>
          <motion.div style={{ opacity: stage1Opacity, pointerEvents: stage1Events }} className="absolute inset-x-4 bottom-5 z-20 flex gap-3">
            <a href="#work" className="btn-primary flex-1 justify-center whitespace-nowrap px-3 text-[13px]">See my work <ArrowDownRight size={16} /></a>
            {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost flex-1 justify-center whitespace-nowrap px-3 text-[13px]"><Download size={15} /> Resume</a>}
          </motion.div>

          {/* stage 2 */}
          <motion.div style={{ pointerEvents: stage2Events }} className="absolute inset-x-5 bottom-5 z-20 sm:inset-x-8">
            <motion.p style={inA} className="font-display text-[clamp(1.7rem,8.2vw,3rem)] font-900 uppercase leading-[0.92] tracking-[-0.035em]">
              <span className="block text-accent">{roles[0]}</span>
              <span className="block text-ink">&amp; {roles[1]}</span>
            </motion.p>
            <motion.p style={inB} className="bar mt-4 font-display text-[clamp(0.95rem,4.3vw,1.4rem)] font-800 uppercase leading-[1.05]">
              <span className="block text-accent">{head[0]}</span>
              <span className="block text-ink">{head[1]}</span>
              <span className="block text-accent">{head[2]}</span>
            </motion.p>
            <motion.div style={inC} className="mt-5">
              <p className="font-display text-[clamp(1.3rem,6vw,2rem)] font-800 leading-none text-ink"><span className="text-accent">15+</span> client projects delivered</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-ink/70"><MapPin size={15} className="text-accent" /> {profile.location}</p>
            </motion.div>
            <motion.div style={inD} className="mt-5 flex gap-3">
              <a href="#work" className="btn-primary flex-1 justify-center whitespace-nowrap px-3 text-[13px]">See my work <ArrowDownRight size={16} /></a>
              {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost flex-1 justify-center whitespace-nowrap px-3 text-[13px]"><Download size={15} /> Resume</a>}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
