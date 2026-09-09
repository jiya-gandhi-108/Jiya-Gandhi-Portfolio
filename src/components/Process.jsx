import { howIWork } from '../lib/data'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

// "How I work" — the 5-step delivery process.
export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">the process</p></Reveal>
      <Reveal variant="up" delay={0.05}>
        <h2 className="display text-5xl font-700 leading-none text-ink sm:text-7xl">How I <span className="italic star">work</span></h2>
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <p className="mt-4 max-w-xl font-sans text-sm text-muted">From first conversation to a working system you can run yourself.</p>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-5" stagger={0.09}>
        {howIWork.map((s) => (
          <RevealItem key={s.step} variant="up">
            <div className="flex h-full flex-col bg-bg p-6">
              <span className="display text-4xl font-900 text-accent sm:text-5xl">{s.step}</span>
              <h3 className="display mt-4 text-xl font-600 text-ink">{s.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
