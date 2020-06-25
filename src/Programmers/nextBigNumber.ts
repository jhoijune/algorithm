import {} from 'module';

const numberOfBinary1 = (n: number): number => {
  let result = 0;
  while (n > 0) {
    const div = n % 2;
    if (div === 1) {
      result += 1;
    }
    n = Math.floor(n / 2);
  }
  return result;
};

const solution = (n: number): number => {
  /**
   * 다음 큰 숫자
   */
  const length1 = numberOfBinary1(n);
  let num = n + 1;
  while (true) {
    const temp = numberOfBinary1(num);
    if (temp === length1) {
      break;
    }
    num += 1;
  }
  return num;
};
