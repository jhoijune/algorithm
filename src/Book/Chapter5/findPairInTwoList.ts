/*
Given two list X and Y. Find a pair of elements (Xi, yi) such that XiEX and YiEY where Xi+yi =
value.
*/

const findPairInTwoList1 = (
  X: number[],
  Y: number[],
  value: number
): boolean => {
  // time complexity O(n^2)
  for (const Xi of X) {
    for (const Yi of Y) {
      if (Xi + Yi === value) {
        console.log(`(${Xi},${Yi})`);
        return true;
      }
    }
  }
  return false;
};

const findPairInTwoList2 = (
  X: number[],
  Y: number[],
  value: number
): boolean => {
  // time complexity O(mlogm) or O(nlogm)
  // space complexity O(n+m)
  const sortedY = [...Y].sort((a, b) => a - b);
  const sizeY = sortedY.length;
  for (const Xi of X) {
    const diff = value - Xi;
    let low = 0;
    let high = sizeY - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (sortedY[mid] > diff) {
        high = mid - 1;
      } else if (sortedY[mid] < diff) {
        low = mid + 1;
      } else {
        console.log(`(${Xi},${diff})`);
        return true;
      }
    }
  }
  return false;
};

const findPairInTwoList3 = (
  X: number[],
  Y: number[],
  value: number
): boolean => {
  // time complexity O(n+m)
  // space complexity O(n) (n is small than m)
  const set: Set<number> = new Set();
  const sizeX = X.length;
  const sizeY = Y.length;
  const small = sizeX <= sizeY ? X : Y;
  const large = sizeX <= sizeY ? Y : X;
  for (const num of small) {
    set.add(num);
  }
  for (const num of large) {
    const diff = value - num;
    if (set.has(diff)) {
      console.log(`(${diff},${num})`);
      return true;
    }
  }
  return false;
};
