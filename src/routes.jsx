import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '/pages/homepage/HomePage.jsx'
import SpecPage from '/pages/specPage/SpecPage.jsx'
import DFTPage from '/pages/dftPage/DFTPage.jsx'
import PortfolioPage from '/pages/portfolioPage/PortfolioPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/spec" element={<SpecPage />} />
      <Route path="/dft" element={<DFTPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />

      <Route path="/pages/specPage" element={<Navigate to="/spec" replace />} />
      <Route path="/pages/dftPage" element={<Navigate to="/dft" replace />} />
      <Route path="/pages/portfolioPage" element={<Navigate to="/portfolio" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}