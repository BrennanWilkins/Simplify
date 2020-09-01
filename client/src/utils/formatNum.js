export const formatNum = num => {
  if (String(Math.floor(num)).length > 9) {
    return (num / 1000000000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 4 }) + 'B';
  }
  // returns number as comma separated number with max 2 decimals
  return Number(Number(num).toFixed(2)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
