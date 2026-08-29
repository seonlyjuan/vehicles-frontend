import { supabase } from '../lib/supabase';

function createSubscription(channelName, table, filter, onChange) {
  if (!supabase) return () => {};

  const channel = supabase
    .channel(channelName)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table,
      filter,
    }, onChange)
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}

export function subscribeToMessageNotifications(userId, onChange) {
  return createSubscription(
    `message-notifications:${userId}`,
    'message_notifications',
    `recipient_id=eq.${userId}`,
    onChange,
  );
}

export function subscribeToConversationMessages(conversationId, onChange) {
  return createSubscription(
    `conversation-messages:${conversationId}`,
    'messages',
    `conversation_id=eq.${conversationId}`,
    onChange,
  );
}
