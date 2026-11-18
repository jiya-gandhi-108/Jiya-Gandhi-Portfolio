import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { MaskHeading } from './Motion'
import { initials } from './Projects'

// Every project as an auto-scrolling strip. Hover to pause.
export default function CodingWorld({ projects = [] }) {
  if (!projects.length) return null
  const row = projects.length < 4 ? [...projects, ...projects, ...projects] : [...projects, ...projects]
  return (
    <section id="archive" className="overflow-hidden py-16 sm:py-24">
      <div className="wrap">
        <MaskHeading text="The full archive" accent={[2]} />
        <p className="mt-5 max-w-lg text-base text-ink/65">{projects.length} builds, tools and experiments. Hover to pause, tap to open.</p>
      </div>
      <div className="mt-10 flex w-max animate-marquee gap-4 pr-4 hover:[animation-play-state:paused]">
        {row.map((p, i) => (
          <Link key={i} to={`/project/${p.id}`} aria-hidden={i >= projects.length ? true : undefined} tabIndex={i >= projects.length ? -1 : undefined}
            className="card group w-[280px] shrink-0 p-4 transition-colors hover:border-accent/60 sm:w-[300px]">
            <div className="h-36 overflow-hidden rounded-xl bg-bg">
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <div className="grid h-full place-items-center"><span className="font-display text-5xl font-900 text-line">{initials(p.title)}</span></div>
              )}
            </div>
            <div className="mt-4 flex items-start justify-between gap-2">
              <h3 className="h-card text-lg transition-colors group-hover:text-accent">{p.title}</h3>
              <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-accent" />
            </div>
            {p.tag && <p className="date mt-2 text-[12px] font-500 text-ink/55 sm:text-[12px]">{p.tag}</p>}
          </Link>
        ))}
      </div>
    </section>
  )
}
