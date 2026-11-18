import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Phone, MapPin, Download } from 'lucide-react'

export default function Contact({ profile }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  // the heading tightens up as you arrive
  const spacing = useTransform(scrollYProgress, [0, 1], reduce ? ['-0.04em', '-0.04em'] : ['0.18em', '-0.04em'])
  const [user, domain] = String(profile.email).split('@')

  return (
    <section id="contact" ref={ref} className="overflow-hidden border-t border-line">
      <div className="wrap py-20 sm:py-28">
        <motion.h2 style={{ letterSpacing: spacing }} className="whitespace-nowrap font-display text-[clamp(3.4rem,14vw,13rem)] font-900 uppercase leading-[0.82] text-ink">
          Let&apos;s <span className="text-accent">build</span>
        </motion.h2>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/70">
          Got a workflow you want gone, a backend to build or an automation idea? Slide into my inbox. I reply fast, and I&apos;ll tell you straight up how I&apos;d ship it.
        </p>

        <a href={`mailto:${profile.email}`} className="group mt-10 inline-block max-w-full">
          <span className="font-display text-[clamp(1.3rem,6.2vw,4.5rem)] font-800 leading-[1.05] tracking-[-0.03em] text-ink transition-colors group-hover:text-accent">
            <span className="whitespace-nowrap">{user}@</span><wbr /><span className="whitespace-nowrap">{domain}</span>
          </span>
          <ArrowUpRight className="ml-1 inline-block h-[0.9em] w-[0.9em] align-[-0.05em] text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-12 sm:w-12" />
        </a>

        <div className="mt-12 grid gap-6 border-t border-line pt-10 sm:grid-cols-2">
          <div className="space-y-3">
            {profile.phone && <p className="flex items-center gap-3 text-base text-ink"><Phone size={17} className="text-accent" /> <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="hover:text-accent">{profile.phone}</a></p>}
            {profile.location && <p className="flex items-center gap-3 text-base text-ink"><MapPin size={17} className="text-accent" /> {profile.location}</p>}
          </div>
          <div className="flex flex-wrap gap-3 sm:justify-end">
            {profile.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={16} /> GitHub</a>}
            {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="btn-ghost"><Linkedin size={16} /> LinkedIn</a>}
            {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost"><Download size={16} /> Résumé</a>}
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="mono text-muted">© {new Date().getFullYear()} {profile.name} · Built from scratch, no templates</p>
          <a href="#top" className="mono text-muted transition-colors hover:text-accent">Back to top ↑</a>
        </div>
      </div>
    </section>
  )
}
