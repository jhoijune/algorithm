const reverse = function (arr: any[], start: number, end: number) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start += 1;
    end -= 1;
  }
};

const nextPermutation = function (nums: number[]): number[] {
  const size = nums.length;
  let left = size - 1;
  while (left > 0 && nums[left - 1] >= nums[left]) {
    left -= 1;
  }
  if (left === 0) {
    reverse(nums, 0, size - 1);
    return nums;
  }
  left -= 1;
  let selected = left + 1;
  for (let right = left + 1; right < size; right++) {
    if (nums[left] < nums[right] && nums[right] <= nums[selected]) {
      selected = right;
    }
  }
  [nums[left], nums[selected]] = [nums[selected], nums[left]];
  reverse(nums, left + 1, size - 1);
  return nums;
};
