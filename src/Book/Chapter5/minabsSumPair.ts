/*
In given List of integers, both +ve and -ve. You need to find the two elements such that their
sum is closest to zero.
*/

const minabsSumPair = (arr: number[]) => {
  // time complexity O(nlogn)
  // space complexity O(n)
  const size = arr.length;
  if (size < 2) {
    throw Error('Array length must be greater than 2');
  }
  const sorted = [...arr].sort((a, b) => a - b);
  let minFirst = 0;
  let minSecond = size - 1;
  let minSum = Math.abs(sorted[minFirst] + sorted[minSecond]);
  for (let l = 0, r = size - 1; l < r; ) {
    const sum = arr[l] + arr[r];
    if (Math.abs(sum) < minSum) {
      minSum = Math.abs(sum);
      minFirst = l;
      minSecond = r;
    }
    if (sum < 0) {
      l += 1;
    } else if (sum > 0) {
      r -= 1;
    } else {
      break;
    }
    return [minFirst, minSecond];
  }
};
