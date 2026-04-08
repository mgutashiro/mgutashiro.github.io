import { Link } from "react-router-dom"

export default function DFTPage() {
  return (
    <main className="page-dft">
      <h1>DFT Studies</h1>

      <p>
        Computational chemistry work using ORCA including hydroquinone and
        chromium complex calculations.
      </p>

      <Link to="/">← Back to Home</Link>
    </main>
  )
}