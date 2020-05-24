/*
Given an array in which all the elements appear even number of times except one, which
appear odd number of times. Find the element which appear odd number of times.
*/

const oddCount = <T>(arr: T[]) => {
  const ht: Map<T, number> = new Map();
  for (const value of arr) {
    if (ht.has(value)) {
      const exCount = ht.get(value)!;
      ht.set(value, exCount + 1);
    } else {
      ht.set(value, 1);
    }
  }
  for (const value of ht.keys()) {
    if (ht.get(value)! % 2 === 1) {
      return value;
    }
  }
};
