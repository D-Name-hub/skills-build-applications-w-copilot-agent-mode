import { Link, Route, Routes } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-primary fw-semibold text-uppercase">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold">Welcome to your modern multi-tier starter app</h1>
              <p className="lead text-muted mt-3">
                The presentation tier is now powered by React 19 and Vite, the logic tier runs on Express and TypeScript, and the data tier is prepared for MongoDB access with Mongoose.
              </p>
              <div className="mt-4 d-flex gap-3 flex-wrap">
                <Link to="/" className="btn btn-primary">Dashboard</Link>
                <Link to="/workouts" className="btn btn-outline-primary">Workouts</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Workouts() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="h3 fw-bold">Workout planning</h1>
              <p className="text-muted mt-3">
                This placeholder route shows the router wiring for the frontend while the backend APIs are being added.
              </p>
              <Link to="/" className="btn btn-outline-secondary">Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
