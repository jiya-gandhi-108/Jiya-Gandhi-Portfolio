import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal'

// "My Coding World" — the rest of the projects as auto-scrolling cards.
export default function CodingWorld({ projects = [] }) {
  if (!projects.length) return null
  const row = projects.length < 4 ? [...projects, ...projects, ...projects] : [...projects, ...projects]
  return (
    <section id="coding-world" className="overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">the rest of it <span className="star">✦</span></p></Reveal>
        <Reveal variant="up" delay={0.05}><h2 className="display text-4xl font-600 leading-[1.05] text-ink sm:text-5xl">My Coding World</h2></Reveal>
        <Reveal variant="up" delay={0.1}><p className="mt-4 max-w-lg font-sans text-sm text-muted">More builds, tools, and experiments — everything that didn&apos;t make the top of the list.</p></Reveal>
      </div>

      <div className="mt-12 flex w-max animate-marquee gap-5 pr-5 hover:[animation-play-state:paused]">
        {row.map((p, i) => (
          <Link key={i} to={`/project/${p.id}`}
            className="group w-[280px] shrink-0 rounded-lg border border-line bg-graphite p-5 transition-colors hover:border-accent/50">
            <div className="mb-4 grid h-32 place-items-center rounded-md tech-grid">
              <span className="display text-4xl font-700 text-line">{p.title.split(' ').map((w) => w[0]).join('').slice(0, 3)}</span>
            </div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="display text-xl font-600 leading-tight text-ink transition-colors group-hover:text-accent">{p.title}</h3>
              <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent" />
            </div>
            <p className="mt-1 font-sans text-xs uppercase tracking-wide text-muted">{p.tag}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
