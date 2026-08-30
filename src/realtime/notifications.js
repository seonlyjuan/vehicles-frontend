import { createSubscription } from './subscriptions';

export function subscribeToPlatformNotifications(userId, onChange) {
  return createSubscription(
    `platform-notifications:${userId}`,
    'user_notifications',
    `recipient_id=eq.${userId}`,
    onChange,
  );
}

