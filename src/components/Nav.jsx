import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Menu, X, Download } from 'lucide-react'
import { useState } from 'react'

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
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" className="display text-xl font-700 leading-none text-ink mix-blend-difference sm:text-2xl" aria-label="Home">
            {profile?.name || 'Jiya Gandhi'}
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="nav-link mix-blend-difference !text-white">{l.label}</a>
            ))}
            {profile?.resume_url && (
              <a href={profile.resume_url} download
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-sans text-xs font-600 uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5">
                <Download size={14} /> Résumé
              </a>
            )}
          </div>

          <button onClick={() => setOpen(true)} className="text-ink mix-blend-difference md:hidden" aria-label="Menu"><Menu size={24} /></button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-bg px-6 py-6 md:hidden">
          <div className="flex justify-end">
            <button onClick={() => setOpen(false)} className="text-ink" aria-label="Close"><X size={26} /></button>
          </div>
          <nav className="mt-10 flex flex-col gap-6">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="display text-5xl font-700 text-ink">{l.label}</a>
            ))}
          </nav>
          {profile?.resume_url && (
            <a href={profile.resume_url} download onClick={() => setOpen(false)} className="btn-primary mt-8 w-fit"><Download size={16} /> Download résumé</a>
          )}
          <div className="mt-auto flex gap-5">
            {profile?.github_url && <a href={profile.github_url} className="icon-btn"><Github size={16} /></a>}
            {profile?.linkedin_url && <a href={profile.linkedin_url} className="icon-btn"><Linkedin size={16} /></a>}
            {profile?.email && <a href={`mailto:${profile.email}`} className="icon-btn"><Mail size={16} /></a>}
          </div>
        </div>
      )}
    </>
  )
}
