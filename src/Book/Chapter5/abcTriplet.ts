/*
Given an array of integers, you need to find a triplet such that sum of two elements of triplet is
equal to the third value. We need to find triplet (A, B, C) such that A+B = C.
*/

const abcTriplet1 = (arr: number[]): boolean => {
  // time complexity O(nlogn)
  // space complexity O(n)
  const size = arr.length;
  if (size < 3) {
    throw Error('Array length must be greater than 2');
  }
  const sorted = [...arr].sort((a, b) => a - b);
  for (let third = size - 1; third > 1; third--) {
    let first = 0;
    let second = third - 1;
    const C = sorted[third];
    while (first < second) {
      const sum = sorted[first] + sorted[second];
      if (sum === C) {
        console.log(`(${sorted[first]},${sorted[second]},${sorted[third]})`);
        return true;
      } else if (sum < C) {
        first += 1;
      } else {
        second -= 1;
      }
    }
  }
  return false;
};
