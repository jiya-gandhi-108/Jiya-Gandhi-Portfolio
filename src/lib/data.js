// All portfolio content lives in this file (and src/data/projects.json).
// There is no database: edit the values here and redeploy to update the site.
import projectsData from '../data/projects.json'

export const profile = {
  name: 'Jiya Gandhi',
  first: 'Jiya',
  last: 'Gandhi',
  role: 'AI Automation Engineer',
  // Shown big in the second stage of the hero.
  roles: ['AI Automation Engineer', 'Backend Developer'],
  location: 'Delhi, India',
  // Hero headline: three lines, alternating lime / white / lime.
  headline: ['I automate the boring', 'stuff so your team', 'can touch grass'],
  tldr: 'Backend dev turned AI automation engineer. I build the APIs, agents and workflows that quietly do the work nobody wants to do. No fluff, just systems that ship.',

  // Hero hover effect (desktop only): a circle around the cursor shows the photo in colour
  // and turns the lime name white. Set to 'none' to switch it off.
  heroCursor: 'reveal',

  email: 'jiya108gandhi@gmail.com',
  phone: '+91 9213729985',
  // WhatsApp number in international format, digits only
  whatsapp: '919213729985',
  github_url: 'https://github.com/jiya-gandhi-108',
  linkedin_url: 'https://www.linkedin.com/in/jiya-gandhi-108',
  resume_url: '/Jiya_Gandhi_Resume.pdf',
  avatar_url: '/assets/jiya.jpg',
  // Background-removed portrait used in the hero. Replace this file to change the photo.
  cutout_url: '/assets/jiya-cutout.webp',
  available: true,
}

// The pitch, shown as the scroll-highlight paragraph under the hero.
export const pitch =
  'Hand me a messy, repetitive process. I map it, build the backend, wire up the APIs and ship an automation your team actually uses. Three-plus years, fifteen-plus client builds, and a voice agent that screens candidates on its own. That’s the pitch, no cap.'

// Skills grouped for the Stack section. Icon names are resolved in Skills.jsx.
// Skills & stack (matches the CV's Core Skills).
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
      { name: 'Azure' },
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

// My Journey, newest first (matches the CV in public/Jiya_Gandhi_Resume.pdf).
// `summary` = the one-liner on the home page. Everything else shows on /journey/:id.
export const experience = [
  {
    id: 'growing-digitally',
    role: 'AI Engineer & Backend Developer',
    org: 'Growing Digitally',
    location: 'Delhi, India',
    period: 'Jul 2025 to Oct 2026',
    summary: 'AI agents, n8n automations and RAG chatbots for web and WhatsApp, plus client sites with admin dashboards.',
    desc: 'Built AI agents, RAG chatbots and lead and content automations that replaced repetitive manual work for client teams, plus client websites with admin dashboards.',
    points: [
      'Designed and deployed AI agents and multi-step n8n workflows that handle lead capture, qualification, follow-ups and content operations end to end, replacing repetitive manual work for client teams.',
      'Built a website chatbot powered by RAG and an LLM, with a vector database for knowledge retrieval and n8n orchestration, then extended it into a WhatsApp chatbot on the same retrieval pipeline.',
      'Developed lead-handling automations that capture enquiries from websites and WhatsApp, enrich and score them with LLM prompts, and push structured records into CRM and email workflows.',
      'Created AI-assisted content pipelines for blogs and service pages, using prompt engineering and review steps to keep output consistent with each client’s brand and tone.',
      'Integrated OpenAI, Gemini and Claude APIs into client products, and used MCP connectors and webhooks to let AI agents read from and act on external tools and data.',
      'Built and deployed client websites (service, e-commerce, blog and business sites) with admin dashboards featuring role-based access control, live content editing and lead management.',
      'Implemented secure admin authentication, documented database schemas, debugged login and dashboard issues in PHP/JS, and rolled out sitewide updates across 30+ pages of live client sites.',
    ],
    stack: ['n8n', 'RAG', 'Vector Databases', 'OpenAI API', 'Gemini API', 'Claude API', 'MCP', 'WhatsApp', 'Webhooks', 'PHP', 'MySQL', 'JavaScript'],
  },
  {
    id: 'ac922d36-1d1c-41b1-99d7-c4a2f15f1fdb',
    role: 'Software Developer Intern',
    org: 'Right Advisors',
    location: 'Delhi, India',
    period: 'Jan 2025 to Jun 2025',
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
    id: '6a2d2092-0d12-4350-87f4-c67b00be1889',
    role: 'Freelance Software Developer',
    org: 'Self-Employed',
    location: 'Remote',
    period: 'Jan 2023 to Dec 2024',
    summary: '15+ client projects end to end: APIs, auth, dashboards, payments and deployment.',
    desc: 'Delivered 15+ client projects end to end across healthcare, education, recruitment, SaaS, e-commerce and services, from discovery through deployment and post-launch support.',
    points: [
      'Delivered 15+ client projects across healthcare, education, recruitment, SaaS, e-commerce and service businesses, managing each from requirements discovery through deployment and post-launch support.',
      'Built secure REST APIs, authentication systems, admin dashboards and database-backed apps with Node.js, FastAPI, PostgreSQL and MongoDB, including JWT auth and role-based access control.',
      'Designed relational and document database schemas, wrote optimized SQL queries, and structured backend code into maintainable service and route layers.',
      'Integrated Stripe and Razorpay for payments, plus WhatsApp and email workflows for notifications, reminders and customer communication.',
      'Built appointment-booking and patient-record backends for healthcare clients, and student, course and enrollment systems for education clients.',
      'Developed recruitment portals with candidate profiles, job listings, application tracking and admin review dashboards.',
      'Containerized apps with Docker and deployed them on Vercel, Render, Railway and AWS, with Git-based CI/CD pipelines for repeatable releases.',
    ],
    stack: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'JWT', 'Stripe', 'Razorpay', 'Docker', 'AWS', 'Vercel', 'Render', 'Railway', 'CI/CD'],
  },
]

// Projects live in src/data/projects.json (images in public/projects/).
// Order: sort_order ascending. `featured: true` → "Stuff I've shipped";
// every project shows in the archive strip.
export const projects = [...projectsData].sort(
  (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || String(a.created_at).localeCompare(String(b.created_at)),
)

export const getProjectById = (id) => projects.find((p) => String(p.id) === String(id)) || null
export const getExperienceById = (id) => experience.find((e) => String(e.id) === String(id)) || null

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
