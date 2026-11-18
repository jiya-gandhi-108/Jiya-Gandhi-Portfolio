import { principles } from '../lib/data'
import { MaskHeading, FadeUp } from './Motion'

export default function Principles() {
  return (
    <section id="principles" className="wrap py-16 sm:py-24">
      <MaskHeading text="How I think" accent={[2]} />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {principles.map((p, i) => (
          <FadeUp key={p.title} delay={(i % 2) * 0.08}>
            <div className="card group relative h-full overflow-hidden p-6 transition-colors duration-300 hover:border-accent/60 sm:p-8">
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              <span className="font-display text-5xl font-900 leading-none tracking-[-0.04em] text-line transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="h-card mt-5 text-2xl">{p.title}</h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/65">{p.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
