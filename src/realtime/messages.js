import { createSubscription } from './subscriptions';

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
