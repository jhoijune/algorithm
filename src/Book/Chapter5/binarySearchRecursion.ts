const binarySearchRecursionUtil = (
  arr: number[],
  value: number,
  low: number,
  high: number
): boolean => {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < value) {
      return binarySearchRecursionUtil(arr, value, mid + 1, high);
    } else if (arr[mid] > value) {
      return binarySearchRecursionUtil(arr, value, low, mid - 1);
    } else {
      return true;
    }
  }
  return false;
};

const binarySearchRecursion = (arr: number[], value: number) => {
  const size = arr.length;
  if (size === 0) {
    throw Error('Array is empty');
  }
  return binarySearchRecursionUtil(arr, value, 0, size - 1);
};
