import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

function Leaf({ className = '', style }) {
  return (
    <svg viewBox="0 0 60 90" className={className} style={style} aria-hidden>
      <path d="M30 2 C6 22 6 60 30 88 C54 60 54 22 30 2 Z" fill="rgb(var(--royal))" opacity="0.95" />
      <path d="M30 8 L30 84 M30 30 L14 22 M30 30 L46 22 M30 50 L14 42 M30 50 L46 42" stroke="rgb(var(--paper))" strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  )
}

export default function Hero({ profile, started }) {
  const reduce = useReducedMotion()
  const show = (delay = 0, y = 20) => ({
    initial: { opacity: 0, y: reduce ? 0 : y },
    animate: started ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.21, 0.5, 0.2, 1] },
  })
  const head = profile.headline || ['Building', 'Intelligent', 'Systems']

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24 sm:pt-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 tech-grid opacity-[0.35]" />

      <div className="relative mx-auto grid min-h-[80vh] max-w-[1600px] items-center gap-10 px-6 pb-16 sm:px-10 lg:grid-cols-[1fr_minmax(320px,400px)_1fr] lg:gap-10 lg:px-14 lg:pb-0">
        {/* LEFT — the journey line, CTAs, socials */}
        <motion.div {...show(0.15)} className="order-3 lg:order-1">
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.25em] text-muted">the pivot <span className="star">✦</span></p>
          <p className="display text-3xl font-500 leading-[1.15] text-ink sm:text-4xl">
            From <span className="italic text-muted">{profile.journey?.from || 'Backend Developer'}</span>{' '}
            <span className="star">✦</span>
            <span className="block">to {profile.journey?.to || 'AI Automation Engineer'}</span>
          </p>
          <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-muted">{profile.tagline}</p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#work" className="group btn-primary">
              View projects <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="btn-ghost">Let&apos;s build something together</a>
          </div>

          {/* socials */}
          <div className="mt-6 flex items-center gap-3">
            {profile.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub"><Github size={17} /></a>}
            {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn"><Linkedin size={17} /></a>}
            {profile.email && <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Email"><Mail size={17} /></a>}
          </div>
        </motion.div>

        {/* CENTER — collage portrait (colour) */}
        <motion.div {...show(0.05, 28)} className="order-1 flex justify-center lg:order-2">
          <div className={`relative w-[80vw] max-w-[400px] ${reduce ? '' : 'animate-float'}`}>
            <div aria-hidden className="absolute -left-9 -top-7 h-28 w-28 rounded-full bg-accent/90" style={{ transform: 'rotate(8deg)' }} />
            <div aria-hidden className="absolute -bottom-7 -right-7 h-24 w-24 rounded-[42%] bg-royal/80" />
            <Leaf className="absolute -right-9 top-10 h-16 w-12 rotate-[24deg]" />
            <Leaf className="absolute -left-7 bottom-12 h-14 w-10 -rotate-[18deg]" />
            <div aria-hidden className="absolute -right-4 bottom-24 h-16 w-16 opacity-70"
                 style={{ backgroundImage: 'radial-gradient(rgb(var(--paper)) 1.5px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
            <div className="relative -rotate-2 rounded-sm bg-paper p-2.5 shadow-2xl shadow-black/50">
              <span aria-hidden className="absolute -top-3 left-6 h-6 w-16 rotate-[-6deg] bg-ink/15" />
              <span aria-hidden className="absolute -bottom-3 right-8 h-6 w-14 rotate-[8deg] bg-ink/15" />
              <div className="overflow-hidden rounded-sm">
                <img src={profile.avatar_url} alt={`Portrait of ${profile.name}`}
                     className="aspect-[4/5] w-full rotate-[1.5deg] scale-110 object-cover object-top contrast-[1.02]" loading="eager" />
              </div>
              <p className="display mt-2 px-1 text-center text-sm italic text-bg/70">{profile.name}</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — big serif headline (right-aligned on desktop) */}
        <motion.div {...show(0.25)} className="order-2 lg:order-3 lg:text-right">
          <h1 className="display text-[15vw] font-900 leading-[0.92] tracking-[-0.02em] text-ink sm:text-7xl lg:text-[5.4rem]">
            {head[0]}
            <br />
            <span className="inline-flex items-center gap-3 lg:justify-end"><span className="star text-[0.7em]">✦</span>{head[1]}</span>
            <br />
            {head[2]}
          </h1>
          <p className="mt-6 max-w-sm font-sans text-base leading-relaxed text-muted lg:ml-auto">{profile.headline_sub}</p>
        </motion.div>
      </div>
    </section>
  )
}
