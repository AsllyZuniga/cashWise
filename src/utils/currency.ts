export const formatCurrency = (value: number): string =>
  `$${Math.round(value).toLocaleString("es-CO")}`;
