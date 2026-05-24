import { useEffect, useState } from 'react';
import { fetchJson, getApiUrl, normalizeItems } from '../api.js';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const payload = await fetchJson(getApiUrl('teams'));

        if (!isMounted) {
          return;
        }

        setItems(normalizeItems(payload));
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load teams');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="container py-5">Loading teams...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-primary fw-semibold text-uppercase mb-1">Teams</p>
          <h1 className="h3 fw-bold mb-0">Team roster overview</h1>
        </div>
      </div>

      <div className="row g-4">
        {items.map((team) => (
          <div className="col-md-6" key={team._id ?? team.name}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5 fw-bold">{team.name ?? 'Unnamed team'}</h2>
                <p className="text-muted mb-3">Sport: {team.sport ?? '—'}</p>
                <p className="mb-2"><strong>Coach:</strong> {team.coach ?? '—'}</p>
                <p className="mb-0"><strong>Members:</strong> {Array.isArray(team.members) ? team.members.join(', ') : '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
