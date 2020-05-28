/*
Given an array of N non-negative integers. Each element of array represents a bar of
histogram. Considering that each bar is one unit wide. You need to find how much water can be
accommodate in the structure.
*/

const rainWater = (arr: number[]) => {
  const size = arr.length;
  const leftHigh = new Array<number>(size);
  const rightHigh = new Array<number>(size);
  leftHigh[0] = arr[0];
  rightHigh[size - 1] = arr[size - 1];
  for (let index = 1; index < size; index++) {
    if (leftHigh[index - 1] < arr[index]) {
      leftHigh[index] = arr[index];
    } else {
      leftHigh[index] = leftHigh[index - 1];
    }
    if (rightHigh[size - index] < arr[size - index - 1]) {
      rightHigh[size - index - 1] = arr[size - index - 1];
    } else {
      rightHigh[size - index - 1] = rightHigh[size - index];
    }
  }
  let water = 0;
  for (let index = 0; index < size; index++) {
    water += Math.min(leftHigh[index], rightHigh[index]) - arr[index];
  }
  return water;
};

(() => {
  const arr = [4, 0, 1, 5];
  console.log(rainWater(arr));
})();
