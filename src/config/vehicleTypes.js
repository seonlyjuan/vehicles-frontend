export const VEHICLE_TYPES = {
  bicycles: {
    emoji: '\u{1F6B2}',
    label: 'Fahrräder',
    detailLabel: 'Fahrrad',
    listingTitle: 'Fahrrad-Listings',
    listingPath: '/vehicles/bicycles/listing',
    createTitle: 'Neues Fahrrad-Inserat',
    fields: { model: true, modelRequired: false, year: true, power: false },
  },
  cars: {
    emoji: '\u{1F697}',
    label: 'Autos',
    detailLabel: 'Auto',
    listingTitle: 'Auto-Listings',
    listingPath: '/vehicles/cars/listing',
    createTitle: 'Neues Auto-Inserat',
    fields: { model: true, modelRequired: true, year: true, power: true },
  },
  motorbikes: {
    emoji: '\u{1F3CD}\u{FE0F}',
    label: 'Motorräder',
    detailLabel: 'Motorrad',
    listingTitle: 'Motorrad-Listings',
    listingPath: '/vehicles/motorbikes/listing',
    createTitle: 'Neues Motorrad-Inserat',
    fields: { model: true, modelRequired: true, year: true, power: true },
  },
};
