import { experience } from '../lib/data'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">the road so far</p></Reveal>
      <Reveal variant="up" delay={0.05}><h2 className="display text-5xl font-700 leading-none text-ink sm:text-7xl">Experience</h2></Reveal>

      <RevealGroup className="mt-10 border-t border-line" stagger={0.1}>
        {experience.map((e) => (
          <RevealItem key={e.role + e.org} variant="left">
            <div className="grid gap-3 border-b border-line py-8 sm:grid-cols-[200px_1fr] sm:gap-8">
              <p className="font-sans text-sm uppercase tracking-[0.15em] text-muted">{e.period}</p>
              <div>
                <h3 className="display text-2xl font-600 text-ink sm:text-3xl">
                  {e.role} <span className="text-muted">— {e.org}</span>
                </h3>
                <p className="mt-2 max-w-2xl font-sans text-base leading-relaxed text-muted">{e.desc}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
