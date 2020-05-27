/*
Given an array of positive integers, you need to find if there is some range in array such that if
we add all the elements in that range then it became equal to given value.
*/

const subArraySums1 = (arr: number[], value: number) => {
  const size = arr.length;
  let upToSum = 0;
  for (let rightIndex = 0; rightIndex < size; rightIndex++) {
    upToSum += arr[rightIndex];
    let rangeSum = upToSum;
    let leftIndex = 0;
    if (rangeSum === value) {
      console.log(`values between index : ${leftIndex} ~ ${rightIndex}`);
      return true;
    }
    while (rangeSum > value && leftIndex < rightIndex) {
      rangeSum -= arr[leftIndex++];
      if (rangeSum === value) {
        console.log(`values between index : ${leftIndex} ~ ${rightIndex}`);
        return true;
      }
    }
  }
  return false;
};

const subArraySums2 = (arr: number[], value: number) => {
  const size = arr.length;
  let left = 0;
  let right = 0;
  let sum = arr[0];
  while (left < size && right < size) {
    if (sum === value) {
      console.log(`values between index : ${left} ~ ${right}`);
      return true;
    } else if (sum > value) {
      sum -= arr[left];
      left += 1;
    } else {
      right += 1;
      if (right < size) {
        sum += arr[right];
      }
    }
  }
  return false;
};

(() => {
  const arr = [1, 3, 4, 4, 6, 7, 7, 8, 8];
  subArraySums1(arr, 17);
})();
