import { apiRequest } from './client';

export function getNotifications() {
  return apiRequest('/notifications');
}

export function markAllNotificationsRead() {
  return apiRequest('/notifications/read', { method: 'POST' });
}

