import { useEffect, useState } from 'react';
import { fetchJson, getApiUrl, normalizeItems } from '../api.js';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const payload = await fetchJson(getApiUrl('workouts'));

        if (!isMounted) {
          return;
        }

        setItems(normalizeItems(payload));
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="container py-5">Loading workouts...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-primary fw-semibold text-uppercase mb-1">Workouts</p>
          <h1 className="h3 fw-bold mb-0">Personalized workout suggestions</h1>
        </div>
      </div>

      <div className="row g-4">
        {items.map((workout) => (
          <div className="col-md-6" key={workout._id ?? workout.name}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5 fw-bold">{workout.name ?? 'Workout plan'}</h2>
                <p className="text-muted mb-3">{workout.focus ?? 'General fitness'}</p>
                <p className="mb-2"><strong>Difficulty:</strong> {workout.difficulty ?? 'Beginner'}</p>
                <p className="mb-2"><strong>Duration:</strong> {workout.duration ?? '—'} min</p>
                <p className="mb-0"><strong>Goals:</strong> {Array.isArray(workout.goals) ? workout.goals.join(', ') : '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
