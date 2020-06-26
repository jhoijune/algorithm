import {} from 'module';

const solution = (s: string): string => {
  /**
   * 최댓값과 최솟값
   * time complexity: O(n)
   * space complexity: O(n)
   */
  const numbers = s.split(/\s/g);
  let min = Infinity;
  let max = -Infinity;
  for (const strNumber of numbers) {
    const number = Number.parseInt(strNumber);
    if (number < min) {
      min = number;
    }
    if (number > max) {
      max = number;
    }
  }
  return `${min} ${max}`;
};
