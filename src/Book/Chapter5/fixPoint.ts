/*
Given a sorted array of distinct integers, you need to find the fix point. Fix point is an index of
array in which index and value is same.
*/

const fixPoint = (arr: number[]) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === mid) {
      return mid;
    } else if (arr[mid] < mid) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
};
