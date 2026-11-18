import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

export default function Footer({ profile }) {
  return (
    <footer className="mt-10 border-t border-line">
      <div className="wrap py-14">
        <a href="/#contact" className="group inline-flex items-center gap-2 font-display text-[clamp(2.2rem,7vw,5rem)] font-900 uppercase leading-none tracking-[-0.04em] text-ink transition-colors hover:text-accent">
          Let&apos;s <span className="text-accent">build</span>
          <ArrowUpRight className="h-[0.8em] w-[0.8em] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="mono text-muted">© {new Date().getFullYear()} {profile.name}</p>
          <div className="flex items-center gap-3">
            {profile.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub"><Github size={16} /></a>}
            {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn"><Linkedin size={16} /></a>}
            {profile.email && <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Email"><Mail size={16} /></a>}
          </div>
        </div>
      </div>
    </footer>
  )
}
