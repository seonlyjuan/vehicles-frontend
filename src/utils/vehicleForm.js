export const EMPTY_VEHICLE_FORM = {
  title: '',
  brand: '',
  model: '',
  year: '',
  power: '',
  mileage: '',
  first_registration: '',
  condition: 'used',
  known_defects: '',
  price: '',
  postal_code: '',
  locality: '',
  canton: '',
  description: '',
};

export function listingToVehicleForm(listing) {
  return Object.fromEntries(
    Object.keys(EMPTY_VEHICLE_FORM).map((key) => [key, listing?.[key] ?? EMPTY_VEHICLE_FORM[key]]),
  );
}

export function toVehiclePayload(values, configuration) {
  return {
    title: values.title,
    brand: values.brand,
    model: configuration.fields.model ? values.model || null : null,
    year: configuration.fields.year && values.year ? Number(values.year) : null,
    power: configuration.fields.power && values.power ? Number(values.power) : null,
    mileage: configuration.fields.power && values.mileage ? Number(values.mileage) : null,
    first_registration: configuration.fields.power && values.first_registration ? values.first_registration : null,
    condition: values.condition,
    known_defects: values.known_defects || null,
    price: Number(values.price),
    postal_code: values.postal_code,
    locality: values.locality,
    canton: values.canton,
    description: values.description || null,
  };
}
