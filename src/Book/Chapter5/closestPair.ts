/*
Given an array of positive integers and a number. You need to find a pair in array whose sum
is closest to given number.
*/

const closestPair1 = (arr: number[], value: number) => {
  // time complexity O(nlogn)
  // space complexity O(n)
  const size = arr.length;
  if (size < 2) {
    throw Error('Array length must be greater than 1');
  }
  const sorted = [...arr].sort((a, b) => a - b);
  let low = 0;
  let high = size - 1;
  const pairs = [sorted[low], sorted[high]];
  let closestSum = sorted[low] + sorted[high];
  while (low < high) {
    const currentSum = sorted[low] + sorted[high];
    if (Math.abs(value - currentSum) < Math.abs(value - closestSum)) {
      closestSum = currentSum;
      pairs[0] = sorted[low];
      pairs[1] = sorted[high];
    }
    if (currentSum === value) {
      break;
    } else if (currentSum < value) {
      low += 1;
    } else {
      high -= 1;
    }
  }
  return pairs;
};
