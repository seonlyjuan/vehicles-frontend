import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getNotifications, markAllNotificationsRead } from '../../api/notifications';

export function NotificationsPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getNotifications()
      .then((result) => {
        if (!active) return;
        setItems(result.items);
        return markAllNotificationsRead();
      })
      .catch((requestError) => { if (active) setError(requestError.message); });
    return () => { active = false; };
  }, []);

  return (
    <div className="card notifications-card">
      <h2>Hinweise</h2>
      {error && <p className="error" role="alert">{error}</p>}
      {items.length === 0 ? <p>Keine Hinweise vorhanden.</p> : (
        <div className="notification-list">
          {items.map((item) => (
            <article className={item.read_at ? '' : 'notification-unread'} key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <time dateTime={item.created_at}>{new Date(item.created_at).toLocaleString('de-CH')}</time>
              {item.link && <Link to={item.link}>Öffnen</Link>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

