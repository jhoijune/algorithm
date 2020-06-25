import {} from 'module';

const solution = (numbers: number[], target: number): number => {
  /**
   * 타겟 넘버
   * time complexity: O(2^n)
   */
  const size = numbers.length;
  const util = (index: number, curr: number): number => {
    if (index === size) {
      if (curr === target) {
        return 1;
      }
      return 0;
    }
    const case1 = util(index + 1, curr + numbers[index]);
    const case2 = util(index + 1, curr - numbers[index]);
    return case1 + case2;
  };
  return util(0, 0);
};

console.log(solution([1, 1, 1, 1, 1], 3));
