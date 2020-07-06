import {} from 'module';

const solution = (weight: number[]): number => {
  /**
   * 저울
   * time complexity:O(nlogn)
   */
  const size = weight.length;
  weight.sort((a, b) => a - b);
  let index = 0;
  let sum = 0;
  while (index < size - 1) {
    sum += weight[index];
    if (weight[index + 1] - sum <= 1) {
      index += 1;
    } else {
      return sum + 1;
    }
  }
  sum += weight[index];
  return sum + 1;
};
