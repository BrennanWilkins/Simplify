export const formatDate = date => {
  date = date.split('-');
  let m = date[1].charAt(0) === '0' ? date[1].slice(1) : date[1];
  let d = date[2].charAt(0) === '0' ? date[2].slice(1) : date[2];
  let y = date[0] === String(new Date().getFullYear()) ? date[0].slice(2) : date[0];
  return [m, d, y].join('/');
};

export const formatDate2 = date => {
  let y = date.getFullYear();
  let m = '' + (date.getMonth() + 1);
  if (m.length < 2) { m = '0' + m; }
  let d = '' + date.getDate();
  if (d.length < 2) { d = '0' + d; }
  return [y, m, d].join('-');
}
