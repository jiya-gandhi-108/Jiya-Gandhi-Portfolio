import { useEffect, useState } from 'react'
import {
  LogOut,
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
  Upload,
  Loader2,
  Github,
  ExternalLink,
  FileText,
} from 'lucide-react'
import {
  supabase,
  isSupabaseConfigured,
  OWNER_EMAIL,
  PROJECT_IMAGES_BUCKET,
  FILES_BUCKET,
  SUPABASE_URL,
} from '../lib/supabase'
import { defaultProfile } from '../lib/data'

const toList = (v) =>
  Array.isArray(v)
    ? v
    : String(v || '')
        .split(/[,|]/)
        .map((s) => s.trim())
        .filter(Boolean)

const emptyProject = {
  title: '',
  image_url: '',
  problem: '',
  built: '',
  subtitle: '',
  year: '',
  tag: '',
  long_desc: '',
  outcome: '',
  stack: '',
  handled: '',
  github_url: '',
  demo_url: '',
  case_study_url: '',
  featured: false,
  sort_order: 0,
}

// ---------------------------------------------------------------------------

export default function Dashboard() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setReady(true)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isSupabaseConfigured) return <SetupNotice />
  if (!ready)
    return (
      <div className="grid min-h-screen place-items-center bg-bg text-muted">
        <Loader2 className="animate-spin" />
      </div>
    )
  if (!session) return <Login />
  return <Manage session={session} />
}

// ---------------------------------------------------------------------------

function Shell({ children, right }) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="font-mono text-sm text-ink">
            <span className="text-accent">{'//'}</span> jiya.dev / dashboard
          </a>
          <div className="flex items-center gap-2.5">
            {right}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8">{children}</main>
    </div>
  )
}

