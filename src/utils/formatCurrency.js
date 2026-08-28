const chfFormatter = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
  minimumFractionDigits: 2,
});

export function formatCurrency(value) {
  return chfFormatter.format(Number(value));
}
