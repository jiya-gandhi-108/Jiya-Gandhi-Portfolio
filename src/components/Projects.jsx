import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink, FileText } from 'lucide-react'
import { Reveal } from './Reveal'

function ProjectRow({ project, index }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['8%', '-8%'])
  const flip = index % 2 === 1
  const stack = Array.isArray(project.stack)
    ? project.stack
    : String(project.stack || '').split(/[,|]/).map((s) => s.trim()).filter(Boolean)

  return (
    <div ref={ref} className="grid items-center gap-8 border-t border-line py-14 sm:py-20 lg:grid-cols-2 lg:gap-14">
      <div className={flip ? 'lg:order-2' : ''}>
        <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span>{project.tag}</span>
          <span className="ml-auto lg:ml-0">{project.year}</span>
        </div>

        <Reveal variant="up">
          <Link to={`/project/${project.id}`} className="group mt-3 block">
            <h3 className="display text-4xl font-700 leading-[0.98] text-ink transition-colors group-hover:text-accent sm:text-6xl">
              {project.title}
            </h3>
          </Link>
        </Reveal>

        <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-muted">{project.subtitle || project.problem}</p>

        {stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {stack.slice(0, 5).map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 font-sans text-xs text-ink/80">{s}</span>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <Link to={`/project/${project.id}`} className="btn-primary">View project <ArrowUpRight size={16} /></Link>
          {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub"><Github size={16} /></a>}
          {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Live demo"><ExternalLink size={16} /></a>}
          {project.case_study_url && <a href={project.case_study_url} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Case study"><FileText size={16} /></a>}
        </div>
      </div>

      <Link to={`/project/${project.id}`} className={`group relative block ${flip ? 'lg:order-1' : ''}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-graphite">
          <motion.div style={{ y }} className="absolute inset-0 scale-110">
            {project.image_url ? (
              <img src={project.image_url} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="grid h-full w-full place-items-center tech-grid">
                <span className="display text-7xl font-900 text-line sm:text-8xl">
                  {project.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}
                </span>
              </div>
            )}
          </motion.div>
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-accent text-white opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>
    </div>
  )
}

export default function Projects({ projects }) {
  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">selected work</p></Reveal>
      <Reveal variant="up" delay={0.05}>
        <h2 className="display text-5xl font-700 leading-none text-ink sm:text-7xl">
          Things I&apos;ve <span className="italic star">shipped</span>
        </h2>
      </Reveal>
      <div className="mt-8">
        {projects.map((p, i) => (
          <Reveal key={p.id} variant="up">
            <ProjectRow project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
