import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PixelCursor from './components/PixelCursor'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'
import JourneyDetail from './pages/JourneyDetail'

export default function App() {
  return (
    <BrowserRouter>
      <PixelCursor />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/journey/:id" element={<JourneyDetail />} />
        <Route path="*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  )
}
