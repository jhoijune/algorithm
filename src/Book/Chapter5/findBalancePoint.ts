/*
Given an array, you need to find balance point or balance index. An index is balanced index if
the element in the left of it and elements in the right of it have same sum.
*/

const findBalancePoint = (arr: number[]) => {
  const size = arr.length;
  const sum = arr.reduce((prev, curr) => prev + curr, 0);
  let leftSum = 0;
  for (let index = 0; index < size; index++) {
    const value = arr[index];
    const rightSum = sum - value - leftSum;
    if (leftSum === rightSum) {
      return index;
    } else if (leftSum > rightSum) {
      return -1;
    }
    leftSum += value;
  }
  return -1;
};
