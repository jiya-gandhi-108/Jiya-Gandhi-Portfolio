import { Server, Braces, Bot, Cog, TerminalSquare, BrainCircuit } from 'lucide-react'
import { equation } from '../lib/data'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

const icons = [Braces, Server, Cog, Bot, TerminalSquare, BrainCircuit]

export default function Equation() {
  return (
    <section id="about" className="relative overflow-hidden bg-royal py-24 text-paper sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 tech-grid opacity-[0.12]" />
      <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
        <Reveal variant="up">
          <p className="mb-12 text-center font-sans text-xs uppercase tracking-[0.3em] text-paper/50">the equation</p>
        </Reveal>

        {/* restrained, uniform icon row — thin outline, no sticker look */}
        <RevealGroup className="mb-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4" stagger={0.06}>
          {icons.map((Icon, i) => (
            <RevealItem key={i} variant="scale">
              <div className="grid h-12 w-12 place-items-center rounded-lg border border-paper/25 text-paper/80 transition-colors hover:border-paper/60 hover:text-paper sm:h-14 sm:w-14">
                <Icon size={22} strokeWidth={1.5} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* refined equation typography */}
        <Reveal variant="up">
          <p className="display text-center text-3xl font-500 leading-tight text-paper sm:text-5xl">
            {equation.terms.map((t, i) => (
              <span key={t} className="whitespace-nowrap">
                {t}
                {i < equation.terms.length - 1 && <span className="mx-3 font-400 text-accent sm:mx-4">×</span>}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <div className="mt-6 flex items-baseline justify-center gap-3 sm:gap-4">
            <span className="display text-4xl font-400 text-paper/50 sm:text-6xl">=</span>
            <span className="display text-4xl font-700 leading-none tracking-tight text-accent sm:text-7xl">{equation.result}</span>
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.2}>
          <div className="mx-auto mt-12 h-px w-16 bg-paper/25" />
          <p className="mt-6 text-center font-sans text-sm text-paper/60">{equation.footnote}</p>
        </Reveal>
      </div>
    </section>
  )
}
