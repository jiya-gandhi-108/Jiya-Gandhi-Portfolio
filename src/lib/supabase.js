import { createClient } from '@supabase/supabase-js'

// Normalize whatever was pasted into VITE_SUPABASE_URL into a clean project
// base URL: "https://<ref>.supabase.co" with NO path/query.
//
// This is defensive because the #1 cause of the sign-in error
// "Invalid path specified in request URL" is a wrong base URL — e.g. the
// dashboard URL copied from the browser, a URL with a trailing slash, or one
// that still has a path like /auth/v1. All of those make auth requests hit an
// invalid path. We fix the common cases and expose the final URL for debugging.
function normalizeUrl(raw) {
  let u = (raw || '').trim().replace(/^["']|["']$/g, '')
  if (!u) return ''

  // Dashboard URL? -> extract the project ref and rebuild the API URL.
  //   https://supabase.com/dashboard/project/<ref>/...
  const dash = u.match(/supabase\.com\/dashboard\/project\/([a-z0-9-]+)/i)
  if (dash) return `https://${dash[1]}.supabase.co`

  if (!/^https?:\/\//i.test(u)) u = 'https://' + u
  try {
    // origin only — drops any path, query, hash, or trailing slash.
    return new URL(u).origin
  } catch {
    return u.replace(/\/+$/, '')
  }
}

export const SUPABASE_URL = normalizeUrl(import.meta.env.VITE_SUPABASE_URL)
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim().replace(/^["']|["']$/g, '')

// A valid project URL looks like https://<something>.supabase.co (or a custom
// domain). We only require a well-formed https origin + a key.
export const isSupabaseConfigured = /^https:\/\/[^/]+\.[^/]+$/.test(SUPABASE_URL) && anonKey.length > 0

// Warn in the console with the exact value being used — makes misconfig obvious.
if (import.meta.env.VITE_SUPABASE_URL && !isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn('[supabase] VITE_SUPABASE_URL looks wrong. Using:', SUPABASE_URL, '— expected https://<ref>.supabase.co')
}

export const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, anonKey) : null

export const OWNER_EMAIL = (import.meta.env.VITE_OWNER_EMAIL || '').trim().toLowerCase()
export const PROJECT_IMAGES_BUCKET = 'project-images'
export const FILES_BUCKET = 'files'
