import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, FileText, Mail } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import RichText from '../components/RichText'
import { ClipReveal, FadeUp } from '../components/Motion'
import { initials } from '../components/Projects'
import { profile, projects as all, getProjectById } from '../lib/data'
import { useBackHome } from '../lib/backHome'

const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(/[,|]/).map((s) => s.trim()).filter(Boolean))

export default function ProjectDetail() {
  const { id } = useParams()
  const project = getProjectById(id)
  const backHome = useBackHome('work')
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [id])

  const stack = toList(project?.stack)
  const handled = toList(project?.handled)
  const idx = all.findIndex((p) => String(p.id) === String(id))
  const next = idx >= 0 && all.length > 1 ? all[(idx + 1) % all.length] : null
  const updates = (Array.isArray(project?.updates) ? project.updates : [])
    .filter((u) => u && (u.note || u.date))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  // only facts that actually have a value make it into the strip
  const facts = project ? [
    ['Year', project.year],
    ['Category', project.tag],
    ['Status', project.status],
  ].filter(([, v]) => v) : []

  return (
    <>
      <Nav profile={profile} />
      <main className="wrap max-w-5xl pb-10 pt-28 sm:pt-32">
        <Link to="/" onClick={backHome} className="inline-flex items-center gap-2 font-display text-base font-800 uppercase tracking-[0.01em] text-ink transition-colors hover:text-accent sm:text-lg">
          <ArrowLeft size={20} strokeWidth={2.5} className="text-accent" /> Back to work
        </Link>

        {!project && (
          <div className="card mt-14 p-10 text-center">
            <p className="h-card text-4xl">404</p>
            <p className="mt-2 text-sm text-ink/65">This project doesn&apos;t exist. Plot twist.</p>
            <Link to="/#work" className="btn-primary mt-6">See all work</Link>
          </div>
        )}

        {project && (
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="mt-8 font-display text-[clamp(2.3rem,6.5vw,5.25rem)] font-900 uppercase leading-[0.92] tracking-[-0.04em] text-ink">{project.title}</h1>
            {project.subtitle && <p className="mt-5 max-w-2xl font-display text-xl font-600 text-ink/70 sm:text-2xl">{project.subtitle}</p>}
            {project.summary && <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-ink/80">{project.summary}</p>}

            <div className="mt-7 flex flex-wrap gap-3">
              {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={16} /> Source</a>}
              {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-primary"><ExternalLink size={16} /> Live demo</a>}
              {project.case_study_url && <a href={project.case_study_url} target="_blank" rel="noreferrer" className="btn-ghost"><FileText size={16} /> Case study</a>}
            </div>

            <ClipReveal className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-line bg-graphite">
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/3] place-items-center"><span className="font-display text-7xl font-900 text-line">{initials(project.title)}</span></div>
              )}
            </ClipReveal>

            {facts.length > 0 && (
              <dl className={`mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line ${facts.length > 2 ? 'sm:grid-cols-3' : 'grid-cols-2'}`}>
                {facts.map(([label, value]) => (
                  <div key={label} className="bg-bg p-4">
                    <dt className="date font-500 text-muted">{label}</dt>
                    <dd className="mt-1.5 font-display text-base font-700 uppercase text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              {project.problem && <Block title="The problem"><RichText text={project.problem} /></Block>}
              {project.built && <Block title="What I built"><RichText text={project.built} /></Block>}
            </div>

            {project.long_desc && (
              <Block title="How it works" className="mt-12">
                <RichText text={project.long_desc} className="max-w-3xl" />
              </Block>
            )}

            {(stack.length > 0 || handled.length > 0) && (
              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                {stack.length > 0 && (
                  <Block title="Stack">
                    <ul className="flex flex-wrap gap-2">
                      {stack.map((s) => <li key={s} className="rounded-full border border-line px-3 py-1.5 text-[13px] font-500 text-ink/80">{s}</li>)}
                    </ul>
                  </Block>
                )}
                {handled.length > 0 && (
                  <Block title="What I handled">
                    <RichText text={handled.map((h) => `- ${h}`).join('\n')} />
                  </Block>
                )}
              </div>
            )}

            {project.outcome && (
              <FadeUp className="mt-14 rounded-[22px] bg-accent p-7 text-black sm:p-10">
                <h2 className="font-display text-2xl font-900 uppercase tracking-[-0.03em] sm:text-3xl">The outcome</h2>
                <RichText text={project.outcome} className="mt-3 text-lg font-500 leading-snug text-black/85 [&_strong]:text-black" />
              </FadeUp>
            )}

            {updates.length > 0 && (
              <Block title="Build log" className="mt-14">
                <ul className="space-y-5 border-l border-line pl-6">
                  {updates.map((u, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                      {u.date && <p className="date text-accent">{u.date}</p>}
                      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink/85">{u.note}</p>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <div className="card mt-14 flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="h-card text-2xl">Want one of these?</p>
                <p className="mt-1 max-w-md text-sm text-ink/65">Tell me the workflow you want gone. I&apos;ll tell you how I&apos;d ship it.</p>
              </div>
              {profile.email && <a href={`mailto:${profile.email}`} className="btn-primary shrink-0"><Mail size={16} /> Get in touch</a>}
            </div>

            {next && (
              <Link to={`/project/${next.id}`} className="group mt-14 flex items-center justify-between gap-4 border-t border-line pt-8">
                <div className="min-w-0">
                  <p className="mono text-muted">Next build</p>
                  <p className="h-card mt-2 text-[clamp(1.4rem,3.5vw,2.4rem)] transition-colors group-hover:text-accent">{next.title}</p>
                </div>
                <ArrowUpRight size={40} className="shrink-0 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            )}
          </motion.article>
        )}
      </main>
      <Footer profile={profile} />
    </>
  )
}

function Block({ title, children, className = '' }) {
  return (
    <FadeUp className={className}>
      <h2 className="h-card text-2xl sm:text-3xl">{title}</h2>
      <div className="mt-4 text-base leading-relaxed text-ink/80">{children}</div>
    </FadeUp>
  )
}
