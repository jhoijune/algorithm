/*
In given list of O's and 1's in which all the O's come before 1's. Write an algorithm to find the
index of the first 1.
*/

const binarySearch01 = (arr: number[]) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === 1) {
      if (mid === low || arr[mid - 1] === 0) {
        return mid;
      } else {
        high = mid - 1;
      }
    } else {
      low = mid + 1;
    }
  }
  return -1;
};

(() => {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  console.log(binarySearch01(arr));
})();
