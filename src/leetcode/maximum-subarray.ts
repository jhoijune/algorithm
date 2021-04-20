const maxSubArray = function (nums: number[]): number {
  const size = nums.length;
  let currSum = nums[0];
  let answer = currSum;
  for (let index = 1; index < size; index++) {
    if (currSum + nums[index] < nums[index]) {
      currSum = nums[index];
    } else {
      currSum += nums[index];
    }
    answer = Math.max(answer, currSum);
  }
  return answer;
};
