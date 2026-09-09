import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PixelCursor from './components/PixelCursor'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'

const Dashboard = lazy(() => import('./pages/Dashboard'))

export default function App() {
  return (
    <BrowserRouter>
      <PixelCursor />
      <Suspense fallback={<div className="grid min-h-screen place-items-center font-sans text-sm text-muted">loading…</div>}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
