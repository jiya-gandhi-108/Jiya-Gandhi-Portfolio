// All portfolio content lives in this file (and src/data/projects.json).
// There is no database: edit the values here and redeploy to update the site.
import projectsData from '../data/projects.json'

export const profile = {
  name: 'Jiya Gandhi',
  first: 'Jiya',
  last: 'Gandhi',
  role: 'AI Automation Engineer',
  location: 'Delhi, India',
  // Big hero letters (top-left, middle, bottom-right), same rhythm as the reference.
  heroLetters: ['JIYA', 'GAN', 'DHI'],
  // Hero headline: three lines, alternating lime / white / lime.
  headline: ['I automate the boring', 'stuff so your team', 'can touch grass'],
  tldr: 'Backend dev turned AI automation engineer. I build the APIs, agents and workflows that quietly do the work nobody wants to do. No fluff, just systems that ship.',
  heroList: ['AI agents & chatbots', 'Backend & APIs', 'Workflow automation', 'CRM integrations', 'Stuff that just works'],

  // Cursor effect in the hero (desktop only). Pick one:
  //   'reveal'    : photo is black & white, a circle around the cursor shows it in colour
  //   'magnet'    : the big lime letters lean away from the cursor
  //   'crosshair' : thin lime crosshair + live X/Y readout, editorial-grid vibe
  //   'trail'     : little lime pixels trail behind the cursor
  //   'none'      : no effect
  // Tip: preview any of them without editing code by opening  /?cursor=trail  (or magnet, crosshair...)
  heroCursor: 'reveal',

  email: 'jiya108gandhi@gmail.com',
  phone: '+91 9213729985',
  // WhatsApp number in international format, digits only
  whatsapp: '919213729985',
  github_url: 'https://github.com/jiya-gandhi-108',
  linkedin_url: 'https://www.linkedin.com/in/jiya-gandhi-108',
  resume_url: '/Jiya_Gandhi_Resume.pdf',
  avatar_url: '/assets/jiya.png',
  available: true,
}

// Receipts. Every number here comes straight from the résumé / project list.
//   3+ yrs   : building since Jan 2023
//   15+      : client projects delivered as a freelancer (résumé)
//   builds   : counted from projects.json at build time
//   3        : roles (freelance, agency, in-house)
export const startYear = 2023

// The pitch, shown as the scroll-highlight paragraph under the hero.
export const pitch =
  'Hand me a messy, repetitive process. I map it, build the backend, wire up the APIs and ship an automation your team actually uses. Three-plus years, fifteen-plus client builds, and a voice agent that screens candidates on its own. That’s the pitch, no cap.'

// Scrolling band of short, loud facts.
export const band = [
  '15+ client projects shipped',
  'AI agents that actually work',
  'Zero black boxes',
  'Backend first, always',
  'Docs included, no ghosting',
  'Ships on time, fr',
]

