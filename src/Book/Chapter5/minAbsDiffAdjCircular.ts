/*
Given an array of integers, find minimum absolute difference of adjacent element consider
circular array.
*/

const minAbsDiffAdjCircular = (arr: number[]) => {
  const size = arr.length;
  if (size < 2) {
    return null;
  }
  let minDiff: number | null = null;
  for (let prev = 0; prev < size - 1; prev++) {
    const next = (prev + 1) % size;
    const currDiff = Math.abs(arr[next] - arr[prev]);
    if (minDiff === null || currDiff < minDiff) {
      minDiff = currDiff;
    }
  }
  return minDiff;
};
