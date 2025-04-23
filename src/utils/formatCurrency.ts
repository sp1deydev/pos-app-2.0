export const formatVietnamCurrency = (data: number | string): string => {
  const cleanedData = data.toString().replace(/\./g, "");
  const formatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(Number(cleanedData))
    .trim();

  return formatted;
};

export const formatVietnamCurrency2 = (data: number | string): string => {
  const cleanedData = data.toString().replace(/\./g, "");
  const formatted = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  })
    .format(Number(cleanedData))
    .trim();

  return formatted;
};
