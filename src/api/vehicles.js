import { apiRequest } from './client';
import { validateVehicleImages } from '../utils/imageValidation';

export async function createVehicleListing({ vehicleType, payload, files }) {
  validateVehicleImages(files);
  const listing = await apiRequest(`/vehicles/${vehicleType}`, { method: 'POST', body: payload });

  if (files.length) {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    await apiRequest(`/vehicles/${vehicleType}/${listing.id}/images`, { method: 'POST', body: formData });
  }

  return listing;
}

export function getVehicleListings(vehicleType, page, filters = {}) {
  const query = new URLSearchParams({ page: String(page), per_page: '30' });
  Object.entries(filters).forEach(([name, value]) => {
    if (value !== '' && value !== null && value !== undefined) query.set(name, value);
  });
  return apiRequest(`/vehicles/${vehicleType}?${query.toString()}`);
}

export function getVehicleFilterMetadata(vehicleType) {
  return apiRequest(`/vehicles/${vehicleType}/filters`);
}

export function getVehiclePaymentStatus(vehicleType, vehicleId) {
  return apiRequest(`/vehicles/${vehicleType}/${vehicleId}/payment-status`);
}

export function publishVehicleListing(vehicleType, vehicleId) {
  return apiRequest(`/vehicles/${vehicleType}/${vehicleId}/publish`, { method: 'POST' });
}

export function getVehicleListing(vehicleType, vehicleId) {
  return apiRequest(`/vehicles/${vehicleType}/${vehicleId}`);
}

export function updateVehicleImageOrder(vehicleType, vehicleId, imageIds) {
  return apiRequest(`/vehicles/${vehicleType}/${vehicleId}/images/order`, {
    method: 'PUT',
    body: { image_ids: imageIds },
  });
}

export function getProfileListings() {
  return apiRequest('/profile/listings');
}

export function updateVehicleListing(vehicleType, vehicleId, payload) {
  return apiRequest(`/vehicles/${vehicleType}/${vehicleId}`, { method: 'PATCH', body: payload });
}

export function changeVehicleListingStatus(vehicleType, vehicleId, action) {
  return apiRequest(`/vehicles/${vehicleType}/${vehicleId}/status`, {
    method: 'PATCH',
    body: { action },
  });
}

export function deleteVehicleListing(vehicleType, vehicleId) {
  return apiRequest(`/vehicles/${vehicleType}/${vehicleId}`, { method: 'DELETE' });
}
