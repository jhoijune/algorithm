import {} from 'module';

const solution = (n: number) => {
  /**
   * 멀리 뛰기
   */
  if (n < 3) {
    return n;
  }
  let num1 = 1;
  let num2 = 2;
  let count = 2;
  while (count < n) {
    const sum = (num1 + num2) % 1234567;
    num1 = num2;
    num2 = sum;
    count += 1;
  }
  return num2;
};
