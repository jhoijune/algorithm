import { range } from 'lodash';

const solution = (a: number, b: number): number => {
  /**
   * 두 정수 사이의 합
   * time complexity: O(|b-a|)
   * space complexity: O(1)
   */
  if (a > b) {
    [a, b] = [b, a];
  }
  let sum = 0;
  for (let num = a; num < b + 1; num++) {
    sum += num;
  }
  return sum;
};
