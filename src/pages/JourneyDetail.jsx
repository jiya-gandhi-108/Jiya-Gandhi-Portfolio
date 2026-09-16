import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, ListChecks } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { fetchProfile, fetchExperienceById, defaultProfile } from '../lib/data'

const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(/[,|]/).map((s) => s.trim()).filter(Boolean))

export default function JourneyDetail() {
  const { id } = useParams()
  const [profile, setProfile] = useState(defaultProfile)
  const [entry, setEntry] = useState(undefined)

  useEffect(() => {
    window.scrollTo(0, 0)
    let alive = true
    fetchProfile().then((p) => alive && p && setProfile(p))
    fetchExperienceById(id).then((e) => alive && setEntry(e || null))
    return () => { alive = false }
  }, [id])

  const learnt = toList(entry?.learnt)
  const handled = toList(entry?.handled)

  return (
    <div className="grain">
      <Nav profile={profile} />
      <main className="mx-auto max-w-4xl px-5 pb-10 pt-28 sm:px-10 sm:pt-36">
        <Link to="/#experience" className="inline-flex items-center gap-2 font-sans text-sm text-muted transition-colors hover:text-accent">
          <ArrowLeft size={15} /> back to my journey
        </Link>

        {entry === undefined && <p className="mt-10 font-sans text-sm text-muted">loading&hellip;</p>}

        {entry === null && (
          <div className="mt-16 rounded-lg border border-dashed border-line p-10 text-center">
            <p className="display text-3xl font-600 text-ink">Not found</p>
            <p className="mt-2 font-sans text-sm text-muted">This journey entry doesn&apos;t exist.</p>
            <Link to="/#experience" className="btn-primary mt-6">See my journey</Link>
          </div>
        )}

        {entry && (
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="mt-8 font-sans text-xs uppercase tracking-[0.2em] text-accent">{entry.period}</p>
            <h1 className="display mt-3 text-4xl font-600 leading-[1.05] tracking-tight text-ink sm:text-5xl">{entry.role}</h1>
            {entry.org && <p className="display mt-2 text-xl font-500 italic text-muted sm:text-2xl">{entry.org}</p>}

            {entry.desc && <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/90">{entry.desc}</p>}

            {entry.details && (
              <div className="mt-10">
                <Label>What I did</Label>
                <p className="mt-3 max-w-2xl whitespace-pre-line text-base leading-relaxed text-ink/90">{entry.details}</p>
              </div>
            )}

            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {handled.length > 0 && (
                <div>
                  <Label><ListChecks size={13} className="inline" /> What I handled</Label>
                  <ul className="mt-3 space-y-1.5">
                    {handled.map((h) => <li key={h} className="font-sans text-sm text-muted"><span className="star">&#10022;</span> {h}</li>)}
                  </ul>
                </div>
              )}
              {learnt.length > 0 && (
                <div>
                  <Label><Sparkles size={13} className="inline" /> What I learnt</Label>
                  <ul className="mt-3 space-y-1.5">
                    {learnt.map((l) => <li key={l} className="font-sans text-sm text-muted"><span className="star">&#10022;</span> {l}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </motion.article>
        )}
      </main>
      <Footer profile={profile} />
    </div>
  )
}

function Label({ children }) {
  return <h2 className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.2em] text-accent">{children}</h2>
}
