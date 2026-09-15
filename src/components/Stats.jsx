import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate, useReducedMotion } from 'framer-motion'
import { Rocket, Cpu, Boxes, CalendarClock } from 'lucide-react'
import { skillGroups } from '../lib/data'
import { Reveal } from './Reveal'

function Counter({ to, suffix = '' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const mv = useMotionValue(0)
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) { setVal(to); return }
    const controls = animate(mv, to, {
      duration: 1.2, ease: [0.21, 0.5, 0.2, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, reduce, mv])

  return <span ref={ref}>{val}{suffix}</span>
}

// "By the numbers" — figures computed from real portfolio data.
export default function Stats({ projects = [] }) {
  const projectCount = projects.length
  const techCount = new Set(skillGroups.flatMap((g) => g.items)).size
  const domainCount = new Set(
    projects.flatMap((p) => String(p.tag || '').split('·').map((t) => t.trim()).filter(Boolean))
  ).size
  const startYear = 2023
  const years = Math.max(1, new Date().getFullYear() - startYear)

  const items = [
    { icon: Rocket, value: projectCount, suffix: '+', label: 'Projects built' },
    { icon: Cpu, value: techCount, suffix: '+', label: 'Tools & technologies' },
    { icon: Boxes, value: domainCount, suffix: '', label: 'Domains worked in' },
    { icon: CalendarClock, value: years, suffix: '+', label: 'Years building' },
  ]

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-16">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((it, i) => {
          const Icon = it.icon
          return (
            <Reveal key={it.label} variant="up" delay={i * 0.06}>
              <div className="group h-full rounded-lg border border-line bg-graphite p-6 transition-colors hover:border-accent/60">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-line text-accent transition-transform group-hover:scale-110">
                  <Icon size={18} />
                </span>
                <p className="display mt-4 text-4xl font-700 leading-none text-ink sm:text-5xl">
                  <Counter to={it.value} suffix={it.suffix} />
                </p>
                <p className="mt-2 font-sans text-sm text-muted">{it.label}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
