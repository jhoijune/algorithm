// Given an array of integers, find the element pair with minimum difference.

const findMinDiff1 = (arr: number[]) => {
  const size = arr.length;
  if (size < 2) {
    throw Error('Array length must be greater than 1');
  }
  const sorted = [...arr].sort((a, b) => a - b);
  const pairs = [sorted[0], sorted[1]];
  let minDiff = sorted[1] - sorted[0];
  for (let index = 1; index < size - 1; index++) {
    const left = arr[index];
    const right = arr[index + 1];
    if (right - left === 0) {
      return [left, right];
    } else {
      if (right - left < minDiff) {
        pairs[0] = left;
        pairs[1] = right;
        minDiff = right - left;
      }
    }
  }
  return pairs;
};
