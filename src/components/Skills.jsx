import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Braces, Server, Database, Bot, Brain, Cloud, Contact, Wrench, ArrowUpRight, X } from 'lucide-react'
import { skillGroups, projectsForSkill } from '../lib/data'
import { MaskHeading, FadeUp } from './Motion'

const ICONS = { Braces, Server, Database, Bot, Brain, Cloud, Contact, Wrench }

// projects for a whole group = union of each skill's projects
function projectsForGroup(group) {
  const seen = new Map()
  group.items.forEach((it) => projectsForSkill(it).forEach((p) => seen.set(p.id, p)))
  return [...seen.values()]
}

export default function Skills() {
  // { group, skill }: skill null = every project in that group
  const [view, setView] = useState(null)

  return (
    <section id="skills" className="wrap py-16 sm:py-24">
      <MaskHeading text="The stack" accent={[1]} />
      <p className="mt-5 max-w-lg text-base text-ink/65">Tap any underlined skill to see the receipts: the projects where I actually used it.</p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, gi) => {
          const Icon = ICONS[g.icon] || Wrench
          const count = projectsForGroup(g).length
          return (
            <FadeUp key={g.label} delay={(gi % 3) * 0.06} className="h-full">
              <div className="card flex h-full flex-col p-6 transition-colors duration-300 hover:border-accent/60">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-black"><Icon size={18} /></span>
                  <h3 className="h-card text-lg">{g.label}</h3>
                </div>
                <p className="mt-5 text-[15px] leading-8 text-ink/80">
                  {g.items.map((it, i) => {
                    const has = projectsForSkill(it).length > 0
                    return (
                      <Fragment key={it.name}><span className="whitespace-nowrap">
                        {has ? (
                          <button type="button" onClick={() => setView({ group: g, skill: it.name })}
                            className="underline decoration-ink/30 decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
                            {it.name}
                          </button>
                        ) : <span>{it.name}</span>}
                        {i < g.items.length - 1 && <span aria-hidden className="pl-1.5 text-muted">/</span>}
                      </span>{i < g.items.length - 1 && ' '}</Fragment>
                    )
                  })}
                </p>
                {count > 0 && (
                  <div className="mt-auto pt-6">
                    <button type="button" onClick={() => setView({ group: g, skill: null })}
                      className="group inline-flex items-center gap-1.5 font-display text-sm font-700 uppercase text-accent">
                      View projects ({count})
                      <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                )}
              </div>
            </FadeUp>
          )
        })}
      </div>

      <AnimatePresence>
        {view && <SkillProjects view={view} setView={setView} onClose={() => setView(null)} />}
      </AnimatePresence>
    </section>
  )
}

function SkillProjects({ view, setView, onClose }) {
  const { group, skill } = view
  const list = useMemo(
    () => (skill ? projectsForSkill(group.items.find((i) => i.name === skill)) : projectsForGroup(group)),
    [group, skill],
  )
  const usable = group.items.filter((it) => projectsForSkill(it).length > 0)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  const filterBtn = (active) =>
    `font-mono text-xs uppercase tracking-[0.1em] transition-colors ${active ? 'font-600 text-accent underline decoration-2 underline-offset-4' : 'text-muted hover:text-ink'}`

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={`Projects using ${skill || group.label}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-t-2xl border border-line bg-bg sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
          <div>
            <h3 className="h-card text-2xl sm:text-3xl">
              Projects using <span className="text-accent">{skill || group.label}</span>
            </h3>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              <button type="button" className={filterBtn(!skill)} onClick={() => setView({ group, skill: null })}>All</button>
              {usable.map((it) => (
                <button key={it.name} type="button" className={filterBtn(skill === it.name)} onClick={() => setView({ group, skill: it.name })}>
                  {it.name}
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={onClose} className="icon-btn shrink-0" aria-label="Close"><X size={18} /></button>
        </div>

        <ul className="overflow-y-auto p-3 sm:p-4">
          {list.map((p) => (
            <li key={p.id}>
              <Link to={`/project/${p.id}`} className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-graphite">
                <div className="aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg border border-line bg-graphite">
                  {p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-cover" loading="lazy" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="h-card text-base transition-colors group-hover:text-accent">{p.title}</p>
                  <p className="mono mt-1.5 text-muted">{[p.tag, p.year].filter(Boolean).join(' · ')}</p>
                </div>
                <ArrowUpRight size={18} className="shrink-0 text-muted transition-colors group-hover:text-accent" />
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
