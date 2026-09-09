import { ArrowRight, Boxes, Plug, Workflow, LayoutDashboard } from 'lucide-react'
import { offers } from '../lib/data'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

const ICONS = [Boxes, Plug, Workflow, LayoutDashboard]

// Clear freelance offer, placed just before the contact section.
export default function Freelance({ profile }) {
  return (
    <section id="hire" className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-24">
      <div className="rounded-2xl border border-line bg-graphite p-8 sm:p-12">
        <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-accent">for hire</p></Reveal>
        <Reveal variant="up" delay={0.05}>
          <h2 className="display text-4xl font-700 leading-none text-ink sm:text-6xl">Need something built?</h2>
        </Reveal>
        <Reveal variant="up" delay={0.1}>
          <p className="mt-4 max-w-xl font-sans text-base text-muted">I can help with:</p>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.07}>
          {offers.map((o, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <RevealItem key={o.title} variant="up">
                <div className="flex h-full items-start gap-4 rounded-xl border border-line bg-bg p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line text-accent"><Icon size={20} /></span>
                  <div>
                    <h3 className="display text-xl font-600 text-ink">{o.title}</h3>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-muted">{o.desc}</p>
                  </div>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <Reveal variant="up" delay={0.15}>
          <a href={`mailto:${profile?.email || ''}`}
            className="group mt-10 inline-flex flex-wrap items-center gap-2 font-sans text-lg text-ink">
            <span className="font-500">Have a workflow in mind?</span>
            <span className="text-accent">→</span>
            <span className="underline decoration-accent/40 decoration-2 underline-offset-4 transition-colors group-hover:text-accent">
              Tell me what you&apos;re trying to automate
            </span>
            <ArrowRight size={18} className="text-accent transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
