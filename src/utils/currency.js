const formatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  return `${formatter.format(Number(value) || 0)} FCFA`;
}