// Skills grouped for the Stack section. Icon names are resolved in Skills.jsx.
// Skills & stack (from the résumé).
// `match` = words looked for in each project's stack / tag / title to power "View projects".
// Leave `match` out to just use the skill name.
export const skillGroups = [
  {
    label: 'Languages', icon: 'Braces',
    items: [
      { name: 'JavaScript', match: ['javascript', 'vanilla js', 'react', 'node', 'express', 'next.js', 'ajax', 'socket.io'] },
      { name: 'TypeScript' },
      { name: 'Python', match: ['python', 'fastapi'] },
      { name: 'SQL', match: ['sql', 'postgres', 'mysql', 'prisma'] },
    ],
  },
  {
    label: 'Backend', icon: 'Server',
    items: [
      { name: 'Node.js', match: ['node'] },
      { name: 'Express' },
      { name: 'FastAPI' },
      { name: 'Django' },
      { name: 'Flask' },
      { name: 'REST APIs', match: ['rest api', 'express', 'fastapi', 'nestjs', 'webhooks'] },
      { name: 'GraphQL' },
      { name: 'WebSockets', match: ['websocket', 'socket.io', 'realtime', 'real-time'] },
      { name: 'JWT', match: ['jwt'] },
    ],
  },
  {
    label: 'Databases', icon: 'Database',
    items: [
      { name: 'PostgreSQL', match: ['postgres'] },
      { name: 'MongoDB', match: ['mongo'] },
      { name: 'MySQL' },
      { name: 'Firebase' },
      { name: 'Supabase' },
    ],
  },
  {
    label: 'AI, ML & Deep Learning', icon: 'Brain',
    items: [
      { name: 'Machine Learning', match: ['machine learning', 'mediapipe', 'opencv', 'computer vision'] },
      { name: 'Deep Learning', match: ['deep learning', 'mediapipe'] },
      { name: 'Agentic AI', match: ['agent', 'multi-agent'] },
      { name: 'AI Agents', match: ['agent', 'multi-agent'] },
      { name: 'LangChain' },
      { name: 'LangGraph' },
      { name: 'RAG', match: ['rag', 'pgvector'] },
      { name: 'Fine-Tuning', match: ['fine-tuning', 'fine tuning'] },
      { name: 'Prompt Engineering', match: ['openai', 'claude', 'groq', 'gemini', 'llm'] },
      { name: 'Vector Databases', match: ['pgvector', 'vector', 'opensearch'] },
      { name: 'MCP', match: ['mcp', 'model context protocol'] },
    ],
  },
  {
    label: 'AI & Automation', icon: 'Bot',
    items: [
      { name: 'OpenAI API', match: ['openai'] },
      { name: 'Claude API', match: ['claude'] },
      { name: 'Gemini API', match: ['gemini'] },
      { name: 'n8n' },
      { name: 'Zapier' },
      { name: 'Make', match: ['make.com'] },
      { name: 'Workflow Automation', match: ['automation', 'webhooks', 'temporal'] },
      { name: 'Chatbot Development', match: ['chatbot', 'conversational'] },
      { name: 'WhatsApp Chatbot', match: ['whatsapp'] },
      { name: 'CRM Integration', match: ['crm', 'zoho'] },
      { name: 'Zoho CRM' },
      { name: 'Zoho Recruit' },
      { name: 'Zoho Flow' },
      { name: 'Zoho SalesIQ', match: ['salesiq'] },
    ],
  },
  {
    label: 'Cloud & DevOps', icon: 'Cloud',
    items: [
      { name: 'AWS' },
      { name: 'CI/CD Pipelines', match: ['ci/cd'] },
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'Vercel' },
      { name: 'Render' },
      { name: 'Railway' },
      { name: 'Stripe' },
      { name: 'Razorpay' },
    ],
  },
]

// Projects that use a skill: checks the project's stack, tag and title.
const escapeRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
export function projectsForSkill(skill) {
  const words = (skill.match || [skill.name]).map((w) => w.toLowerCase())
  const tests = words.map((w) => new RegExp(`(^|[^a-z0-9])${escapeRe(w)}`, 'i'))
  return projects.filter((p) => {
    const hay = [...(Array.isArray(p.stack) ? p.stack : []), p.tag, p.title].join(' | ')
    return tests.some((re) => re.test(hay))
  })
}

