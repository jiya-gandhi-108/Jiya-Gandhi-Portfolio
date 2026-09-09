import { Braces, Server, Database, Bot, Contact, Wrench } from 'lucide-react'
import { skillGroups } from '../lib/data'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

const ICONS = { Braces, Server, Database, Bot, Contact, Wrench }

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">tools of the trade</p></Reveal>
      <Reveal variant="up" delay={0.05}>
        <h2 className="display text-5xl font-700 leading-none text-ink sm:text-7xl">Skills &amp; <span className="italic star">stack</span></h2>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {skillGroups.map((g) => {
          const Icon = ICONS[g.icon] || Wrench
          return (
            <RevealItem key={g.label} variant="up">
              <div className="h-full rounded-lg border border-line bg-graphite p-5 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:border-accent/60 hover:shadow-xl hover:shadow-black/30">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-line text-accent"><Icon size={18} /></span>
                  <h3 className="display text-lg font-600 text-ink">{g.label}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="rounded-full border border-line px-3 py-1 font-sans text-xs text-ink/80">{it}</span>
                  ))}
                </div>
              </div>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </section>
  )
}
