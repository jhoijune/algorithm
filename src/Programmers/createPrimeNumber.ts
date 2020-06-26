import {} from 'module';

const solution = (nums: number[]): number => {
  /**
   * 소수 만들기
   */
  const size = nums.length;
  let result = 0;
  for (let i = 0; i < size - 2; i++) {
    for (let j = i + 1; j < size - 1; j++) {
      for (let k = j + 1; k < size; k++) {
        const sum = nums[i] + nums[j] + nums[k];
        const limit = Math.floor(Math.sqrt(sum));
        let num = 2;
        while (num <= limit && sum % num !== 0) {
          num += 1;
        }
        if (num === limit + 1) {
          result += 1;
        }
      }
    }
  }
  return result;
};
