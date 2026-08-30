import { apiRequest } from './client';

export function searchPostalCodes(query) {
  return apiRequest(`/locations/postal-codes?query=${encodeURIComponent(query)}`);
}
