import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-primary fw-semibold text-uppercase">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold">A connected view of your fitness community</h1>
              <p className="lead text-muted mt-3">
                Browse users, teams, activities, workout suggestions, and the leaderboard to keep the experience aligned with the backend API.
              </p>

              <div className="row g-3 mt-4">
                <div className="col-md-6 col-lg-4">
                  <Link to="/users" className="btn btn-primary w-100">Users</Link>
                </div>
                <div className="col-md-6 col-lg-4">
                  <Link to="/teams" className="btn btn-outline-primary w-100">Teams</Link>
                </div>
                <div className="col-md-6 col-lg-4">
                  <Link to="/activities" className="btn btn-outline-primary w-100">Activities</Link>
                </div>
                <div className="col-md-6 col-lg-4">
                  <Link to="/leaderboard" className="btn btn-outline-primary w-100">Leaderboard</Link>
                </div>
                <div className="col-md-6 col-lg-4">
                  <Link to="/workouts" className="btn btn-outline-primary w-100">Workouts</Link>
                </div>
              </div>
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
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  )
}

export default App
