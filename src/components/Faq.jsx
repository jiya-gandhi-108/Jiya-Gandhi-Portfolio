import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../lib/data'
import { Reveal } from './Reveal'

// FAQ — expandable accordion.
export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-16 sm:px-10 sm:py-24">
      <Reveal variant="left"><p className="mb-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">good to know</p></Reveal>
      <Reveal variant="up" delay={0.05}>
        <h2 className="display text-4xl font-600 leading-[1.05] text-ink sm:text-5xl">
          Frequently <span className="italic star">asked</span>
        </h2>
      </Reveal>

      <div className="mt-10 divide-y divide-line border-y border-line">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className={`display text-lg font-600 transition-colors sm:text-xl ${isOpen ? 'text-accent' : 'text-ink group-hover:text-accent'}`}>
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${isOpen ? 'border-accent text-accent' : 'border-line text-muted group-hover:border-accent group-hover:text-accent'}`}
                >
                  <Plus size={16} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.21, 0.5, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-12 font-sans text-sm leading-relaxed text-muted sm:text-base">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
