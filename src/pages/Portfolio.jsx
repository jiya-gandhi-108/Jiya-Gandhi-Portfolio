import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { HOME_SCROLL_KEY, INTRO_SEEN_KEY, storage } from '../lib/backHome'
import NameReveal from '../components/NameReveal'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Cooking from '../components/Cooking'
import CodingWorld from '../components/CodingWorld'
import Process from '../components/Process'
import Principles from '../components/Principles'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Freelance from '../components/Freelance'
import Contact from '../components/Contact'
import { profile, projects, experience, pitch } from '../lib/data'

export default function Portfolio() {
  const location = useLocation()
  const navType = useNavigationType()
  // read once, before any effect can overwrite them
  const saved = useRef(Number(storage.read(HOME_SCROLL_KEY) || 0))
  const introSeen = useRef(storage.read(INTRO_SEEN_KEY) === '1')
  // the name intro plays once per visit, not every time you come back to the home page
  const [revealDone, setRevealDone] = useState(introSeen.current)

  useLayoutEffect(() => {
    const jump = (y) => window.scrollTo({ top: y, behavior: 'instant' })
    const toId = (id) => {
      const el = document.getElementById(id)
      if (el) jump(el.getBoundingClientRect().top + window.scrollY - 72)
    }
    const st = location.state
    const run = () => {
      if (st?.restore) saved.current > 0 ? jump(saved.current) : toId(st.fallback || 'work') // "Back to work"
      else if (location.hash) toId(location.hash.slice(1)) // nav links like /#skills from other pages
      else if (navType === 'POP' && saved.current > 0) jump(saved.current) // browser back button / refresh
    }
    run()
    const raf = requestAnimationFrame(run) // once more after layout settles
    // keep the latest home position, so coming back lands in the same spot
    let tick = 0
    const onScroll = () => {
      if (tick) return
      tick = requestAnimationFrame(() => { tick = 0; storage.write(HOME_SCROLL_KEY, String(window.scrollY)) })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(tick); window.removeEventListener('scroll', onScroll) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const featured = useMemo(() => projects.filter((p) => p.featured), [])
  // "Currently cooking" = the project flagged `cooking: true`, else the first featured one.
  const cooking = useMemo(() => projects.find((p) => p.cooking) || featured[0] || projects[0], [featured])

  return (
    <>
      {!introSeen.current && (
        <NameReveal first={profile.first} last={profile.last} onDone={() => { storage.write(INTRO_SEEN_KEY, '1'); setRevealDone(true) }} />
      )}
      <Nav profile={profile} />
      <main>
        <Hero profile={profile} started={revealDone} />
        <About text={pitch} tldr={profile.tldr} />
        <Projects projects={featured} />
        <Cooking project={cooking} />
        <CodingWorld projects={projects} />
        <Process />
        <Principles />
        <Experience items={experience} />
        <Skills />
        <Freelance profile={profile} />
        <Contact profile={profile} />
      </main>
    </>
  )
}
