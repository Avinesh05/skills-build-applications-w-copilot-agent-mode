import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'));
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      <h2 className="h4">Workouts</h2>
      <ul className="list-group list-group-flush mt-3">
        {workouts.map((workout) => (
          <li key={workout._id || workout.id || workout.title} className="list-group-item">
            <strong>{workout.title}</strong> — {workout.focus} • {workout.durationMinutes} min
          </li>
        ))}
      </ul>
    </div>
  );
}
