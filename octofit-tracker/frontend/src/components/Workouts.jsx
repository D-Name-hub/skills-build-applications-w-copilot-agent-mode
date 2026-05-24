import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchApiItems } from './api.js'

const WORKOUTS_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function renderValue(value) {
  if (value === null || value === undefined) {
    return <span className="text-muted">—</span>
  }

  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return String(value)
}

function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchApiItems('workouts')
      .then(setItems)
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  const columns = items.length ? Object.keys(items[0]) : []

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h3 fw-bold">Workouts</h1>
              <p className="text-muted mb-4">Workouts are loaded from the backend API and can handle both direct arrays and paginated responses.</p>

              {loading && <p>Loading workouts...</p>}
              {error && <div className="alert alert-danger">{error.message}</div>}
              {!loading && !error && items.length === 0 && (
                <p className="text-muted">No workouts found.</p>
              )}

              {!loading && !error && items.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        {columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={item.id ?? item._id ?? index}>
                          {columns.map((column) => (
                            <td key={column}>{renderValue(item[column])}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <Link to="/" className="btn btn-outline-secondary mt-3">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workouts
