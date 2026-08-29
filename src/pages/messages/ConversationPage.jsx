import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getConversationMessages, sendConversationMessage } from '../../api/messages';
import { subscribeToConversationMessages } from '../../realtime/messages';

const MAX_MESSAGE_LENGTH = 1000;

export function ConversationPage({ user }) {
  const { conversationId } = useParams();
  const [result, setResult] = useState({ conversation: null, messages: [] });
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    function loadMessages() {
      getConversationMessages(conversationId)
        .then((data) => {
          if (active) {
            setResult(data);
            setError('');
          }
        })
        .catch((requestError) => { if (active) setError(requestError.message); })
        .finally(() => { if (active) setIsLoading(false); });
    }

    loadMessages();
    const unsubscribe = subscribeToConversationMessages(conversationId, loadMessages);

    return () => {
      active = false;
      unsubscribe();
    };
  }, [conversationId]);

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedContent = content.trim();
    if (!normalizedContent) return;
    setIsSending(true);
    setError('');
    try {
      const message = await sendConversationMessage(conversationId, normalizedContent);
      setContent('');
      setResult((current) => current.messages.some((item) => item.id === message.id)
        ? current
        : { ...current, messages: [...current.messages, message] });
    } catch (sendError) {
      setError(sendError.message);
    } finally {
      setIsSending(false);
    }
  }

  const conversation = result.conversation;
  return (
    <div className="card conversation-card">
      <div className="conversation-header">
        <div>
          <h2>{conversation?.listing_title ?? 'Unterhaltung'}</h2>
          {conversation && <p>{conversation.other_user ? `@${conversation.other_user}` : 'Nutzer'}</p>}
        </div>
        <Link to="/messages"><button className="general_button">Zurück</button></Link>
      </div>

      {error && <p className="error" role="alert">{error}</p>}
      {isLoading ? <p>Nachrichten werden geladen …</p> : (
        <div className="message-thread" aria-live="polite">
          {result.messages.length === 0 && <p className="messages-empty">Schreibe die erste Nachricht.</p>}
          {result.messages.map((message) => (
            <article className={`message-bubble ${message.sender_id === user.id ? 'message-own' : ''}`} key={message.id}>
              <p>{message.content}</p>
              <time dateTime={message.created_at}>{new Date(message.created_at).toLocaleString('de-CH')}</time>
            </article>
          ))}
        </div>
      )}

      <form className="message-form" onSubmit={handleSubmit}>
        <label htmlFor="message">Nachricht</label>
        <textarea id="message" rows="3" maxLength={MAX_MESSAGE_LENGTH} value={content} onChange={(event) => setContent(event.target.value)} required />
        <div className="message-form-footer">
          <small>{content.length}/{MAX_MESSAGE_LENGTH} Zeichen</small>
          <button className="general_button" type="submit" disabled={isSending || !content.trim()}>{isSending ? 'Wird gesendet …' : 'Senden'}</button>
        </div>
      </form>
    </div>
  );
}
