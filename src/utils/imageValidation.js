const MAX_IMAGE_COUNT = 6;
const MAX_IMAGE_SIZE_BYTES = 12 * 1024 * 1024;
const MAX_TOTAL_IMAGE_SIZE_BYTES = MAX_IMAGE_COUNT * MAX_IMAGE_SIZE_BYTES;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);
const ALLOWED_IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif']);

function hasAllowedType(file) {
  const extension = file.name.split('.').pop()?.toLowerCase();
  return ALLOWED_IMAGE_TYPES.has(file.type) || ALLOWED_IMAGE_EXTENSIONS.has(extension);
}

export function validateVehicleImages(files) {
  if (files.length > MAX_IMAGE_COUNT) throw new Error(`Du kannst maximal ${MAX_IMAGE_COUNT} Bilder hochladen.`);

  let totalSize = 0;
  for (const file of files) {
    if (!hasAllowedType(file)) throw new Error('Es sind nur JPEG-, PNG-, WebP-, HEIC- und HEIF-Bilder erlaubt.');
    if (file.size > MAX_IMAGE_SIZE_BYTES) throw new Error('Jedes Bild darf höchstens 12 MB groß sein.');
    totalSize += file.size;
  }
  if (totalSize > MAX_TOTAL_IMAGE_SIZE_BYTES) throw new Error('Alle Bilder zusammen dürfen höchstens 72 MB groß sein.');
}
