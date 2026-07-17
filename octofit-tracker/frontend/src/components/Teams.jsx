import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrl('teams'));
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      <h2 className="h4">Teams</h2>
      <ul className="list-group list-group-flush mt-3">
        {teams.map((team) => (
          <li key={team._id || team.id || team.name} className="list-group-item">
            <strong>{team.name}</strong> — {team.focus} • {team.members} members
          </li>
        ))}
      </ul>
    </div>
  );
}
