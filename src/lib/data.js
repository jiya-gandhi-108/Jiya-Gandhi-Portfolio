// All portfolio content lives in this file (and src/data/projects.json).
// There is no database — edit the values here and redeploy to update the site.
import projectsData from '../data/projects.json'

export const profile = {
  name: 'Jiya Gandhi',
  first: 'Jiya',
  last: 'Gandhi',
  roles: ['AI Automation Engineer', 'Backend Developer'],
  journey: { from: 'Backend Developer', to: 'AI Automation Engineer' },
  headline: ['Building', 'Intelligent', 'Systems'],
  headline_sub: 'Same logic, bigger problems to solve.',
  tagline:
    'I build backend systems, API integrations, and AI-powered workflow automations that eliminate repetitive work.',
  location: 'Delhi, India',
  hero_points: [
    'Building AI-powered workflows',
    'Developing scalable backend systems',
    'Integrating APIs & creating automation',
    'Turning ideas into impact',
  ],
  email: 'jiya108gandhi@gmail.com',
  phone: '+91 9213729985',
  github_url: 'https://github.com/jiya-gandhi-108',
  linkedin_url: 'https://www.linkedin.com/in/jiya-gandhi-108',
  resume_url: '/Jiya_Gandhi_Resume.pdf',
  avatar_url: '/assets/jiya.png',
  available: true,
}

export const equation = {
  terms: ['Backend', 'Automation', 'Intelligence'],
  result: 'AI Automation Engineer',
  footnote: 'Backend developer at heart — automation engineer by obsession.',
}

// flat list for the horizontal moving strip (skills)
export const skillsMarquee = [
  'Node.js', 'Python', 'FastAPI', 'Express', 'Django', 'Flask',
  'PostgreSQL', 'MongoDB', 'Supabase', 'OpenAI', 'Claude', 'Gemini',
  'n8n', 'Zapier', 'Make', 'RAG', 'REST APIs', 'WebSockets',
  'Docker', 'Git', 'Vercel', 'Zoho', 'Stripe', 'HTML', 'CSS', 'Next.js', 'Redis', 'LangChain',
]

