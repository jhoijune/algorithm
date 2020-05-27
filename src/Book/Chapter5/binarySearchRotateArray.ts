/*
Given a sorted list S of N integer. S is rotated an unknown number of times. Find given value
in the array.
*/

const correctIndex = (index: number, size: number, startIndex: number) => {
  return (index + startIndex) % size;
};

const binarySearchRotateArray = (arr: number[], value: number) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === value) {
      return mid;
    }
    if (arr[mid] > arr[low]) {
      if (arr[low] < value && value < arr[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else {
      if (arr[mid] < value && value < arr[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }
  return -1;
};
