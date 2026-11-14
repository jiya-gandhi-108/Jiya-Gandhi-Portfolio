import { Server, Braces, Bot, Cog, TerminalSquare, BrainCircuit } from 'lucide-react'
import { equation } from '../lib/data'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

const icons = [Braces, Server, Cog, Bot, TerminalSquare, BrainCircuit]

export default function Equation() {
  return (
    <section id="about" className="relative overflow-hidden bg-royal py-20 text-paper sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 tech-grid opacity-[0.12]" />
      <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
        {/* restrained, uniform icon row — thin outline, no sticker look */}
        <RevealGroup className="mx-auto mb-12 grid max-w-[13rem] grid-cols-3 place-items-center gap-3 sm:mb-14 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-4" stagger={0.06}>
          {icons.map((Icon, i) => (
            <RevealItem key={i} variant="scale">
              <div className="grid h-12 w-12 place-items-center rounded-lg border border-paper/25 text-paper/80 transition-colors hover:border-paper/60 hover:text-paper sm:h-14 sm:w-14">
                <Icon size={22} strokeWidth={1.5} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* refined equation typography — stacks vertically on phones, one line on larger screens */}
        <Reveal variant="up">
          <p className="display flex flex-col items-center gap-1 text-center text-[2rem] font-500 leading-tight text-paper sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-2 sm:text-4xl md:text-5xl">
            {equation.terms.map((t, i) => (
              <span key={t} className="flex flex-col items-center gap-1 sm:flex-row sm:gap-4">
                <span className="max-w-full break-words">{t}</span>
                {i < equation.terms.length - 1 && <span aria-hidden className="font-400 text-accent">×</span>}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <div className="mt-4 flex flex-col items-center gap-1 text-center sm:mt-6 sm:flex-row sm:items-baseline sm:justify-center sm:gap-4">
            <span aria-hidden className="display text-4xl font-400 leading-none text-paper/50 sm:text-6xl">=</span>
            <span className="display text-[2.5rem] font-700 leading-[1.05] tracking-tight text-accent sm:text-6xl md:text-7xl">{equation.result}</span>
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.2}>
          <div className="mx-auto mt-12 h-px w-16 bg-paper/25" />
          <p className="mx-auto mt-6 max-w-xs text-center font-sans text-sm text-paper/60 sm:max-w-none">{equation.footnote}</p>
        </Reveal>
      </div>
    </section>
  )
}
