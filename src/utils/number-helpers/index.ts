import 'intl';
import 'intl/locale-data/jsonp/en-NG';

const formatNumber = (value: number) => {
  return value ? new Intl.NumberFormat('en-NG', {}).format(value) : 0;
};

const formatCurrency = (value: number, symbol = '₦') => {
  return `${symbol} ${formatNumber(value)}`;
};

const truncateAndFormat = (integer: number, fraction: string) => {
  if (fraction.toString().length) {
    return `${formatNumber(integer)}.${fraction}`;
  }

  return formatNumber(integer);
};

const cleanNumberString = (value: string) => {
  let normalized = value.toString();

  //remove all chars except number and dot
  normalized = normalized.replace(/[^\d.]/g, '');

  //replace all dots except first
  let index = 0;
  const result = normalized.replace(/\./g, (item: string) => (!index++ ? item : ''));

  return result;
};

const addDecimal = (result: string | number, dpLimit?: number) => {
  if (!result) {
    return result;
  }

  if (result === '0') {
    return '0';
  }

  if (String(result).includes('e')) {
    const toBeReturned = (0).toFixed(dpLimit || 6);

    return String(toBeReturned);
  }

  const val = cleanNumberString(result.toString());

  if (val.includes('.')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const split: any = val.split('.');

    if (split[1]?.length) {
      let decimals = split[1];

      if (dpLimit) {
        decimals = decimals.substring(0, dpLimit);
      }
      const formatted = truncateAndFormat(+split[0], decimals);

      return formatted;
    }

    return `${formatNumber(+split[0])}.`;
  }

  return formatNumber(+result);
};

const separateNumbersWithComma = (num: number | string, min = 0, max = 6, options: object = {}) =>
  Number(num)?.toLocaleString(undefined, {
    ...options,
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });

export {
  formatNumber,
  formatCurrency,
  addDecimal,
  cleanNumberString,
  truncateAndFormat,
  separateNumbersWithComma,
};
