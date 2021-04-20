import { entries } from 'lodash';

const myAtoi = function (s: string): number {
  const MAX_VALUE = Math.pow(2, 31) - 1; // 2147483647
  const MIN_VALUE = -Math.pow(2, 31); // -2147483648
  const size = s.length;
  let step = 1;
  let answer = 0;
  let curr = 0;
  let isPositive = true;
  while (curr < size && step < 4) {
    switch (step) {
      case 1:
        if (s[curr] !== ' ') {
          step += 1;
        } else {
          break;
        }
      case 2:
        step += 1;
        if (s[curr] === '-') {
          isPositive = false;
          break;
        } else if (s[curr] === '+') {
          break;
        }
      case 3:
        if (/\d/.test(s[curr])) {
          const number = parseInt(s[curr]);
          if (
            isPositive &&
            (answer > Math.floor(MAX_VALUE / 10) ||
              (answer === Math.floor(MAX_VALUE / 10) && number > 7))
          ) {
            return MAX_VALUE;
          } else if (
            !isPositive &&
            (answer > Math.floor(MAX_VALUE / 10) ||
              (answer === Math.floor(MAX_VALUE / 10) && number > 8))
          ) {
            return MIN_VALUE;
          }
          answer = 10 * answer + number;
        } else {
          step += 1;
        }
    }
    curr += 1;
  }
  return isPositive ? answer : -answer;
};
