import { principles } from '../lib/data'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

// "How I think about building" — the working principles.
export default function Principles() {
  return (
    <section id="principles" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">how I think</p></Reveal>
      <Reveal variant="up" delay={0.05}>
        <h2 className="display text-4xl font-600 leading-[1.05] text-ink sm:text-5xl">
          How I think about <span className="italic star">building</span>
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.08}>
        {principles.map((p, i) => (
          <RevealItem key={p.title} variant="up">
            <div className="group relative h-full overflow-hidden rounded-lg border border-line bg-graphite p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 sm:p-8">
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex items-start gap-4">
                <span className="display text-3xl font-700 text-line transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="display text-xl font-600 text-ink sm:text-2xl">{p.title}</h3>
                  <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-muted sm:text-base">{p.desc}</p>
                </div>
              </div>
              <span className="pointer-events-none absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-accent/0 blur-3xl transition-all duration-500 group-hover:bg-accent/20" />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
