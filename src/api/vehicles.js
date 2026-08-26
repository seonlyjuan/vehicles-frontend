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

export function getVehicleListings(vehicleType, page) {
  return apiRequest(`/vehicles/${vehicleType}?page=${page}&per_page=30`);
}
