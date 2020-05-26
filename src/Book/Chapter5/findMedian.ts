// Given two sorted lists. Find the median of the arrays if they are combined to form a bigger list.
const findMedian = (arr1: number[], arr2: number[]): number => {
  const size1 = arr1.length;
  const size2 = arr2.length;
  const breakCount = Math.floor((size1 + size2) / 2) + 1;
  let first = 0;
  let second = 0;
  let count = 0;
  while (count < breakCount) {
    if (second === size2 || (first < size1 && arr1[first] < arr2[second])) {
      first += 1;
    } else {
      second += 1;
    }
    count += 1;
  }
  const result: number[] = [];
  const maxCount = (size1 + size2) % 2 === 0 ? 2 : 1;
  for (let count = 0; count < maxCount; count++) {
    if (second < 1 || (first > 0 && arr1[first - 1] > arr2[second - 1])) {
      result.push(arr1[first - 1]);
      first -= 1;
    } else {
      result.push(arr2[second - 1]);
      second -= 1;
    }
  }
  return result.reduce((prev, curr) => prev + curr, 0) / result.length;
};

(() => {
  const first = [10, 10, 5, 7, 9, 11];
  const second = [12, 8, 5, 3, 10];
  first.sort((a, b) => a - b);
  second.sort((a, b) => a - b);
  console.log(`median value is : : ${findMedian(first, second)} `);
})();
