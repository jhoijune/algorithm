const isDecimal = function (s: string): boolean {
  let curr = s;
  if (/[+-]/.test(curr[0])) {
    curr = curr.slice(1);
  }
  return (
    /^\d+\.$/.test(curr) || /^\d+\.\d+$/.test(curr) || /^\.\d+$/.test(curr)
  );
};

const isInteger = function (s: string): boolean {
  let curr = s;
  if (/[+-]/.test(curr[0])) {
    curr = curr.slice(1);
  }
  return /^\d+$/.test(curr);
};

const isNumber = function (s: string): boolean {
  const splited = s.split(/e/gi);
  if (splited.length > 2) {
    return false;
  }
  const front = isDecimal(splited[0]) || isInteger(splited[0]);
  if (splited.length === 1) {
    return front;
  }
  return front && isInteger(splited[1]);
};
