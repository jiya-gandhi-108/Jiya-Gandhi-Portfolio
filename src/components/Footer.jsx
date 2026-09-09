import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

export default function Footer({ profile }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-10">
        <a href="/#contact" className="group display block text-4xl font-700 leading-none text-ink transition-colors hover:text-accent sm:text-6xl">
          Let&apos;s build <span className="italic star">something</span>
          <ArrowUpRight className="ml-2 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={36} />
        </a>
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-sans text-sm text-muted">© {new Date().getFullYear()} {profile.name}.</p>
          <div className="flex items-center gap-3">
            {profile.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" className="icon-btn"><Github size={16} /></a>}
            {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="icon-btn"><Linkedin size={16} /></a>}
            {profile.email && <a href={`mailto:${profile.email}`} className="icon-btn"><Mail size={16} /></a>}
            <Link to="/dashboard" className="ml-2 font-sans text-xs text-muted transition-colors hover:text-accent">/dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
