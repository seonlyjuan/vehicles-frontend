import { apiRequest } from './client';

export function getBlockedUsers() {
  return apiRequest('/safety/blocks');
}

export function blockUser(userId) {
  return apiRequest('/safety/blocks', { method: 'POST', body: { user_id: userId } });
}

export function unblockUser(userId) {
  return apiRequest(`/safety/blocks/${userId}`, { method: 'DELETE' });
}

export function reportContent(payload) {
  return apiRequest('/safety/reports', { method: 'POST', body: payload });
}

export function getModerationDecisions() {
  return apiRequest('/safety/moderation-decisions');
}

export function createAppeal(reportId, statement) {
  return apiRequest('/safety/appeals', {
    method: 'POST',
    body: { report_id: reportId, statement },
  });
}
