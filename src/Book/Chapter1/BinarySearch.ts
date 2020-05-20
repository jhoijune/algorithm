const BinarySearch = (arr: number[], value: number): number => {
  const size = arr.length;
  let mid: number;
  let low = 0;
  let high = size - 1;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (arr[mid] === value) {
      return mid;
    } else {
      if (arr[mid] < value) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }
  return -1;
};
