import { ScrollHighlight, FadeUp } from './Motion'

// The pitch: lights up word by word as you scroll, then the one-line TL;DR.
export default function About({ text, tldr }) {
  return (
    <section id="about" className="wrap py-24 sm:py-36">
      <ScrollHighlight
        text={text}
        className="max-w-6xl font-display text-[clamp(1.75rem,4.4vw,4rem)] font-700 leading-[1.08] tracking-[-0.025em] text-ink"
      />
      <FadeUp className="mt-10 max-w-xl">
        <p className="bar text-[15px] leading-relaxed text-ink/70 sm:text-base">{tldr}</p>
      </FadeUp>
    </section>
  )
}
