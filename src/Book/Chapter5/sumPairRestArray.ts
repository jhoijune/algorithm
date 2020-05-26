/*
Given an array find if there is a pair whose sum is equal to the sum of rest of the elements of
the array.
*/

const sumPairRestArray = (arr: number[]): boolean => {
  // time complexity O(nlogn)
  // space complexity O(n)
  const size = arr.length;
  if (size < 3) {
    throw Error('Array length must be greater than 2');
  }
  const halfSum = arr.reduce((prev, current) => prev + current, 0) / 2;
  const sorted = [...arr].sort((a, b) => a - b);
  let low = 0;
  let high = size - 1;
  while (low < high) {
    const currentSum = sorted[low] + sorted[high];
    if (currentSum === halfSum) {
      console.log(`(${sorted[low]},${sorted[high]})`);
      return true;
    } else if (currentSum < halfSum) {
      low += 1;
    } else {
      high -= 1;
    }
  }
  return false;
};
