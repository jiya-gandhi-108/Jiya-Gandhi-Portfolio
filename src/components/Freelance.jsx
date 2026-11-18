import { ArrowRight, Boxes, Plug, Workflow, LayoutDashboard } from 'lucide-react'
import { offers } from '../lib/data'
import { MaskHeading, FadeUp } from './Motion'

const ICONS = [Boxes, Plug, Workflow, LayoutDashboard]

export default function Freelance({ profile }) {
  return (
    <section id="hire" className="wrap py-16 sm:py-24">
      <div className="rounded-[22px] bg-accent p-7 text-black sm:p-12">
        <MaskHeading text="Need something built?" className="font-display font-900 uppercase leading-[0.9] tracking-[-0.04em] text-black text-[clamp(2.4rem,6.5vw,5.75rem)]" />
        <p className="mt-4 max-w-lg text-base font-500 text-black/75">I&apos;m open for freelance and full-time. Here&apos;s what I can take off your plate:</p>

        <div className="mt-9 grid gap-3 sm:grid-cols-2">
          {offers.map((o, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <FadeUp key={o.title} delay={i * 0.05}>
                <div className="flex h-full items-start gap-4 rounded-2xl bg-black p-5 text-ink transition-transform duration-300 hover:-translate-y-1">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-black"><Icon size={18} /></span>
                  <div>
                    <h3 className="h-card text-lg">{o.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{o.desc}</p>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>

        <a href={`mailto:${profile?.email || ''}`} className="group mt-9 inline-flex flex-wrap items-center gap-2 font-display text-lg font-800 uppercase tracking-[-0.01em] text-black">
          <span className="underline decoration-black/30 decoration-2 underline-offset-[6px] group-hover:decoration-black">Tell me what you want automated</span>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
