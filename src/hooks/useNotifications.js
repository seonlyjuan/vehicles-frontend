import { useEffect, useState } from 'react';

import { getNotifications } from '../api/notifications';
import { subscribeToPlatformNotifications } from '../realtime/notifications';

export function useNotifications(userId) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let active = true;
    function load() {
      getNotifications()
        .then((result) => { if (active) setUnreadCount(result.unread_count); })
        .catch(() => {});
    }
    load();
    const unsubscribe = subscribeToPlatformNotifications(userId, load);
    return () => {
      active = false;
      unsubscribe();
    };
  }, [userId]);

  return unreadCount;
}

