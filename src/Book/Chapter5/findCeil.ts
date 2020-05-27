/*
Given a sorted array you need to find ceil or floor of an input value. A ceil is the value in array
which is just greater than the given input value. A floor is a value in array which is just smaller than the
given input value.
*/

const findCeil = (arr: number[], value: number) => {
  const size = arr.length;
  let low = 0;
  let high = size - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (
      arr[mid] === value ||
      (arr[mid] > value && (mid === 0 || arr[mid - 1] < value))
    ) {
      return arr[mid];
    } else if (arr[mid] > value) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
};
