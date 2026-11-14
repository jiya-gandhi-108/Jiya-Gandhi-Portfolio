import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { profile, getExperienceById } from '../lib/data'

export default function JourneyDetail() {
  const { id } = useParams()
  const entry = getExperienceById(id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <div className="grain">
      <Nav profile={profile} />
      <main className="mx-auto max-w-4xl px-5 pb-10 pt-28 sm:px-10 sm:pt-36">
        <Link to="/#experience" className="inline-flex items-center gap-2 font-sans text-sm text-muted transition-colors hover:text-accent">
          <ArrowLeft size={15} /> back to my journey
        </Link>

        {entry === null && (
          <div className="mt-16 rounded-lg border border-dashed border-line p-10 text-center">
            <p className="display text-3xl font-600 text-ink">Not found</p>
            <p className="mt-2 font-sans text-sm text-muted">This journey entry doesn&apos;t exist.</p>
            <Link to="/#experience" className="btn-primary mt-6">See my journey</Link>
          </div>
        )}

        {entry && (
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="display mt-8 text-4xl font-600 leading-[1.05] tracking-tight text-ink sm:text-5xl">{entry.role}</h1>
            {entry.org && <p className="display mt-2 text-xl font-500 italic text-muted sm:text-2xl">{entry.org}</p>}
            <p className="mt-3 font-sans text-sm text-ink/70">{entry.period}{entry.location ? ` · ${entry.location}` : ''}</p>

            {entry.desc && <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/90">{entry.desc}</p>}

            {entry.points?.length > 0 && (
              <div className="mt-10">
                <Heading>What I did</Heading>
                <ul className="mt-4 space-y-3">
                  {entry.points.map((pt) => (
                    <li key={pt} className="flex gap-3 font-sans text-base leading-relaxed text-ink/85">
                      <span aria-hidden className="star mt-[2px] shrink-0">&#10022;</span><span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {entry.stack?.length > 0 && (
              <div className="mt-10">
                <Heading>Tools &amp; stack</Heading>
                <p className="mt-3 font-sans text-base leading-relaxed text-muted">{entry.stack.join(' · ')}</p>
              </div>
            )}
          </motion.article>
        )}
      </main>
      <Footer profile={profile} />
    </div>
  )
}

function Heading({ children }) {
  return <h2 className="display text-2xl font-600 text-ink sm:text-3xl">{children}</h2>
}
