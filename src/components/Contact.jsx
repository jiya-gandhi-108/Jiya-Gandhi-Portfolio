import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin, Download } from 'lucide-react'
import OpenToWorkBadge from './OpenToWorkBadge'
import { Reveal } from './Reveal'

// Full contact section, shown inline at the bottom of the page (id="contact").
export default function Contact({ profile }) {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 tech-grid opacity-25" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-10 sm:py-28">
        <Reveal variant="left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-sans text-xs uppercase tracking-[0.2em] text-ink/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.available ? 'available for work' : 'in touch'}
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.05}>
          <h2 className="display text-[9vw] font-700 leading-[0.95] tracking-tight text-ink sm:text-6xl">
            Let&apos;s build <span className="italic star">something</span>
          </h2>
        </Reveal>

        <Reveal variant="up" delay={0.12}>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-muted">
            Have a workflow you want gone, a backend to build, or an automation idea? Tell me what you&apos;re trying to do — I&apos;ll tell you how I&apos;d ship it.
          </p>
        </Reveal>

        {/* big email */}
        <Reveal variant="up" delay={0.15}>
          <a href={`mailto:${profile.email}`} className="group mt-10 block break-all">
            <span className="display text-[7vw] font-700 leading-none text-ink transition-colors group-hover:text-accent sm:text-5xl">
              {profile.email}
              <ArrowUpRight className="ml-2 inline-block transition-transform group-hover:translate-x-2 group-hover:-translate-y-1" size={36} />
            </span>
          </a>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-line pt-12 sm:grid-cols-2">
          <div className="space-y-4">
            {profile.phone && <Reveal variant="left"><p className="flex items-center gap-3 font-sans text-lg text-ink"><Phone size={18} className="text-accent" /> {profile.phone}</p></Reveal>}
            {profile.location && <Reveal variant="left" delay={0.05}><p className="flex items-center gap-3 font-sans text-lg text-ink"><MapPin size={18} className="text-accent" /> {profile.location}</p></Reveal>}
            <Reveal variant="left" delay={0.1}>
              <div className="flex flex-wrap gap-3 pt-3">
                {profile.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={16} /> GitHub</a>}
                {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="btn-ghost"><Linkedin size={16} /> LinkedIn</a>}
                {profile.resume_url && <a href={profile.resume_url} download className="btn-ghost"><Download size={16} /> Résumé</a>}
              </div>
            </Reveal>
          </div>
          <div className="flex items-start justify-center sm:justify-end">
            <OpenToWorkBadge size={150} href={`mailto:${profile.email}`} />
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="font-sans text-sm text-muted">© {new Date().getFullYear()} {profile.name}. Built from scratch.</p>
          <div className="flex items-center gap-3">
            <a href="#top" className="font-sans text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-accent">back to top ↑</a>
            <Link to="/dashboard" className="ml-2 font-sans text-xs text-muted transition-colors hover:text-accent">/dashboard</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
