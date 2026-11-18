import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink, FileText } from 'lucide-react'
import { MaskHeading, ClipReveal, FadeUp } from './Motion'

const toList = (v) => (Array.isArray(v) ? v : String(v || '').split(/[,|]/).map((s) => s.trim()).filter(Boolean))
export const initials = (t) => t.split(' ').map((w) => w[0]).join('').slice(0, 3)

function ProjectRow({ project, index }) {
  const reduce = useReducedMotion()
  const flip = index % 2 === 1
  const stack = toList(project.stack)
  const meta = [project.tag, project.year].filter(Boolean).join(' · ')

  return (
    <article className="grid items-center gap-8 border-t border-line py-12 sm:py-16 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      <div className={flip ? 'lg:order-2' : ''}>
        <FadeUp>
          <span className="font-display text-6xl font-900 leading-none tracking-[-0.04em] text-accent sm:text-7xl">
            {String(index + 1).padStart(2, '0')}
          </span>
        </FadeUp>
        <FadeUp delay={0.05}>
          <Link to={`/project/${project.id}`} className="group mt-4 block">
            <h3 className="h-card text-[clamp(1.7rem,3.2vw,2.75rem)] transition-colors group-hover:text-accent">{project.title}</h3>
          </Link>
          {meta && <p className="mono mt-3 text-muted">{meta}</p>}
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">{project.subtitle || project.problem}</p>
          {stack.length > 0 && <p className="mono mt-4 max-w-md leading-relaxed text-ink/55">{stack.slice(0, 6).join(' / ')}</p>}
          <div className="mt-7 flex flex-wrap items-center gap-2 sm:gap-3">
            <Link to={`/project/${project.id}`} className="btn-primary">Peep the build <ArrowUpRight size={16} /></Link>
            {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Source on GitHub"><Github size={16} /></a>}
            {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Live demo"><ExternalLink size={16} /></a>}
            {project.case_study_url && <a href={project.case_study_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Case study"><FileText size={16} /></a>}
          </div>
        </FadeUp>
      </div>

      <Link to={`/project/${project.id}`} className={`group block ${flip ? 'lg:order-1' : ''}`} aria-label={`Open ${project.title}`}>
        <ClipReveal className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-graphite">
          {project.image_url ? (
            <motion.img
              src={project.image_url}
              alt={project.title}
              loading="lazy"
              initial={reduce ? false : { scale: 1.25 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.4, ease: [0.2, 0.7, 0.1, 1] }}
              className="h-full w-full object-cover transition-[filter] duration-500 group-hover:brightness-110"
            />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <span className="font-display text-7xl font-900 text-line">{initials(project.title)}</span>
            </div>
          )}
          <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-accent text-black opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        </ClipReveal>
      </Link>
    </article>
  )
}

export default function Projects({ projects = [] }) {
  if (!projects.length) return null
  return (
    <section id="work" className="wrap py-16 sm:py-24">
      <MaskHeading text="Stuff I've shipped" accent={[2]} />
      <FadeUp>
        <p className="mt-5 max-w-lg text-base text-ink/65">Production systems, AI agents and full-stack apps. Built end to end, no tutorials harmed.</p>
      </FadeUp>
      <div className="mt-10">
        {projects.map((p, i) => <ProjectRow key={p.id} project={p} index={i} />)}
      </div>
    </section>
  )
}
