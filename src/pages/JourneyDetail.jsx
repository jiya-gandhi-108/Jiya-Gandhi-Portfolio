import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { FadeUp } from '../components/Motion'
import { profile, experience, getExperienceById } from '../lib/data'
import { useBackHome } from '../lib/backHome'

// The full story behind each role. Linked from "Know more about me" on the home page.
export default function JourneyDetail() {
  const { id } = useParams()
  const entry = getExperienceById(id)
  const backHome = useBackHome('experience')
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [id])
  const others = experience.filter((e) => String(e.id) !== String(id))

  return (
    <>
      <Nav profile={profile} />
      <main className="wrap max-w-5xl pb-10 pt-28 sm:pt-32">
        <Link to="/" onClick={backHome} className="inline-flex items-center gap-2 font-display text-base font-800 uppercase tracking-[0.01em] text-ink transition-colors hover:text-accent sm:text-lg">
          <ArrowLeft size={20} strokeWidth={2.5} className="text-accent" /> Back to the journey
        </Link>

        {!entry && (
          <div className="card mt-14 p-10 text-center">
            <p className="h-card text-3xl">Not found</p>
            <Link to="/#experience" className="btn-primary mt-6">See my journey</Link>
          </div>
        )}

        {entry && (
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="mt-10 font-display text-[clamp(2.3rem,6.5vw,5rem)] font-900 uppercase leading-[0.92] tracking-[-0.04em] text-ink">{entry.role}</h1>
            <p className="mt-3 font-display text-2xl font-700 normal-case tracking-[-0.02em] text-accent sm:text-3xl">@ {entry.org}</p>
            <p className="date mt-4 text-ink/80">{entry.period}{entry.location ? ` · ${entry.location}` : ''}</p>

            {entry.desc && <p className="bar mt-10 max-w-2xl text-lg leading-relaxed text-ink/85">{entry.desc}</p>}

            {entry.points?.length > 0 && (
              <section className="mt-14">
                <h2 className="h-card text-2xl sm:text-3xl">What I actually did</h2>
                <ol className="mt-6 space-y-3">
                  {entry.points.map((pt, i) => (
                    <FadeUp key={pt} delay={i * 0.04} as="li">
                      <div className="card flex gap-4 p-5">
                        <span aria-hidden className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-accent" />
                        <span className="text-base leading-relaxed text-ink/85">{pt}</span>
                      </div>
                    </FadeUp>
                  ))}
                </ol>
              </section>
            )}

            {entry.stack?.length > 0 && (
              <section className="mt-14">
                <h2 className="h-card text-2xl sm:text-3xl">Tools I used there</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {entry.stack.map((s) => <li key={s} className="rounded-full border border-line px-3 py-1.5 text-[13px] font-500 text-ink/80">{s}</li>)}
                </ul>
              </section>
            )}

            {others.length > 0 && (
              <section className="mt-16 border-t border-line pt-8">
                <p className="mono text-muted">More of the journey</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {others.map((o) => (
                    <Link key={o.id} to={`/journey/${o.id}`} className="card group flex items-center justify-between gap-4 p-5 transition-colors hover:border-accent/60">
                      <div className="min-w-0">
                        <p className="date text-accent">{o.period}</p>
                        <p className="h-card mt-2 text-lg transition-colors group-hover:text-accent">{o.role}</p>
                        <p className="mt-0.5 text-base text-ink/60">@ {o.org}</p>
                      </div>
                      <ArrowUpRight size={22} className="shrink-0 text-muted group-hover:text-accent" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </motion.article>
        )}
      </main>
      <Footer profile={profile} />
    </>
  )
}
