export const formatNum = num => {
  // returns number as comma separated number with max 2 decimals
  return Number(Number(num).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
