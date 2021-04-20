import {} from 'module';

const reverse = function (x: number) {
  const MAX_VALUE = Math.pow(2, 31) - 1; // 2147483647
  const MIN_VALUE = -Math.pow(2, 31); // -2147483648
  let answer = 0;
  const isPositive = x > 0;
  if (!isPositive) {
    x = -x;
  }
  while (x !== 0) {
    const rest = x % 10;
    x = Math.floor(x / 10);
    if (
      isPositive &&
      (answer > Math.floor(MAX_VALUE / 10) ||
        (answer === Math.floor(MAX_VALUE / 10) && rest > 7))
    ) {
      return 0;
    }
    if (
      !isPositive &&
      (answer > Math.floor(MAX_VALUE / 10) ||
        (answer === Math.floor(MAX_VALUE / 10) && rest > 8))
    ) {
      return 0;
    }
    answer = answer * 10 + rest;
  }
  return isPositive ? answer : -answer;
};

console.log(reverse(2147483646));
