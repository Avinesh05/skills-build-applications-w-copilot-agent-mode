import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      <h2 className="h4">Leaderboard</h2>
      <ul className="list-group list-group-flush mt-3">
        {entries.map((entry) => (
          <li key={entry._id || entry.id || entry.name} className="list-group-item">
            <strong>{entry.name}</strong> — {entry.points} pts • streak {entry.streak}
          </li>
        ))}
      </ul>
    </div>
  );
}
