import { apiRequest } from './client';

export function updateSellerProfile(payload) {
  return apiRequest('/profile/seller', { method: 'PUT', body: payload });
}

export function getAccountExport() {
  return apiRequest('/profile/export');
}

export function deleteAccount() {
  return apiRequest('/profile', {
    method: 'DELETE',
    body: { confirmation: 'KONTO LÖSCHEN' },
  });
}
