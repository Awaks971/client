function useCurrency(currency = "EUR") {
  const money = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  });

  return money;
}

export default useCurrency;
