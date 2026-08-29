import { apiRequest } from './client';

export function startConversation(vehicleType, listingId) {
  return apiRequest(`/vehicles/${vehicleType}/${listingId}/conversation`, { method: 'POST' });
}

export function getConversations() {
  return apiRequest('/conversations');
}

export function getConversationMessages(conversationId) {
  return apiRequest(`/conversations/${conversationId}/messages`);
}

export function sendConversationMessage(conversationId, content) {
  return apiRequest(`/conversations/${conversationId}/messages`, { method: 'POST', body: { content } });
}
