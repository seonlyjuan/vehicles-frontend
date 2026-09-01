import { apiRequest } from './client';

export function getCurrentTerms() {
  return apiRequest('/legal/terms/current');
}
