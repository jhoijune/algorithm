/*
A bitonic list comprises of an increasing sequence of integers immediately followed by a
decreasing sequence of integers.
INFO: bitonlic list: ^ 형태
*/

const findMaxBitonicArray = (arr: number[]) => {
  const size = arr.length;
  if (size < 3) {
    throw Error('Array length must be greater than 2');
  }
  let low = 0;
  let high = size - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid - 1] < arr[mid] && arr[mid + 1] < arr[mid]) {
      return mid;
    } else if (arr[mid - 1] < arr[mid] && arr[mid] < arr[mid + 1]) {
      low = mid + 1;
    } else if (arr[mid - 1] > arr[mid] && arr[mid] > arr[mid + 1]) {
      high = mid - 1;
    } else {
      break;
    }
  }
  return -1;
};
