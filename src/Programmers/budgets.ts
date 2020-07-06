import {} from 'module';

const solution = (budgets: number[], M: number): number => {
  /**
   * 예산
   * time complexity: O(nlogn)
   */
  budgets.sort((a, b) => a - b);
  const size = budgets.length;
  let sum = 0;
  let limit = 0;
  for (let index = 0; index < size; index++) {
    const value = budgets[index];
    limit = value;
    while (sum + limit * (size - index) > M) {
      limit -= 1;
    }
    if (limit !== value) {
      break;
    }
    sum += value;
  }
  return limit;
};
