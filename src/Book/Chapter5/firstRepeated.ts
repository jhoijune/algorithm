// Given an unsorted list of n elements, find the first element, which is repeated.

const firstRepeated = <T>(arr: T[]) => {
  const size = arr.length;
  for (let i = 0; i < size - 1; i++) {
    const value = arr[i];
    for (let j = i + 1; j < size; j++) {
      if (arr[j] === value) {
        return value;
      }
    }
  }
  return null;
};

const firstRepeated2 = <T>(arr: T[]) => {
  const ht: Map<T, number> = new Map();
  for (const value of arr) {
    if (ht.has(value)) {
      const exCount = ht.get(value)!;
      ht.set(value, exCount + 1);
    } else {
      ht.set(value, 1);
    }
  }
  for (const value of arr) {
    if (ht.get(value)! > 1) {
      return value;
    }
  }
  return null;
};

(() => {
  const arr = [7, 9, 3, 11, 3, 5, 7];
  console.log(`First Repeated: ${firstRepeated2(arr)}`);
})();
