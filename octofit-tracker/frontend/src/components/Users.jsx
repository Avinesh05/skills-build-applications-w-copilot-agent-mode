import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getApiUrl('users'));
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      <h2 className="h4">Users</h2>
      <ul className="list-group list-group-flush mt-3">
        {users.map((user) => (
          <li key={user._id || user.id || user.name} className="list-group-item">
            <strong>{user.name}</strong> — {user.role || user.fitnessGoal}
          </li>
        ))}
      </ul>
    </div>
  );
}
