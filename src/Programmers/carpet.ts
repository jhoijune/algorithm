import {} from 'module';

const solution = (brown: number, yellow: number) => {
  /**
   * 카펫
   * time complexity: O(√n*m)
   */
  const sum = brown + yellow;
  const limit = Math.floor(Math.sqrt(sum));
  for (let num = limit; num > 2; num--) {
    if (sum % num === 0) {
      const mod = sum / num;
      if (brown === (mod + num) * 2 - 4) {
        return [mod, num];
      }
    }
  }
  return [sum, 1];
};
