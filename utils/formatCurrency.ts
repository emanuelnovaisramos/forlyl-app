export const formatCurrency = (value: number) => {
  if (value === null || value === undefined) return "";

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
