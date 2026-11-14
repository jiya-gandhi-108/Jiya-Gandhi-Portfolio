import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Menu, X, Download } from 'lucide-react'
import { useState } from 'react'

// mobile menu: every section except the equation
const mobileLinks = [
  { href: '/#top', label: 'Home' },
  { href: '/#work', label: "Things I've shipped" },
  { href: '/#cooking', label: 'Currently cooking' },
  { href: '/#coding-world', label: 'My coding world' },
  { href: '/#process', label: 'How I work' },
  { href: '/#principles', label: 'How I think' },
  { href: '/#join-team', label: 'If I joined your team' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills & stack' },
  { href: '/#hire', label: 'Need something built?' },
  { href: '/#contact', label: 'Contact' },
]

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#work', label: 'Work' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav({ profile }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/85 shadow-lg shadow-black/20 backdrop-blur-md">
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="display text-xl font-700 leading-none text-ink sm:text-2xl" aria-label="Home">
            {profile?.name || 'Jiya Gandhi'}
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
            {profile?.resume_url && (
              <a href={profile.resume_url} download
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-sans text-xs font-600 uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5">
                <Download size={14} /> Résumé
              </a>
            )}
          </div>

          <button onClick={() => setOpen(true)} className="text-ink md:hidden" aria-label="Menu"><Menu size={24} /></button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-bg md:hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="display text-xl font-700 text-ink">{profile?.name || 'Jiya Gandhi'}</span>
            <button onClick={() => setOpen(false)} className="text-ink" aria-label="Close"><X size={24} /></button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-3">
            {mobileLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="block border-b border-line/60 py-3 font-sans text-base font-500 text-ink transition-colors active:text-accent">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="border-t border-line px-5 py-4">
            {profile?.resume_url && (
              <a href={profile.resume_url} download onClick={() => setOpen(false)} className="btn-primary w-full justify-center"><Download size={16} /> Download résumé</a>
            )}
            <div className="mt-4 flex gap-3">
              {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub"><Github size={16} /></a>}
              {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn"><Linkedin size={16} /></a>}
              {profile?.email && <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Email"><Mail size={16} /></a>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
