import { apiRequest } from './client';

const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_COUNT = 6;

function validateImages(files) {
  if (files.length > MAX_IMAGE_COUNT) throw new Error(`Du kannst maximal ${MAX_IMAGE_COUNT} Bilder hochladen.`);
  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error('Es sind nur JPEG-, PNG- und WebP-Bilder erlaubt.');
    if (file.size > MAX_IMAGE_SIZE_BYTES) throw new Error('Jedes Bild darf höchstens 5 MB groß sein.');
  }
}

export async function createVehicleListing({ vehicleType, payload, files }) {
  validateImages(files);
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
