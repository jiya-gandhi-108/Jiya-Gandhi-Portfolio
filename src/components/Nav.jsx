import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Menu, X, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { WhatsAppIcon } from './Icons'
import { waLink } from './FloatingContact'

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Journey' },
  { href: '/#skills', label: 'Stack' },
  { href: '/#contact', label: 'Contact' },
]
const mobileLinks = [
  { href: '/#top', label: 'Home' },
  { href: '/#work', label: "Stuff I've shipped" },
  { href: '/#archive', label: 'Full archive' },
  { href: '/#process', label: 'How I work' },
  { href: '/#principles', label: 'How I think' },
  { href: '/#experience', label: 'Journey' },
  { href: '/#skills', label: 'Stack' },
  { href: '/#hire', label: 'Need something built?' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav({ profile }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-bg/85 backdrop-blur-md md:right-[var(--dock)]">
        <div className="flex items-center justify-between px-4 py-3.5 sm:px-6 md:pl-7 md:pr-4">
          <Link to="/" className="font-display text-[19px] font-900 uppercase leading-none tracking-[-0.03em] text-ink sm:text-[21px]" aria-label="Home">
            {profile?.name || 'Jiya Gandhi'}
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
            {links.map((l) => <a key={l.label} href={l.href} className="nav-link">{l.label}</a>)}
            {profile?.resume_url && (
              <a href={profile.resume_url} download className="inline-flex items-center gap-1.5 rounded-full border border-accent px-3.5 py-1.5 font-display text-[12px] font-700 uppercase text-accent transition-colors hover:bg-accent hover:text-black">
                <Download size={13} /> Resume
              </a>
            )}
          </nav>

          {/* mobile: contact buttons live here, so nothing floats over the content */}
          <div className="flex items-center gap-2 md:hidden">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} aria-label="Email me" className="grid h-9 w-9 place-items-center rounded-full bg-accent text-black"><Mail size={17} /></a>
            )}
            {profile?.whatsapp && (
              <a href={waLink(profile)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white"><WhatsAppIcon size={18} /></a>
            )}
            <button onClick={() => setOpen(true)} className="ml-1 grid h-9 w-9 place-items-center text-ink" aria-label="Open menu"><Menu size={24} /></button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-bg md:hidden">
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="font-display text-[19px] font-900 uppercase tracking-[-0.03em] text-ink">{profile?.name}</span>
            <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center text-ink" aria-label="Close menu"><X size={24} /></button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-2" aria-label="Mobile">
            {mobileLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="block border-b border-line py-3 font-display text-xl font-700 uppercase tracking-[-0.01em] text-ink active:text-accent">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="border-t border-line px-4 py-4">
            {profile?.resume_url && (
              <a href={profile.resume_url} download onClick={() => setOpen(false)} className="btn-primary w-full justify-center"><Download size={16} /> Download resume</a>
            )}
            <div className="mt-4 flex gap-3">
              {profile?.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub"><Github size={16} /></a>}
              {profile?.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn"><Linkedin size={16} /></a>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
