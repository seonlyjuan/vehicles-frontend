import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getConversationMessages, sendConversationMessage } from '../../api/messages';
import { blockUser } from '../../api/safety';
import { ReportContent } from '../../components/safety/ReportContent';
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

  async function handleBlock() {
    if (!result.conversation?.other_user_id || !window.confirm('Diesen Nutzer blockieren und die Unterhaltung schließen?')) return;
    try {
      await blockUser(result.conversation.other_user_id);
      setResult((current) => ({ ...current, conversation: { ...current.conversation, status: 'closed' } }));
    } catch (requestError) {
      setError(requestError.message);
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
        <div className="conversation-header-actions">
          {conversation?.other_user_id && (
            <ReportContent label="Nutzer melden" subject={{ subject_type: 'user', reported_user_id: conversation.other_user_id }} />
          )}
          {conversation?.other_user_id && <button className="general_button danger-button" type="button" onClick={handleBlock}>Blockieren</button>}
          <Link to="/messages"><button className="general_button">Zurück</button></Link>
        </div>
      </div>

      {error && <p className="error" role="alert">{error}</p>}
      {isLoading ? <p>Nachrichten werden geladen …</p> : (
        <div className="message-thread" aria-live="polite">
          {result.messages.length === 0 && <p className="messages-empty">Schreibe die erste Nachricht.</p>}
          {result.messages.map((message) => (
            <article className={`message-bubble ${message.sender_id === user.id ? 'message-own' : ''}`} key={message.id}>
              <p>{message.content}</p>
              <time dateTime={message.created_at}>{new Date(message.created_at).toLocaleString('de-CH')}</time>
              {message.sender_id && message.sender_id !== user.id && (
                <ReportContent label="Nachricht melden" subject={{ subject_type: 'message', message_id: message.id }} />
              )}
            </article>
          ))}
        </div>
      )}

      <form className="message-form" onSubmit={handleSubmit}>
        <label htmlFor="message">Nachricht</label>
        <textarea id="message" rows="3" maxLength={MAX_MESSAGE_LENGTH} value={content} onChange={(event) => setContent(event.target.value)} required disabled={conversation?.status === 'closed'} />
        <div className="message-form-footer">
          <small>{content.length}/{MAX_MESSAGE_LENGTH} Zeichen</small>
          <button className="general_button" type="submit" disabled={conversation?.status === 'closed' || isSending || !content.trim()}>{isSending ? 'Wird gesendet …' : 'Senden'}</button>
        </div>
      </form>
    </div>
  );
}
