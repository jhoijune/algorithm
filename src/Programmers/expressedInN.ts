import {} from 'module';

const solution = (N: number, n: number) => {
  /**
   * N으로 표현
   * time complexity: O(7^8)
   * space complexity: O(7^8)
   */
  const aux = Array.from(Array(8), () => new Set<number>());
  let count = 1;
  while (count <= 8) {
    aux[count - 1].add(Number(String(N).repeat(count)));
    for (let i = 1; i <= Math.floor(count / 2); i++) {
      const num1s = aux[i - 1];
      const num2s = aux[count - i - 1];
      for (const num1 of num1s.keys()) {
        for (const num2 of num2s.keys()) {
          aux[count - 1].add(num1 + num2);
          aux[count - 1].add(num1 - num2);
          aux[count - 1].add(num2 - num1);
          aux[count - 1].add(Math.floor(num1 / num2));
          aux[count - 1].add(Math.floor(num2 / num1));
          aux[count - 1].add(num1 * num2);
        }
      }
    }
    for (const num of aux[count - 1].keys()) {
      if (num === n) {
        return count;
      }
    }
    count += 1;
  }
  return -1;
};
