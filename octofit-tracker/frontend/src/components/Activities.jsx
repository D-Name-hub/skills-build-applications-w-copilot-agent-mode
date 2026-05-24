import { useEffect, useState } from 'react';
import { fetchJson, getApiUrl, normalizeItems } from '../api.js';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const payload = await fetchJson(getApiUrl('activities'));

        if (!isMounted) {
          return;
        }

        setItems(normalizeItems(payload));
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="container py-5">Loading activities...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-primary fw-semibold text-uppercase mb-1">Activities</p>
          <h1 className="h3 fw-bold mb-0">Recent activity log</h1>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((activity) => (
              <tr key={activity._id ?? `${activity.user}-${activity.date}`}> 
                <td>{activity.user ?? 'Unknown'}</td>
                <td>{activity.type ?? 'N/A'}</td>
                <td>{activity.duration ?? '—'} min</td>
                <td>{activity.calories ?? '—'}</td>
                <td>{activity.date ? new Date(activity.date).toLocaleString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
