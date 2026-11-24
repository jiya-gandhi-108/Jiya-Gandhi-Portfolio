import { useNavigate } from 'react-router-dom'

// Remembers where you were on the home page, so "Back to work" returns you there
// with a clean URL (no #work). Portfolio.jsx saves the position and restores it.
export const HOME_SCROLL_KEY = 'homeScroll'
export const INTRO_SEEN_KEY = 'introSeen'

const read = (k) => { try { return sessionStorage.getItem(k) } catch { return null } }
const write = (k, v) => { try { sessionStorage.setItem(k, v) } catch { /* private mode etc. */ } }
export const storage = { read, write }

// onClick handler for a back link. `fallback` = section to show if there's no saved position
// (e.g. someone opened the project page directly).
export function useBackHome(fallback = 'work') {
  const navigate = useNavigate()
  return (e) => {
    e.preventDefault()
    navigate('/', { state: { restore: true, fallback } })
  }
}
