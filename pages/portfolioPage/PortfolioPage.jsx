import { Link } from "react-router-dom"

export default function PortfolioPage() {
  return (
    <main className="page-portfolio">
      <h1>Portfolio</h1>

      <p>
        Coding experiments, Blender models, visualizations, and educational
        projects combining science and creativity.
      </p>

      <Link to="/">← Back to Home</Link>
    </main>
  )
}