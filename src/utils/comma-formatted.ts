export const commaFormatted = (number: number | string): string => {
  const parts = `${number}`.split('.');
  return (
    parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? `.${parts[1]}` : '')
  );
};
