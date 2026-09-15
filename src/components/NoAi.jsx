import { noAiFor } from '../lib/data'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

// "What I don't use AI for" — where I still reason manually.
export default function NoAi() {
  return (
    <section id="no-ai" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">the honest part</p></Reveal>
      <Reveal variant="up" delay={0.05}>
        <h2 className="display text-4xl font-600 leading-[1.05] text-ink sm:text-5xl">
          What I <span className="italic star">don&apos;t</span> use AI for
        </h2>
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <p className="display mt-5 max-w-2xl text-xl font-500 italic text-muted sm:text-2xl">
          &ldquo;{noAiFor.statement}&rdquo;
        </p>
      </Reveal>
      <Reveal variant="up" delay={0.15}>
        <p className="mt-4 max-w-xl font-sans text-sm text-muted">{noAiFor.intro}</p>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {noAiFor.items.map((it) => (
          <RevealItem key={it.label} variant="up">
            <div className="group h-full rounded-lg border border-line bg-graphite p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-md border border-line font-sans text-sm text-accent">&times;</span>
                <h3 className="display text-lg font-600 text-ink">{it.label}</h3>
              </div>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{it.desc}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