// My Journey, newest first.
// `summary` = the one-liner on the home page. Everything else shows on /journey/:id.
export const experience = [
  {
    id: 'ac922d36-1d1c-41b1-99d7-c4a2f15f1fdb',
    role: 'Software Developer Intern',
    org: 'Right Advisors',
    location: 'Delhi, India',
    period: 'Apr 2026 to Sep 2026',
    summary: 'Built an AI voice agent, a SalesIQ chatbot, an HRMS and Zoho automations for recruiting.',
    desc: 'Built AI agents, chatbots, internal tools and Zoho automations for the recruitment and business teams.',
    points: [
      'Built an AI voice-calling agent that automates recruiter outreach: it captures caller intent, qualifies leads and syncs structured records into Zoho.',
      'Built an AI chatbot on Zoho SalesIQ that qualifies website visitors and routes structured leads into Zoho CRM.',
      'Designed and shipped responsive business websites and internal tools used across the organization.',
      'Automated multi-step workflows across the Zoho ecosystem (CRM, Recruit, Flow), cutting repetitive manual work for the recruitment and business teams.',
      'Developed a role-based task-management app (assignment, deadline reminders, EOD reporting) and an in-house HRMS covering attendance, payroll and analytics.',
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'Supabase', 'Zoho CRM', 'Zoho Recruit', 'Zoho Flow', 'Zoho SalesIQ', 'LLM APIs'],
  },
  {
    id: 'growing-digitally',
    role: 'AI Solutions Specialist',
    org: 'Growing Digitally',
    location: 'Remote',
    period: 'Mar 2025 to Apr 2026',
    summary: 'Shipped client sites with admin dashboards, plus RAG chatbots for web and WhatsApp.',
    desc: 'Built and launched client websites with admin dashboards, plus AI agents and RAG chatbots for web and WhatsApp.',
    points: [
      'Built and deployed client websites (service, e-commerce, blog and business sites) from design through launch.',
      'Built multi-page websites with admin dashboards: role-based access control, live content editing and lead management.',
      'Implemented secure admin authentication, documented database schemas, and debugged login and dashboard issues in PHP/JS.',
      'Rolled out sitewide updates (contact details, WhatsApp links) across 30+ pages of live client sites.',
      'Developed AI agents and automated workflows for content, lead handling and repetitive business operations.',
      'Coded a website chatbot with RAG and an LLM using n8n workflows, then extended it to WhatsApp.',
      'Prototyped and shipped AI features hands-on with ChatGPT, Gemini, Perplexity, Claude Code and connectors.',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript', 'n8n', 'RAG', 'LLM APIs', 'WhatsApp', 'ChatGPT', 'Gemini', 'Claude Code'],
  },
  {
    id: '6a2d2092-0d12-4350-87f4-c67b00be1889',
    role: 'Freelance Software Developer',
    org: 'Self-Employed',
    location: 'Remote',
    period: 'Jan 2023 to Apr 2025',
    summary: '15+ client projects end to end: APIs, auth, dashboards and payments.',
    desc: 'Delivered 15+ client projects end to end across healthcare, education, recruitment, SaaS, e-commerce and services.',
    points: [
      'Delivered 15+ client projects across healthcare, education, recruitment, SaaS, e-commerce and service businesses.',
      'Built secure REST APIs, authentication systems, admin dashboards, payment integrations and database-backed apps with Node.js, FastAPI, PostgreSQL and MongoDB.',
      'Integrated Stripe, Razorpay and WhatsApp/email workflows while running projects from discovery to deployment.',
    ],
    stack: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Stripe', 'Razorpay', 'REST APIs'],
  },
]

// Projects live in src/data/projects.json (images in public/projects/).
// Order: sort_order ascending. `featured: true` → "Stuff I've shipped";
// `cooking: true` → "Currently cooking"; every project shows in the archive strip.
export const projects = [...projectsData].sort(
  (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || String(a.created_at).localeCompare(String(b.created_at)),
)

export const getProjectById = (id) => projects.find((p) => String(p.id) === String(id)) || null
export const getExperienceById = (id) => experience.find((e) => String(e.id) === String(id)) || null

// Hero receipts (see the note near the top for where each number comes from).
export const stats = [
  { value: `${Math.max(3, new Date().getFullYear() - startYear)}+`, label: 'Years shipping' },
  { value: '15+', label: 'Client projects' },
  { value: String(projectsData.length), label: 'Builds on GitHub' },
  { value: '3', label: 'Roles, one lane' },
]

// What I can build for you
export const offers = [
  { title: 'Backend feature', desc: 'Build or extend a backend or API.' },
  { title: 'API integration', desc: 'Get your tools talking to each other.' },
  { title: 'Workflow automation', desc: 'Delete the repetitive manual stuff.' },
  { title: 'Internal tool', desc: 'A dashboard or ops system your team will actually open.' },
]

// How I work: 5 steps
export const howIWork = [
  { step: '01', title: 'Understand', desc: 'You walk me through the workflow or problem.' },
  { step: '02', title: 'Map', desc: 'I pick what gets automated and which tools or APIs it needs.' },
  { step: '03', title: 'Build', desc: 'Backend, integrations, automation. The real thing.' },
  { step: '04', title: 'Test', desc: 'We throw real scenarios at it until it holds.' },
  { step: '05', title: 'Handover', desc: 'You get the working system plus the docs.' },
]

// How I think
export const principles = [
  { title: 'Automate the boring parts', desc: 'If a task repeats, it shouldn’t need a human. I find the loop and delete it.' },
  { title: 'Build to hand over', desc: 'You get the system and the docs. No black boxes, no lock-in, no ghosting.' },
  { title: 'Backend first', desc: 'Clean data models and solid APIs before anything shiny goes on top.' },
  { title: 'Ship, then sharpen', desc: 'A real working version fast, then we tune it on actual usage.' },
]
