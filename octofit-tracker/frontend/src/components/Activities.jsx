import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      const apiUrl = import.meta.env.VITE_CODESPACE_NAME
        ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
        : 'http://localhost:8000/api/activities/';

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      <h2 className="h4">Activities</h2>
      <ul className="list-group list-group-flush mt-3">
        {activities.map((activity) => (
          <li key={activity._id || activity.id || activity.type} className="list-group-item">
            <strong>{activity.type}</strong> — {activity.durationMinutes} min • {activity.calories} kcal
          </li>
        ))}
      </ul>
    </div>
  );
}
