import { skillsMarquee } from '../lib/data'

// Horizontal moving strip of skills (orange band).
export default function SkillsMarquee() {
  const row = [...skillsMarquee, ...skillsMarquee]
  return (
    <section aria-label="Skills" className="overflow-hidden bg-accent py-5">
      <div className="flex w-max animate-marquee-rev items-center gap-8 pr-8">
        {row.map((s, i) => (
          <span key={i} className="display flex items-center gap-8 whitespace-nowrap text-xl font-600 text-white sm:text-2xl">
            {s} <span className="text-white/60">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
