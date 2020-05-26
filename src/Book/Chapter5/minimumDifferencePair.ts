// Given two arrays, find minimum difference pair such that it should take one element from each array.

const minimumDifferencePair = (arr1: number[], arr2: number[]) => {
  // time complexity O(nlogn + mlogm)
  // space complexity O(n+m)
  const size1 = arr1.length;
  const size2 = arr2.length;
  const sorted1 = [...arr1].sort((a, b) => a - b);
  const sorted2 = [...arr2].sort((a, b) => a - b);
  let first = 0;
  let second = 0;
  const pairs = [sorted1[first], sorted2[second]];
  let minDiff = Math.abs(pairs[1] - pairs[0]);
  while (first < size1 && second < size2) {
    const diff = Math.abs(sorted1[first] - sorted2[second]);
    if (diff === 0) {
      return [sorted1[first], sorted2[second]];
    }
    if (diff < minDiff) {
      minDiff = diff;
      pairs[0] = sorted1[first];
      pairs[1] = sorted2[second];
    }
    if (sorted1[first] < sorted2[second]) {
      first += 1;
    } else {
      second += 1;
    }
  }
  return pairs;
};
