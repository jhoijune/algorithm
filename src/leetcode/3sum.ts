const threeSum = (nums: number[]): number[][] => {
  const size = nums.length;
  nums.sort((a, b) => a - b);
  const answer: number[][] = [];
  for (let i = 0; i < size - 2; i++) {
    if (nums[i] > 0) {
      break;
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let j = i + 1;
    let k = size - 1;
    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];
      if (sum === 0) {
        answer.push([nums[i], nums[j], nums[k]]);
        j += 1;
        k -= 1;
        while (j < k && nums[j - 1] === nums[j]) {
          j += 1;
        }
        while (j < k && nums[k] === nums[k + 1]) {
          k -= 1;
        }
      } else if (sum > 0) {
        k -= 1;
      } else if (sum < 0) {
        j += 1;
      }
    }
  }
  return answer;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
