export const VEHICLE_CONDITIONS = [
  { value: 'new', label: 'Neu' },
  { value: 'used', label: 'Gebraucht' },
  { value: 'damaged', label: 'Beschädigt / reparaturbedürftig' },
];

export function getVehicleConditionLabel(value) {
  return VEHICLE_CONDITIONS.find((condition) => condition.value === value)?.label ?? value;
}
