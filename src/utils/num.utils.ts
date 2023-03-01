export const toDecimalWith2ndPlace = (x: string): string => {
  const f = parseFloat(x);
  if (isNaN(f)) {
    throw new Error('Cannot convert a non-number type!');
  }
  const r = Math.round(f * 100) / 100;
  let s = r.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
};