// grouped, for the Skills section grid — icon names resolved in Skills.jsx
export const skillGroups = [
  { label: 'Languages', icon: 'Braces', items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS', 'C', 'C++', 'C#'] },
  { label: 'Backend', icon: 'Server', items: ['Node.js', 'Express', 'FastAPI', 'Django', 'Flask', 'Next.js', 'Vite', 'REST APIs', 'WebSockets', 'JWT'] },
  { label: 'Databases', icon: 'Database', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase', 'Supabase'] },
  { label: 'AI & Automation', icon: 'Bot', items: ['OpenAI', 'Claude', 'Gemini', 'LangChain', 'n8n', 'Zapier', 'Make', 'RAG', 'AI Workflows', 'AI Agents'] },
  { label: 'CRM', icon: 'Contact', items: ['Zoho CRM', 'Zoho Recruit', 'Zoho Flow'] },
  { label: 'DevOps & Tools', icon: 'Wrench', items: ['Git', 'Docker', 'Vercel', 'Render', 'Railway', 'Postman'] },
]

export const experience = [
  {
    id: '6a2d2092-0d12-4350-87f4-c67b00be1889',
    role: 'AI Automation & Backend Developer',
    org: 'Freelance',
    period: '2023 — Present',
    desc: 'Building AI workflow automations, backend APIs, and CRM integrations for clients across recruitment, e-commerce, and internal-tools work.',
    details: '',
    learnt: [],
    handled: [],
  },
  {
    id: 'ac922d36-1d1c-41b1-99d7-c4a2f15f1fdb',
    role: 'Backend / Automation Intern',
    org: 'Right Advisors',
    period: '2024 · 6 months',
    desc: 'Built recruitment automations and internal tooling across the Zoho stack — assignment logic, status flows, and reporting.',
    details: '',
    learnt: [],
    handled: [],
  },
]

// Projects live in src/data/projects.json (images in public/projects/).
// Order: sort_order ascending. `featured: true` → "Things I've shipped";
// `cooking: true` → "Currently cooking"; every project shows in "My Coding World".
export const projects = [...projectsData].sort(
  (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || String(a.created_at).localeCompare(String(b.created_at)),
)

export const getProjectById = (id) => projects.find((p) => String(p.id) === String(id)) || null
export const getExperienceById = (id) => experience.find((e) => String(e.id) === String(id)) || null

// freelance offer (shown near the bottom, before contact)
export const offers = [
  { title: 'Backend feature', desc: 'Build or extend a backend / API.' },
  { title: 'API integration', desc: 'Connect your existing tools and services.' },
  { title: 'Workflow automation', desc: 'Remove repetitive manual processes.' },
  { title: 'Internal tool', desc: 'Build a small dashboard or operational system.' },
]

// how I work — 5-step process
export const howIWork = [
  { step: '01', title: 'Understand', desc: 'You explain the workflow / problem.' },
  { step: '02', title: 'Map', desc: 'I identify what should be automated and which tools / APIs are required.' },
  { step: '03', title: 'Build', desc: 'I implement the backend, integrations or automation.' },
  { step: '04', title: 'Test', desc: 'We test the workflow against real scenarios.' },
  { step: '05', title: 'Handover', desc: 'You receive the working system and documentation.' },
]

// --------------------------- extra sections --------------------------------

// "How I think about building" — principles (edit freely).
export const principles = [
  { title: 'Automate the boring parts', desc: 'If a task repeats, it shouldn’t need a human. I find the repetition and design it out.' },
  { title: 'Build to hand over', desc: 'You get a working system plus the docs to run it yourself — no black boxes, no lock-in.' },
  { title: 'Backend-first thinking', desc: 'Clean data models and reliable APIs come before anything shiny sits on top.' },
  { title: 'Ship, then sharpen', desc: 'Get a real, working version in front of you fast — then refine it against actual use.' },
]

// "Currently exploring" — what I'm going deep on right now (edit freely).
export const nowExploring = [
  'AI agents & multi-step workflows',
  'RAG over private data',
  'LLM tool-use / function calling',
  'Self-hostable automation (n8n)',
  'Vector databases',
  'Prompt & eval pipelines',
]

// FAQ — expandable answers (edit freely).
export const faqs = [
  { q: 'What kind of work do you take on?', a: 'Backend features and APIs, AI-powered automations, CRM and tool integrations, and small internal dashboards or operational systems.' },
  { q: 'Which tools and stacks do you use?', a: 'Mostly Node.js and Python on the backend, PostgreSQL/MongoDB/Supabase for data, and OpenAI/Claude/Gemini with n8n for AI workflows — but I pick what fits your problem, not the other way around.' },
  { q: 'How do we start?', a: 'You describe the workflow or problem. I map what should be automated and which tools/APIs are needed, then scope it before any building begins.' },
  { q: 'Do I get the source code?', a: 'Yes. You receive the working system and documentation so your team can run and extend it independently.' },
  { q: 'Can you work with my existing systems?', a: 'Usually, yes — most of my work is integrating with tools you already use (CRMs, databases, email, third-party APIs) rather than replacing them.' },
  { q: 'How do you scope and price a project?', a: 'It depends on scope, which I only estimate after understanding the workflow. Reach out with what you’re trying to do and I’ll come back with an approach.' },
]

// "If I joined your team…" — the actual sequence I'd run (edit freely).
export const joinTeam = {
  intro: 'Hand me a repetitive business process. Here’s exactly what I’d do with it.',
  steps: [
    { title: 'Map the process', desc: 'Document how the work actually flows today, end to end.' },
    { title: 'Find the bottlenecks', desc: 'Spot where time, errors, and hand-offs pile up.' },
    { title: 'Decide what to automate', desc: 'Separate what needs a human from what a system can own.' },
    { title: 'Build the workflow', desc: 'Implement the logic, the backend, and the automation.' },
    { title: 'Integrate the APIs', desc: 'Connect the tools you already use so data moves on its own.' },
    { title: 'Deploy it', desc: 'Ship it into your real environment, not a demo.' },
    { title: 'Measure the impact', desc: 'Check whether it actually improved anything — and tune it.' },
  ],
}

// "What I don't use AI for" — where I still reason manually (edit freely).
export const noAiFor = {
  statement: 'AI is a tool, not a substitute for engineering.',
  intro: 'I lean on AI to move faster — but these decisions I still reason through myself:',
  items: [
    { label: 'Architecture', desc: 'How the pieces fit and where responsibilities live.' },
    { label: 'Database design', desc: 'Schemas, relationships, and how data will grow.' },
    { label: 'Security', desc: 'Auth, access rules, and protecting sensitive data.' },
    { label: 'API contracts', desc: 'The shape and guarantees other systems depend on.' },
    { label: 'Debugging', desc: 'Understanding the real cause, not the first plausible one.' },
    { label: 'Deployment', desc: 'What runs where, and what happens when it fails.' },
    { label: 'Edge cases', desc: 'The unusual inputs that quietly break naïve solutions.' },
  ],
}
