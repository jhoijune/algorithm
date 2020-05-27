// Given an array of N integers, you need to find if array elements can form an Arithmetic progression.

const isAP = (arr: number[]) => {
  const size = arr.length;
  const set: Set<number> = new Set();
  let first = arr[0];
  let second = arr[0];
  for (const value of arr) {
    if (set.has(value)) {
      return false;
    } else {
      set.add(value);
      if (value < first) {
        second = first;
        first = value;
      } else if (value < second) {
        second = value;
      }
    }
  }
  const diff = second - first;
  for (let multiple = 0; multiple < size; multiple++) {
    const current = first + diff * multiple;
    if (!set.has(current)) {
      return false;
    }
  }
  return true;
};
