import { useMemo, useState } from 'react'
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
import { Band } from '../components/Motion'
import { profile, projects, experience, pitch, band } from '../lib/data'

export default function Portfolio() {
  const [revealDone, setRevealDone] = useState(false)
  const featured = useMemo(() => projects.filter((p) => p.featured), [])
  // "Currently cooking" = the project flagged `cooking: true`, else the first featured one.
  const cooking = useMemo(() => projects.find((p) => p.cooking) || featured[0] || projects[0], [featured])

  return (
    <>
      <NameReveal first={profile.first} last={profile.last} onDone={() => setRevealDone(true)} />
      <Nav profile={profile} />
      <main>
        <Hero profile={profile} started={revealDone} />
        <About text={pitch} tldr={profile.tldr} />
        <Band items={band} />
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
