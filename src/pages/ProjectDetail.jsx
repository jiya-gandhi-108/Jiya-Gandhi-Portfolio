import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, FileText } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { fetchProfile, fetchProjects, defaultProfile } from '../lib/data'

const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(/[,|]/).map((s) => s.trim()).filter(Boolean))

export default function ProjectDetail() {
  const { id } = useParams()
  const [profile, setProfile] = useState(defaultProfile)
  const [all, setAll] = useState([])
  const [project, setProject] = useState(undefined)

  useEffect(() => {
    window.scrollTo(0, 0)
    let alive = true
    fetchProfile().then((p) => alive && p && setProfile(p))
    fetchProjects().then((list) => {
      if (!alive) return
      setAll(list)
      setProject(list.find((p) => String(p.id) === String(id)) || null)
    })
    return () => { alive = false }
  }, [id])

  const stack = toList(project?.stack)
  const handled = toList(project?.handled)
  const idx = all.findIndex((p) => String(p.id) === String(id))
  const next = idx >= 0 && all.length > 1 ? all[(idx + 1) % all.length] : null

  return (
    <div className="grain">
      <Nav profile={profile} />
      <main className="mx-auto max-w-6xl px-5 pb-10 pt-28 sm:px-10 sm:pt-36">
        <Link to="/#work" className="inline-flex items-center gap-2 font-sans text-sm text-muted transition-colors hover:text-accent">
          <ArrowLeft size={15} /> back to work
        </Link>

        {project === undefined && <p className="mt-10 font-sans text-sm text-muted">loading…</p>}

        {project === null && (
          <div className="mt-16 rounded-lg border border-dashed border-line p-10 text-center">
            <p className="display text-3xl font-700 text-ink">404</p>
            <p className="mt-2 font-sans text-sm text-muted">This project doesn&apos;t exist.</p>
            <Link to="/#work" className="btn-primary mt-6">See all work</Link>
          </div>
        )}

        {project && (
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mt-8 flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">{project.tag}</span><span>·</span><span>{project.year}</span>
            </div>
            <h1 className="display mt-3 text-5xl font-900 leading-[0.95] tracking-tight text-ink sm:text-8xl">{project.title}</h1>
            {project.subtitle && <p className="display mt-4 max-w-2xl text-2xl font-500 italic text-muted sm:text-3xl">{project.subtitle}</p>}

            <div className="mt-7 flex flex-wrap gap-3">
              {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={16} /> Source</a>}
              {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-ghost"><ExternalLink size={16} /> Live demo</a>}
              {project.case_study_url && <a href={project.case_study_url} target="_blank" rel="noreferrer" className="btn-ghost"><FileText size={16} /> Case study</a>}
            </div>

            <div className="mt-10 overflow-hidden rounded-lg border border-line bg-graphite">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="w-full object-cover" />
              ) : (
                <div className="grid aspect-[16/8] w-full place-items-center tech-grid">
                  <span className="display text-8xl font-900 text-line">{project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}</span>
                </div>
              )}
            </div>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {project.problem && <Block label="The problem">{project.problem}</Block>}
              {project.built && <Block label="What I built">{project.built}</Block>}
            </div>

            {project.long_desc && (
              <div className="mt-10">
                <Label>How it works</Label>
                <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink/90">{project.long_desc}</p>
              </div>
            )}

            {(stack.length > 0 || handled.length > 0) && (
              <div className="mt-10 grid gap-10 sm:grid-cols-2">
                {stack.length > 0 && (
                  <div>
                    <Label>Stack</Label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {stack.map((s) => <span key={s} className="rounded-full border border-line px-3 py-1 font-sans text-xs text-ink/80">{s}</span>)}
                    </div>
                  </div>
                )}
                {handled.length > 0 && (
                  <div>
                    <Label>What I handled</Label>
                    <ul className="mt-3 space-y-1.5">
                      {handled.map((h) => <li key={h} className="font-sans text-sm text-muted"><span className="star">✦</span> {h}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {project.outcome && (
              <div className="mt-12 rounded-lg bg-royal p-6 sm:p-8">
                <Label className="!text-paper/70">Outcome</Label>
                <p className="display mt-2 text-2xl font-500 leading-snug text-paper sm:text-3xl">{project.outcome}</p>
              </div>
            )}

            {next && (
              <Link to={`/project/${next.id}`} className="group mt-16 flex items-center justify-between border-t border-line pt-8">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted">next project</p>
                  <p className="display mt-1 text-3xl font-700 text-ink transition-colors group-hover:text-accent sm:text-5xl">{next.title}</p>
                </div>
                <ArrowUpRight size={40} className="text-muted transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:text-accent" />
              </Link>
            )}
          </motion.article>
        )}
      </main>
      <Footer profile={profile} />
    </div>
  )
}

function Label({ children, className = '' }) {
  return <h2 className={`font-sans text-xs uppercase tracking-[0.2em] text-accent ${className}`}>{children}</h2>
}
function Block({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      <p className="mt-3 text-lg leading-relaxed text-ink/90">{children}</p>
    </div>
  )
}
