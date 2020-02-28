function useNumberFormat() {
  const format = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2
  });

  return format;
}

export default useNumberFormat;
