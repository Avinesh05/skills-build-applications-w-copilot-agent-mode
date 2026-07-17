import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <Link className="navbar-brand fw-bold" to="/">OctoFit Tracker</Link>
        <div className="ms-auto d-flex gap-3">
          <Link className="nav-link text-white" to="/">Home</Link>
          <Link className="nav-link text-white" to="/users">Users</Link>
          <Link className="nav-link text-white" to="/teams">Teams</Link>
          <Link className="nav-link text-white" to="/activities">Activities</Link>
          <Link className="nav-link text-white" to="/leaderboard">Leaderboard</Link>
          <Link className="nav-link text-white" to="/workouts">Workouts</Link>
        </div>
      </nav>

      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <section className="row g-4 align-items-center">
                <div className="col-lg-7">
                  <h1 className="display-5 fw-bold">Modern fitness tracking for ambitious teams</h1>
                  <p className="lead text-muted">
                    Log workouts, collaborate with teammates, and keep your leaderboard moving in real time.
                  </p>
                  <div className="d-flex gap-3 mt-4">
                    <Link className="btn btn-primary" to="/leaderboard">Open leaderboard</Link>
                    <a className="btn btn-outline-secondary" href="http://localhost:8000/api/health" target="_blank" rel="noreferrer">Check API</a>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <h2 className="h4">Today at a glance</h2>
                      <ul className="list-group list-group-flush mt-3">
                        <li className="list-group-item">5 active challenges</li>
                        <li className="list-group-item">12 teammates online</li>
                        <li className="list-group-item">2 new workout goals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
