import { apiRequest } from './client';

export function getReports(status = 'open') {
  return apiRequest(`/moderation/reports?status=${encodeURIComponent(status)}`);
}

export function decideReport(reportId, payload) {
  return apiRequest(`/moderation/reports/${reportId}`, { method: 'PATCH', body: payload });
}

export function getPendingDealers() {
  return apiRequest('/moderation/dealers');
}

export function decideDealer(userId, payload) {
  return apiRequest(`/moderation/dealers/${userId}`, { method: 'PATCH', body: payload });
}

export function getAppeals() {
  return apiRequest('/moderation/appeals');
}

export function decideAppeal(appealId, payload) {
  return apiRequest(`/moderation/appeals/${appealId}`, { method: 'PATCH', body: payload });
}
