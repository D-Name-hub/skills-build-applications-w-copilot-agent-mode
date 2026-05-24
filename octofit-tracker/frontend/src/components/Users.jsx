import { useEffect, useState } from 'react';
import { fetchJson, getApiUrl, normalizeItems } from '../api.js';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const payload = await fetchJson(getApiUrl('users'));

        if (!isMounted) {
          return;
        }

        setItems(normalizeItems(payload));
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load users');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="container py-5">Loading users...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-primary fw-semibold text-uppercase mb-1">Users</p>
          <h1 className="h3 fw-bold mb-0">Community members</h1>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Age</th>
              <th>Goals</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user._id ?? user.username}>
                <td>{user.username ?? 'Unknown'}</td>
                <td>{user.email ?? '—'}</td>
                <td>{user.role ?? '—'}</td>
                <td>{user.age ?? '—'}</td>
                <td>{Array.isArray(user.goals) ? user.goals.join(', ') : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
