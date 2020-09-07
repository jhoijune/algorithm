import { readFileSync } from 'fs';

const searchRange = function (nums: number[], target: number) {
  const size = nums.length;
  let low = 0;
  let high = size - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) {
      let min = mid;
      let max = mid;
      while (min > 0 && nums[min - 1] === target) {
        min -= 1;
      }
      while (max < size - 1 && nums[max + 1] === target) {
        max += 1;
      }
      return [min, max];
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else if (nums[mid] > target) {
      high = mid - 1;
    }
  }
  return [-1, -1];
};
