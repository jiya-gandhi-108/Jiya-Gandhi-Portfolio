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
  // WhatsApp number in international format, digits only (used for the floating WhatsApp button)
  whatsapp: '919213729985',
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

// grouped, for the Skills section grid — icon names resolved in Skills.jsx
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

// My Journey (from the résumé) — newest first.
// `points` = what I did (bullets), `stack` = tools I used there.
export const experience = [
  {
    id: 'ac922d36-1d1c-41b1-99d7-c4a2f15f1fdb',
    role: 'Software Developer Intern',
    org: 'Right Advisors',
    location: 'Delhi, India',
    period: 'Apr 2026 — Sept 2026',
    desc: 'Built AI agents, chatbots, internal tools and Zoho automations for the recruitment and business teams.',
    points: [
      'Built an AI voice-calling agent that automates recruiter outreach — capturing caller intent, qualifying leads, and syncing structured records into Zoho.',
      'Built an AI chatbot using Zoho SalesIQ integration, qualifying website visitors and routing structured leads into Zoho CRM.',
      'Designed and shipped responsive business websites and internal tools used across the organization.',
      'Automated multi-step workflows across the Zoho ecosystem (CRM, Recruit, Flow), cutting repetitive manual work for the recruitment and business teams.',
      'Developed a role-based task-management application (assignment, deadline reminders, EOD reporting) and an in-house HRMS platform covering attendance, payroll, and analytics.',
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'Supabase', 'Zoho CRM', 'Zoho Recruit', 'Zoho Flow', 'Zoho SalesIQ', 'LLM APIs'],
  },
  {
    id: 'growing-digitally',
    role: 'AI Solutions Specialist',
    org: 'Growing Digitally',
    location: 'Remote',
    period: 'Mar 2025 — Apr 2026',
    desc: 'Built and launched client websites with admin dashboards, plus AI agents and RAG chatbots for web and WhatsApp.',
    points: [
      'Built and deployed a range of client websites — service-industry, e-commerce, blog, and business sites — from design through launch.',
      'Built multi-page websites with admin dashboards featuring role-based access control, live content editing, and lead management.',
      'Implemented secure admin authentication, documented database schemas, and debugged login and dashboard issues in PHP/JS.',
      'Rolled out sitewide updates (contact details, WhatsApp links) across 30+ pages of live client sites.',
      'Developed AI agents and automated workflows to streamline content, lead handling, and repetitive business operations.',
      'Coded a website chatbot integrated with RAG and an LLM, using n8n workflows; extended to WhatsApp chatbot automation.',
      'Worked hands-on with leading AI tools and platforms — ChatGPT, Gemini, Perplexity, Claude Code, and connectors — to prototype and ship AI-powered features.',
    ],
    stack: ['PHP', 'MySQL', 'JavaScript', 'n8n', 'RAG', 'LLM APIs', 'WhatsApp', 'ChatGPT', 'Gemini', 'Claude Code'],
  },
  {
    id: '6a2d2092-0d12-4350-87f4-c67b00be1889',
    role: 'Freelance Software Developer',
    org: 'Self-Employed',
    location: 'Remote',
    period: 'Jan 2023 — Apr 2025',
    desc: 'Delivered 15+ client projects end-to-end across healthcare, education, recruitment, SaaS, e-commerce and services.',
    points: [
      'Delivered 15+ client projects across healthcare, education, recruitment, SaaS, e-commerce, and service businesses.',
      'Built secure REST APIs, authentication systems, admin dashboards, payment integrations, and database-backed applications with Node.js, FastAPI, PostgreSQL, and MongoDB.',
      'Integrated Stripe, Razorpay, and WhatsApp/email workflows while managing projects end-to-end from discovery through deployment.',
    ],
    stack: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Stripe', 'Razorpay', 'REST APIs'],
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
