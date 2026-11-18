import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FloatingContact from './components/FloatingContact'
import { profile } from './lib/data'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'
import JourneyDetail from './pages/JourneyDetail'

export default function App() {
  return (
    <BrowserRouter>
      {/* .with-dock keeps a right gutter on md+ for the floating buttons */}
      <div className="with-dock">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/journey/:id" element={<JourneyDetail />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </div>
      <FloatingContact profile={profile} />
    </BrowserRouter>
  )
}
