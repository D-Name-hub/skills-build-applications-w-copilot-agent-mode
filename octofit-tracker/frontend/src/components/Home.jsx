import { Link } from 'react-router-dom'

function Home() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiExample = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-primary fw-semibold text-uppercase">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold">Dashboard</h1>
              <p className="lead text-muted mt-3">
                The React frontend uses <code>import.meta.env.VITE_CODESPACE_NAME</code> to build API requests.
              </p>
              <p className="text-muted">
                API requests are routed to
                <br />
                <code>{apiExample}</code>
              </p>
              <div className="mt-4 d-flex gap-3 flex-wrap">
                <Link to="/activities" className="btn btn-primary">Activities</Link>
                <Link to="/workouts" className="btn btn-outline-primary">Workouts</Link>
                <Link to="/leaderboard" className="btn btn-outline-primary">Leaderboard</Link>
                <Link to="/teams" className="btn btn-outline-primary">Teams</Link>
                <Link to="/users" className="btn btn-outline-primary">Users</Link>
              </div>
              <p className="mt-4 small text-muted">
                Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for GitHub Codespaces. When unset, the app falls back to <code>http://localhost:8000</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
