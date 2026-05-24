import { useEffect, useState } from 'react';
import { fetchJson, getApiUrl, normalizeItems } from '../api.js';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        const payload = await fetchJson(getApiUrl('leaderboard'));

        if (!isMounted) {
          return;
        }

        setItems(normalizeItems(payload));
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="container py-5">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-primary fw-semibold text-uppercase mb-1">Leaderboard</p>
          <h1 className="h3 fw-bold mb-0">Top performers</h1>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Points</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry) => (
              <tr key={entry._id ?? entry.user}>
                <td>{entry.user ?? 'Unknown'}</td>
                <td>{entry.points ?? 0}</td>
                <td>{entry.streak ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
