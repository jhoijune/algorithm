const threeSumClosest = (nums: number[], target: number): number => {
  const size = nums.length;
  nums.sort((a, b) => a - b);
  let answer = nums[0] + nums[1] + nums[2];
  for (let i = 0; i < size - 2; i++) {
    let j = i + 1;
    let k = size - 1;
    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];
      const diff = sum - target;
      if (Math.abs(answer - target) > Math.abs(diff)) {
        answer = sum;
      }
      if (diff > 0) {
        k -= 1;
      } else if (diff < 0) {
        j += 1;
      } else {
        return target;
      }
    }
  }
  return answer;
};

console.log(threeSumClosest([0, 0, 0], 1));
