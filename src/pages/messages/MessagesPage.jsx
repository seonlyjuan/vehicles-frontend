import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getConversations } from '../../api/messages';
import { VEHICLE_TYPES } from '../../config/vehicleTypes';
import { subscribeToMessageNotifications } from '../../realtime/messages';

export function MessagesPage({ user }) {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    function loadConversations() {
      getConversations()
        .then((data) => {
          if (active) {
            setConversations(data);
            setError('');
          }
        })
        .catch((requestError) => { if (active) setError(requestError.message); })
        .finally(() => { if (active) setIsLoading(false); });
    }

    loadConversations();
    const unsubscribe = subscribeToMessageNotifications(user.id, loadConversations);

    return () => {
      active = false;
      unsubscribe();
    };
  }, [user.id]);

  const unreadCount = conversations.filter((conversation) => conversation.has_unread).length;

  return (
    <div className="card messages-card">
      <h2>Nachrichten</h2>
      <p className="intro">Deine Unterhaltungen zu Inseraten.</p>
      {unreadCount > 0 && (
        <p className="unread-summary" role="status">
          {unreadCount === 1 ? '1 neue Unterhaltung' : `${unreadCount} neue Unterhaltungen`}
        </p>
      )}
      {error && <p className="error" role="alert">{error}</p>}
      {isLoading ? (
        <p>Nachrichten werden geladen …</p>
      ) : conversations.length === 0 ? (
        <p className="messages-empty">Du hast noch keine Unterhaltungen.</p>
      ) : (
        <div className="conversation-list">
          {conversations.map((conversation) => (
            <Link className={`conversation-list-item ${conversation.has_unread ? 'conversation-unread' : ''}`} to={`/messages/${conversation.id}`} key={conversation.id}>
              <span className="conversation-emoji" aria-hidden="true">{VEHICLE_TYPES[conversation.vehicle_type]?.emoji}</span>
              <span>
                <strong>{conversation.listing_title}</strong>
                <small>{conversation.other_user ? `@${conversation.other_user}` : 'Nutzer'}</small>
              </span>
              {conversation.has_unread && <span className="unread-badge">Neu</span>}
              <time dateTime={conversation.updated_at}>{new Date(conversation.updated_at).toLocaleDateString('de-CH')}</time>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
