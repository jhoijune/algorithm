import {} from 'module';

const solution = (n: number): number => {
  /**
   * 정수 내림차순으로 배치하기
   * time complexity: O(klogk) (k: 자릿수)
   * space complexity: O(k)
   */
  const numbers: number[] = [];
  while (n > 0) {
    numbers.push(n % 10);
    n = Math.floor(n / 10);
  }
  numbers.sort((a, b) => b - a);
  return Number.parseInt(numbers.join(''));
};
