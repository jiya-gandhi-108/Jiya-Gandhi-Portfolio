import { useEffect, useMemo, useState } from 'react'
import NameReveal from '../components/NameReveal'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import SkillsMarquee from '../components/SkillsMarquee'
import Projects from '../components/Projects'
import Equation from '../components/Equation'
import CodingWorld from '../components/CodingWorld'
import Process from '../components/Process'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Freelance from '../components/Freelance'
import Contact from '../components/Contact'
import { fetchProfile, fetchProjects, defaultProfile, defaultProjects } from '../lib/data'

const MAIN_COUNT = 5 // top projects in "Work"; the rest go to "My Coding World"

export default function Portfolio() {
  const [profile, setProfile] = useState(defaultProfile)
  const [projects, setProjects] = useState(defaultProjects)
  const [revealDone, setRevealDone] = useState(false)

  useEffect(() => {
    let alive = true
    Promise.all([fetchProfile(), fetchProjects()]).then(([p, pr]) => {
      if (!alive) return
      if (p) setProfile(p)
      if (pr && pr.length) setProjects(pr)
    })
    return () => { alive = false }
  }, [])

  const main = useMemo(() => projects.slice(0, MAIN_COUNT), [projects])
  const rest = useMemo(() => projects.slice(MAIN_COUNT), [projects])

  return (
    <div className="grain">
      <NameReveal first={profile.first} last={profile.last} onDone={() => setRevealDone(true)} />
      <Nav profile={profile} />
      <main>
        <Hero profile={profile} started={revealDone} />
        <SkillsMarquee />
        <Projects projects={main} />
        <Equation />
        <CodingWorld projects={rest} />
        <Process />
        <Experience />
        <Skills />
        <Freelance profile={profile} />
        <Contact profile={profile} />
      </main>
    </div>
  )
}
