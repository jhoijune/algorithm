const searchInsert = function (nums: number[], target: number) {
  const size = nums.length;
  let left = 0;
  let right = size - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  const mid = Math.floor((left + right) / 2);
  if (nums[mid] >= target) {
    return mid;
  } else {
    return mid + 1;
  }
};
