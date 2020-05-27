// Given an array of integers, you need to find if duplicate values exist in the range of K units.

const duplicateDistance = (arr: number[], K: number) => {
  const size = arr.length;
  const ht: Map<number, number> = new Map();
  for (let index = 0; index < size; index++) {
    const value = arr[index];
    if (ht.has(value) && index - ht.get(value)! <= K) {
      return true;
    } else {
      ht.set(value, index);
    }
  }
  return false;
};
