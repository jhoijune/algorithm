/*
In given list of n elements, we need to find the first repeated element. Which of the following methods
will work for us? If a method works, then implement it.
*/

const ex01_1 = <T>(arr: T[]) => {
  // Brute force exhaustive search.
  // time complexity O(n^2)
  const size = arr.length;
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      if (arr[i] === arr[j]) {
        console.log(`repeated element index ${i} ${j}`);
        return arr[i];
      }
    }
  }
  return null;
};

const ex01_2 = <T>(arr: T[]) => {
  // Use Hash-Table to keep an index of the elements and use the second scan to find the element.
  // time complexity O(n)
  // space complexity O(n)
  const size = arr.length;
  const ht = new Map<T, number>();
  for (let index = 0; index < size; index++) {
    if (ht.has(arr[index])) {
      const prev = ht.get(arr[index])!;
      console.log(`repeated element index ${prev} ${index}`);
      return arr[index];
    } else {
      ht.set(arr[index], index);
    }
  }
  return null;
};
