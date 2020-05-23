/*
Given an array of integers, find if reversing a sub-array makes the array sorted.
*/

const checkReverse = (arr: number[]): boolean => {
  const size = arr.length;
  let start = -1;
  let end = -1;
  for (let index = 0; index < size - 1; index++) {
    if (arr[index] > arr[index + 1]) {
      start = index;
      break;
    }
  }
  if (start === -1) {
    //  배열의 배치가 \ 인 경우
    return true;
  }
  for (let index = start; index < size - 1; index++) {
    if (arr[index] < arr[index + 1]) {
      end = index;
      break;
    }
  }
  if (end === -1) {
    //  배열의 배치가 V인 경우
    return true;
  }
  if (arr[start - 1] > arr[end] || arr[end + 1] < arr[start]) {
    // 그림으로 파악해보자
    return false;
  }
  for (let index = end + 1; index < size - 1; index++) {
    if (arr[index] > arr[index + 1]) {
      return false;
    }
  }
  // 배열의 배치가 N인 경우
  return true;
};

(() => {
  const arr = [1, 3, 8, 5, 4, 3, 10, 11, 12, 18, 28];
  console.log(checkReverse(arr));
})();
