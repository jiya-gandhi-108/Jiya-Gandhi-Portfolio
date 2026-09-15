import { useEffect, useMemo, useState } from 'react'
import NameReveal from '../components/NameReveal'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import SkillsMarquee from '../components/SkillsMarquee'
import Projects from '../components/Projects'
import Stats from '../components/Stats'
import Cooking from '../components/Cooking'
import Equation from '../components/Equation'
import CodingWorld from '../components/CodingWorld'
import Process from '../components/Process'
import Principles from '../components/Principles'
import JoinTeam from '../components/JoinTeam'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import NoAi from '../components/NoAi'
import Faq from '../components/Faq'
import Freelance from '../components/Freelance'
import Contact from '../components/Contact'
import { fetchProfile, fetchProjects, fetchExperience, defaultProfile, defaultProjects, defaultExperience } from '../lib/data'

export default function Portfolio() {
  const [profile, setProfile] = useState(defaultProfile)
  const [projects, setProjects] = useState(defaultProjects)
  const [experience, setExperience] = useState(defaultExperience)
  const [revealDone, setRevealDone] = useState(false)

  useEffect(() => {
    let alive = true
    Promise.all([fetchProfile(), fetchProjects(), fetchExperience()]).then(([p, pr, ex]) => {
      if (!alive) return
      if (p) setProfile(p)
      if (pr && pr.length) setProjects(pr)
      if (ex && ex.length) setExperience(ex)
    })
    return () => { alive = false }
  }, [])

  // "Things I've shipped" = only Featured projects. "My Coding World" = all.
  const main = useMemo(() => projects.filter((p) => p.featured), [projects])
  const rest = useMemo(() => projects, [projects])
  // "Currently cooking" = the one project flagged as cooking (fallback: none).
  const cooking = useMemo(() => projects.find((p) => p.cooking), [projects])

  return (
    <div className="grain">
      <NameReveal first={profile.first} last={profile.last} onDone={() => setRevealDone(true)} />
      <Nav profile={profile} />
      <main>
        <Hero profile={profile} started={revealDone} />
        <SkillsMarquee />
        <Stats projects={projects} />
        <Projects projects={main} />
        <Cooking project={cooking} />
        <Equation />
        <CodingWorld projects={rest} />
        <Process />
        <Principles />
        <JoinTeam />
        <Experience items={experience} />
        <Skills />
        <NoAi />
        <Faq />
        <Freelance profile={profile} />
        <Contact profile={profile} />
      </main>
    </div>
  )
}
