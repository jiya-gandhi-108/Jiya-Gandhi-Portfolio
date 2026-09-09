import { supabase, isSupabaseConfigured } from './supabase'

export const defaultProfile = {
  name: 'Jiya Gandhi',
  first: 'Jiya',
  last: 'Gandhi',
  roles: ['Backend Developer', 'AI Automation Engineer'],
  journey: { from: 'Backend Developer', to: 'AI Automation Engineer' },
  headline: ['Building', 'Intelligent', 'Systems'],
  headline_sub: 'Same logic, bigger problems to solve.',
  tagline:
    'I build backend systems, API integrations, and AI-powered workflow automations that eliminate repetitive work.',
  location: 'India',
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
    role: 'AI Automation & Backend Developer',
    org: 'Freelance',
    period: '2023 — Present',
    desc: 'Building AI workflow automations, backend APIs, and CRM integrations for clients across recruitment, e-commerce, and internal-tools work.',
  },
  {
    role: 'Backend / Automation Intern',
    org: 'Right Advisors',
    period: '2024 · 6 months',
    desc: 'Built recruitment automations and internal tooling across the Zoho stack — assignment logic, status flows, and reporting.',
  },
]

// GitHub required; demo/case-study optional. First 5 render as main "Work",
// the rest flow into "My Coding World" as horizontal moving cards.
export const defaultProjects = [
  {
    id: 'voice-agent', title: 'AI Voice Calling Agent', subtitle: 'Voice-driven lead qualification that logs itself.',
    year: '2025', tag: 'AI · Automation', image_url: '',
    problem: 'Recruiters burned hours manually screening candidates and logging calls by hand.',
    built: 'An AI calling workflow that captures intent, qualifies leads, structures notes, and pushes follow-up-ready records into the CRM.',
    long_desc: 'The agent runs an automated call flow, transcribes and interprets responses with an LLM, scores the candidate against role criteria, and writes a clean summary plus structured fields back to the recruitment system — no manual data entry.',
    stack: ['Python', 'OpenAI API', 'n8n', 'Webhooks', 'CRM APIs'],
    handled: ['Voice-call workflow', 'LLM integration', 'Candidate scoring', 'Automated data transfer'],
    outcome: 'Standardized candidate evaluation and cut manual screening time.',
    github_url: 'https://github.com/jiya-gandhi-108', demo_url: '', case_study_url: '#', featured: true, sort_order: 1,
  },
  {
    id: 'crm-automation', title: 'CRM Automation System', subtitle: 'A recruitment pipeline that moves itself.',
    year: '2025', tag: 'Automation · CRM', image_url: '',
    problem: 'Candidate and lead movement across Zoho tools was manual, slow, and inconsistent.',
    built: 'Automated assignment logic, status updates, follow-up triggers, and internal reporting flows across the whole Zoho stack.',
    long_desc: 'Connected automations that route new leads to the right owner, advance statuses on defined triggers, fire follow-ups, and roll activity into internal reports — so the pipeline moves without anyone babysitting it.',
    stack: ['Zoho CRM', 'Zoho Recruit', 'Zoho Flow', 'REST APIs'],
    handled: ['Assignment logic', 'Status automation', 'Follow-up triggers', 'Reporting flows'],
    outcome: 'Removed repetitive CRM admin and kept data consistent.',
    github_url: 'https://github.com/jiya-gandhi-108', demo_url: '', case_study_url: '#', featured: true, sort_order: 2,
  },
  {
    id: 'ecommerce', title: 'E-Commerce Backend', subtitle: 'Orders, payments, and admin — production-ready.',
    year: '2024', tag: 'Backend · Payments', image_url: '',
    problem: 'A storefront needed a reliable backend for orders, payments, and admin control.',
    built: 'A production-style backend with auth, cart & checkout APIs, payment integration, admin product APIs, and database-backed order handling.',
    long_desc: 'Full commerce backend: user auth, cart and checkout endpoints, Stripe payments, an admin API for product management, and durable order records — structured to scale past the demo.',
    stack: ['Node.js', 'MongoDB', 'Stripe', 'REST APIs'],
    handled: ['Auth', 'Cart & checkout APIs', 'Payment integration', 'Order handling'],
    outcome: 'A storefront backend ready for real transactions.',
    github_url: 'https://github.com/jiya-gandhi-108', demo_url: '#', case_study_url: '', featured: false, sort_order: 3,
  },
  {
    id: 'code-collab', title: 'Realtime Code Collab', subtitle: 'Multiplayer editing without the chaos.',
    year: '2024', tag: 'Backend · Realtime', image_url: '',
    problem: 'Multiple users needed to edit the same document live, without stepping on each other.',
    built: 'A collaborative editor backend with live room sessions, real-time WebSocket sync, and shared editing-state persistence.',
    long_desc: 'Backend for a multiplayer editor: rooms that multiple people join, WebSocket sync so edits appear instantly, and persistence so shared state survives reconnects.',
    stack: ['Node.js', 'MongoDB', 'WebSockets'],
    handled: ['Live rooms', 'WebSocket sync', 'State persistence'],
    outcome: 'Smooth multi-user editing with no lost state.',
    github_url: 'https://github.com/jiya-gandhi-108', demo_url: '#', case_study_url: '#', featured: false, sort_order: 4,
  },
  {
    id: 'rag-assistant', title: 'RAG Knowledge Assistant', subtitle: 'Answers grounded in your own docs.',
    year: '2025', tag: 'AI · RAG', image_url: '',
    problem: 'Teams kept re-answering the same questions buried in scattered documents.',
    built: 'A retrieval-augmented assistant that embeds documents, retrieves the right context, and answers with citations.',
    long_desc: 'Document ingestion + chunking, vector embeddings, semantic retrieval, and an LLM answer layer that cites the source passages it used.',
    stack: ['Python', 'OpenAI API', 'Vector DB', 'FastAPI'],
    handled: ['Embeddings', 'Retrieval', 'Answer + citations'],
    outcome: 'Self-serve answers from a team’s own knowledge base.',
    github_url: 'https://github.com/jiya-gandhi-108', demo_url: '', case_study_url: '', featured: false, sort_order: 5,
  },
  {
    id: 'invoice-bot', title: 'Invoice Automation Bot', subtitle: 'From email to booked invoice, hands-free.',
    year: '2024', tag: 'Automation', image_url: '',
    problem: 'Invoices arrived by email and were entered into the books by hand.',
    built: 'A pipeline that reads incoming invoices, extracts the fields with AI, and creates the record automatically.',
    long_desc: 'Email trigger → document parsing → AI field extraction → validation → record creation, with a review step for anything low-confidence.',
    stack: ['n8n', 'Python', 'OpenAI API', 'Webhooks'],
    handled: ['Email trigger', 'AI extraction', 'Record creation'],
    outcome: 'Cut manual data entry on incoming invoices.',
    github_url: 'https://github.com/jiya-gandhi-108', demo_url: '', case_study_url: '', featured: false, sort_order: 6,
  },
  {
    id: 'scraper-pipeline', title: 'Data Scraper Pipeline', subtitle: 'Clean, scheduled data on tap.',
    year: '2024', tag: 'Backend · Data', image_url: '',
    problem: 'Useful data was locked in web pages and needed pulling on a schedule.',
    built: 'A scheduled scraping + cleaning pipeline that outputs structured, deduplicated data to a database.',
    long_desc: 'Scheduled crawlers, resilient parsing, cleaning + dedup, and storage — with retries and logging so it keeps running unattended.',
    stack: ['Python', 'PostgreSQL', 'Cron', 'REST APIs'],
    handled: ['Scheduled crawl', 'Cleaning + dedup', 'Storage'],
    outcome: 'Reliable structured data without manual pulls.',
    github_url: 'https://github.com/jiya-gandhi-108', demo_url: '', case_study_url: '', featured: false, sort_order: 7,
  },
  {
    id: 'notify-service', title: 'Notification Microservice', subtitle: 'One API, every channel.',
    year: '2024', tag: 'Backend', image_url: '',
    problem: 'Different apps each re-implemented email/SMS/Slack sending.',
    built: 'A single notification service with a clean API, provider fallbacks, and delivery tracking.',
    long_desc: 'A microservice that fronts multiple providers behind one endpoint, with templating, retries, provider fallback, and delivery status.',
    stack: ['Node.js', 'Express', 'Redis', 'REST APIs'],
    handled: ['Unified API', 'Provider fallback', 'Delivery tracking'],
    outcome: 'One place to send and track notifications.',
    github_url: 'https://github.com/jiya-gandhi-108', demo_url: '', case_study_url: '', featured: false, sort_order: 8,
  },
]

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

// --------------------------- fetch helpers ---------------------------------
export async function fetchProfile() {
  if (!isSupabaseConfigured) return defaultProfile
  try {
    const { data, error } = await supabase.from('profile').select('*').limit(1).maybeSingle()
    if (error || !data) return defaultProfile
    return { ...defaultProfile, ...cleanNulls(data) }
  } catch { return defaultProfile }
}

export async function fetchProjects() {
  if (!isSupabaseConfigured) return defaultProjects
  try {
    const { data, error } = await supabase
      .from('projects').select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    if (error || !data || data.length === 0) return defaultProjects
    return data
  } catch { return defaultProjects }
}

export async function fetchProjectById(id) {
  const list = await fetchProjects()
  return list.find((p) => String(p.id) === String(id)) || null
}

function cleanNulls(obj) {
  const out = {}
  for (const k in obj) if (obj[k] !== null && obj[k] !== '') out[k] = obj[k]
  return out
}
