export const formatter = (currency: string, value: number): string => {
  return new Intl.NumberFormat("ru-Ru", { style: "currency", currency }).format(value);
};
