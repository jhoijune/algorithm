import {} from 'module';

const combination = (n: number, k: number) => {
  if (k === 0) {
    return 1;
  }
  if (n - k < k) {
    k = n - k;
  }
  let result = 1;
  let count = 1;
  while (count <= k) {
    result *= n + 1 - count;
    result /= count;
    count += 1;
  }
  return result;
};

const solution = (n: number) => {
  /**
   * TODO: 한계 파악
   * 불가능함  n이 너무커지면 n!이 infinity가 되고 time complexity가 너무 큼
   */
  let vertical = n;
  let horizontal = 0;
  let result = 0;
  while (vertical >= 0) {
    result += combination(vertical + horizontal, horizontal);
    vertical -= 2;
    horizontal += 1;
  }
  return result % 1000000007;
};

const solution2 = (n: number) => {
  /**
   * 2 x n 타일링
   * time complexity: O(n)
   */
  if (n < 3) {
    return n;
  }
  let a = 1;
  let b = 2;
  for (let count = 3; count <= n; count++) {
    const sum = (a + b) % 1000000007;
    a = b;
    b = sum;
  }
  return b % 1000000007;
};
