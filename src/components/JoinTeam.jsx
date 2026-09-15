import { joinTeam } from '../lib/data'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

// "If I joined your team…" — the concrete sequence I'd run.
export default function JoinTeam() {
  return (
    <section id="join-team" className="relative overflow-hidden bg-royal py-20 text-paper sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 tech-grid opacity-[0.12]" />
      <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
        <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-paper/50">the value</p></Reveal>
        <Reveal variant="up" delay={0.05}>
          <h2 className="display text-4xl font-600 leading-[1.05] text-paper sm:text-5xl">
            If I joined your <span className="italic text-accent">team&hellip;</span>
          </h2>
        </Reveal>
        <Reveal variant="up" delay={0.1}>
          <p className="mt-4 max-w-xl font-sans text-base text-paper/70">{joinTeam.intro}</p>
        </Reveal>

        <RevealGroup className="mt-12 space-y-px" stagger={0.06}>
          {joinTeam.steps.map((s, i) => (
            <RevealItem key={s.title} variant="left">
              <div className="group flex items-center gap-5 rounded-lg px-4 py-4 transition-colors hover:bg-paper/5 sm:gap-8 sm:px-6">
                <span className="display w-12 shrink-0 text-3xl font-700 text-paper/25 transition-colors group-hover:text-accent sm:w-16 sm:text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span aria-hidden className="hidden h-8 w-px bg-paper/15 sm:block" />
                <div className="min-w-0">
                  <h3 className="display text-lg font-600 text-paper sm:text-xl">{s.title}</h3>
                  <p className="mt-0.5 font-sans text-sm text-paper/60">{s.desc}</p>
                </div>
                <span className="ml-auto hidden text-paper/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:block">&rarr;</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