function SetupNotice() {
  return (
    <Shell>
      <h1 className="font-display text-2xl font-700">Connect Supabase to enable the dashboard</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        The public portfolio is already live with built-in content. To log in
        and manage projects, add your Supabase keys to a <code>.env</code> file
        and restart:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-graphite p-4 font-mono text-xs text-ink">
{`VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_OWNER_EMAIL=jiya108gandhi@gmail.com`}
      </pre>
      <p className="mt-4 text-sm text-muted">
        Full steps (tables, storage buckets, creating your login) are in the
        project <code>README.md</code>.
      </p>
      <a href="/" className="mt-6 inline-block font-mono text-sm text-accent">← Back to portfolio</a>
    </Shell>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async () => {
    setErr('')
    if (OWNER_EMAIL && email.trim().toLowerCase() !== OWNER_EMAIL) {
      setErr('This email is not allowed to sign in.')
      return
    }
    setBusy(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setBusy(false)
    if (error) {
      const m = (error.message || '').toLowerCase()
      if (m.includes('invalid path') || m.includes('failed to fetch') || m.includes('not valid json')) {
        setErr(
          `Can't reach Supabase. The app is calling: ${SUPABASE_URL || '(empty)'} — that must be your project URL ` +
            `(https://<ref>.supabase.co, from Settings → Data API). Fix VITE_SUPABASE_URL in .env and restart the dev server.`,
        )
      } else if (m.includes('invalid login credentials')) {
        setErr('Invalid email or password. Also confirm this user exists in Supabase → Authentication → Users.')
      } else {
        setErr(error.message)
      }
    }
  }

  return (
    <Shell>
      <div className="mx-auto max-w-sm">
        <h1 className="font-display text-2xl font-700">Sign in</h1>
        <p className="mt-2 text-sm text-muted">Owner access only.</p>
        <div className="mt-6 space-y-3">
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="input"
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="input"
              placeholder="••••••••"
            />
          </Field>
          {err && <p className="text-sm text-red-500">{err}</p>}
          <button onClick={submit} disabled={busy} className="btn-primary w-full justify-center">
            {busy ? <Loader2 size={16} className="animate-spin" /> : 'Sign in'}
          </button>
          <a href="/" className="block pt-2 text-center font-mono text-xs text-muted hover:text-accent">
            ← Back to portfolio
          </a>
        </div>
      </div>
    </Shell>
  )
}

// ---------------------------------------------------------------------------

function Manage({ session }) {
  const [tab, setTab] = useState('projects')
  return (
    <Shell
      right={
        <button
          onClick={() => supabase.auth.signOut()}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink hover:border-accent hover:text-accent"
        >
          <LogOut size={13} /> Sign out
        </button>
      }
    >
      <div className="mb-6 flex gap-2">
        {['projects', 'profile'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 font-mono text-sm capitalize ${
              tab === t ? 'bg-accent text-white' : 'border border-line text-muted hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="mb-6 font-mono text-xs text-muted">Signed in as {session.user.email}</p>
      {tab === 'projects' ? <ProjectsManager /> : <ProfileManager />}
    </Shell>
  )
}

// ---------------- Projects ----------------

function ProjectsManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // project object or null
  const [msg, setMsg] = useState('')

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    setItems(error ? [] : data || [])
    setLoading(false)
  }
  useEffect(() => {
    load()
  }, [])

  const remove = async (id) => {
    if (!confirm('Delete this project?')) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) setMsg(error.message)
    else load()
  }

  if (editing !== null)
    return (
      <ProjectForm
        initial={editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null)
          load()
        }}
      />
    )

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-700">Projects</h2>
        <button onClick={() => setEditing({ ...emptyProject })} className="btn-primary">
          <Plus size={16} /> Add project
        </button>
      </div>
      {msg && <p className="mb-3 text-sm text-red-500">{msg}</p>}
      {loading ? (
        <Loader2 className="animate-spin text-muted" />
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">
          No projects yet. Add your first one — it appears on the portfolio instantly.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-line bg-graphite p-3"
            >
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-md border border-line bg-bg">
                {p.image_url && (
                  <img src={p.image_url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-600">{p.title}</p>
                <p className="mt-0.5 flex items-center gap-2 text-muted">
                  {p.github_url && <Github size={13} />}
                  {p.demo_url && <ExternalLink size={13} />}
                  {p.case_study_url && <FileText size={13} />}
                </p>
              </div>
              <button onClick={() => setEditing(p)} className="icon-btn" aria-label="Edit">
                <Pencil size={15} />
              </button>
              <button onClick={() => remove(p.id)} className="icon-btn" aria-label="Delete">
                <Trash2 size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ProjectForm({ initial, onCancel, onSaved }) {
  const [f, setF] = useState({
    ...initial,
    stack: Array.isArray(initial.stack) ? initial.stack.join(', ') : initial.stack || '',
    handled: Array.isArray(initial.handled) ? initial.handled.join(', ') : initial.handled || '',
  })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [uploading, setUploading] = useState(false)
  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setF((s) => ({ ...s, [k]: v }))
  }

  const uploadImage = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setErr('')
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`
    const { error } = await supabase.storage
      .from(PROJECT_IMAGES_BUCKET)
      .upload(path, file, { upsert: true })
    if (error) {
      setErr(`Image upload failed: ${error.message}`)
      setUploading(false)
      return
    }
    const { data } = supabase.storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(path)
    setF((s) => ({ ...s, image_url: data.publicUrl }))
    setUploading(false)
  }

  const save = async () => {
    setErr('')
    if (!f.title.trim()) return setErr('Title is required.')
    if (!f.github_url.trim()) return setErr('GitHub link is required for every project.')
    setBusy(true)
    const payload = {
      title: f.title.trim(),
      image_url: f.image_url || null,
      problem: f.problem || null,
      built: f.built || null,
      subtitle: f.subtitle || null,
      year: f.year || null,
      tag: f.tag || null,
      long_desc: f.long_desc || null,
      outcome: f.outcome || null,
      stack: toList(f.stack),
      handled: toList(f.handled),
      github_url: f.github_url.trim(),
      demo_url: f.demo_url?.trim() || null,
      case_study_url: f.case_study_url?.trim() || null,
      featured: !!f.featured,
      sort_order: Number(f.sort_order) || 0,
    }
    let error
    if (f.id) ({ error } = await supabase.from('projects').update(payload).eq('id', f.id))
    else ({ error } = await supabase.from('projects').insert(payload))
    setBusy(false)
    if (error) setErr(error.message)
    else onSaved()
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-xl font-700">{f.id ? 'Edit project' : 'Add project'}</h2>
        <button onClick={onCancel} className="icon-btn" aria-label="Cancel">
          <X size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <Field label="Title *">
          <input className="input" value={f.title} onChange={set('title')} />
        </Field>

        <Field label="Display image">
          <div className="flex items-center gap-3">
            <div className="h-16 w-24 overflow-hidden rounded-md border border-line bg-graphite">
              {f.image_url && <img src={f.image_url} alt="" className="h-full w-full object-cover" />}
            </div>
            <label className="btn-ghost cursor-pointer">
              {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              Upload
              <input type="file" accept="image/*" className="hidden" onChange={uploadImage} />
            </label>
          </div>
        </Field>

        <Field label="Problem">
          <textarea rows={2} className="input" value={f.problem} onChange={set('problem')} />
        </Field>
        <Field label="What you built">
          <textarea rows={2} className="input" value={f.built} onChange={set('built')} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Subtitle (one line)">
            <input className="input" value={f.subtitle} onChange={set('subtitle')} placeholder="Voice-driven lead qualification" />
          </Field>
          <Field label="Year">
            <input className="input" value={f.year} onChange={set('year')} placeholder="2025" />
          </Field>
          <Field label="Tag">
            <input className="input" value={f.tag} onChange={set('tag')} placeholder="AI · Automation" />
          </Field>
        </div>
        <Field label="How it works (long description — shown on the project page)">
          <textarea rows={3} className="input" value={f.long_desc} onChange={set('long_desc')} />
        </Field>
        <Field label="Outcome / result">
          <textarea rows={2} className="input" value={f.outcome} onChange={set('outcome')} />
        </Field>
        <Field label="Stack (comma separated)">
          <input className="input" value={f.stack} onChange={set('stack')} placeholder="Node.js, MongoDB, Stripe" />
        </Field>
        <Field label="What you handled (comma separated)">
          <input className="input" value={f.handled} onChange={set('handled')} placeholder="Auth, Payments, Admin APIs" />
        </Field>

        <Field label="GitHub link * (required)">
          <input className="input" value={f.github_url} onChange={set('github_url')} placeholder="https://github.com/..." />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Live demo (optional)">
            <input className="input" value={f.demo_url} onChange={set('demo_url')} />
          </Field>
          <Field label="Case study (optional)">
            <input className="input" value={f.case_study_url} onChange={set('case_study_url')} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Sort order">
            <input type="number" className="input" value={f.sort_order} onChange={set('sort_order')} />
          </Field>
          <label className="flex items-center gap-2 pt-7 font-mono text-sm">
            <input type="checkbox" checked={!!f.featured} onChange={set('featured')} /> Featured
          </label>
        </div>

        {err && <p className="text-sm text-red-500">{err}</p>}
        <div className="flex gap-3 pt-1">
          <button onClick={save} disabled={busy} className="btn-primary">
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save
          </button>
          <button onClick={onCancel} className="btn-ghost">Cancel</button>
        </div>
      </div>
    </div>
  )
}

// ---------------- Profile ----------------

function ProfileManager() {
  const [f, setF] = useState(null)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    supabase
      .from('profile')
      .select('*')
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        const base = data || defaultProfile
        setF({
          ...defaultProfile,
          ...base,
          roles: (base.roles || defaultProfile.roles).join(', '),
          hero_points: (base.hero_points || defaultProfile.hero_points).join(', '),
        })
      })
  }, [])

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const uploadResume = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setErr('')
    const path = `resume-${Date.now()}.pdf`
    const { error } = await supabase.storage.from(FILES_BUCKET).upload(path, file, {
      upsert: true,
      contentType: file.type || 'application/pdf',
    })
    if (error) {
      setErr(`Résumé upload failed: ${error.message}`)
      setUploading(false)
      return
    }
    const { data } = supabase.storage.from(FILES_BUCKET).getPublicUrl(path)
    setF((s) => ({ ...s, resume_url: data.publicUrl }))
    setUploading(false)
  }

  const save = async () => {
    setErr('')
    setMsg('')
    setBusy(true)
    const payload = {
      id: f.id || undefined,
      name: f.name,
      roles: toList(f.roles),
      tagline: f.tagline,
      hero_points: toList(f.hero_points),
      email: f.email,
      phone: f.phone,
      location: f.location,
      github_url: f.github_url,
      linkedin_url: f.linkedin_url,
      resume_url: f.resume_url,
      avatar_url: f.avatar_url,
    }
    const { error } = await supabase.from('profile').upsert(payload)
    setBusy(false)
    if (error) setErr(error.message)
    else setMsg('Saved. Refresh the portfolio to see changes.')
  }

  if (!f) return <Loader2 className="animate-spin text-muted" />

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-5 font-display text-xl font-700">Profile & contact</h2>
      <div className="space-y-4">
        <Field label="Name"><input className="input" value={f.name || ''} onChange={set('name')} /></Field>
        <Field label="Roles (comma separated)"><input className="input" value={f.roles || ''} onChange={set('roles')} /></Field>
        <Field label="Tagline"><textarea rows={2} className="input" value={f.tagline || ''} onChange={set('tagline')} /></Field>
        <Field label="Hero points (comma separated)"><input className="input" value={f.hero_points || ''} onChange={set('hero_points')} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email"><input className="input" value={f.email || ''} onChange={set('email')} /></Field>
          <Field label="Phone"><input className="input" value={f.phone || ''} onChange={set('phone')} /></Field>
        </div>
        <Field label="Location"><input className="input" value={f.location || ''} onChange={set('location')} /></Field>
        <Field label="GitHub URL"><input className="input" value={f.github_url || ''} onChange={set('github_url')} /></Field>
        <Field label="LinkedIn URL"><input className="input" value={f.linkedin_url || ''} onChange={set('linkedin_url')} /></Field>
        <Field label="Avatar URL"><input className="input" value={f.avatar_url || ''} onChange={set('avatar_url')} /></Field>

        <Field label="Résumé file">
          <div className="flex items-center gap-3">
            {f.resume_url && (
              <a href={f.resume_url} target="_blank" rel="noreferrer" className="font-mono text-xs text-accent underline">
                current résumé
              </a>
            )}
            <label className="btn-ghost cursor-pointer">
              {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              Upload PDF
              <input type="file" accept="application/pdf" className="hidden" onChange={uploadResume} />
            </label>
          </div>
        </Field>

        {err && <p className="text-sm text-red-500">{err}</p>}
        {msg && <p className="text-sm text-green-500">{msg}</p>}
        <button onClick={save} disabled={busy} className="btn-primary">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save profile
        </button>
      </div>
    </div>
  )
}

// ---------------- shared bits ----------------

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs text-muted">{label}</span>
      {children}
    </label>
  )
}
