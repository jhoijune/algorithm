import {} from 'module';

const solution = (N: number) => {
  /**
   * 타일 장식물
   * time complexity: O(n)
   */
  let a = 1;
  let b = 1;
  let count = 1;
  while (count < N) {
    const sum = a + b;
    a = b;
    b = sum;
    count += 1;
  }
  return (a + b) * 2;
};
