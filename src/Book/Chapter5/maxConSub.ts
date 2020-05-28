// Given an array of positive and negative integers, find maximum contiguous subarray in A.

const maxConSub = (arr: number[]): number => {
  let maxSum = 0;
  let currSum = 0;
  for (const value of arr) {
    currSum = Math.max(value, currSum + value);
    if (currSum < 0) {
      currSum = 0;
    }
    if (maxSum < currSum) {
      maxSum = currSum;
    }
  }
  return maxSum;
};
