// Given an array of n numbers, print the duplicate elements in the array.

const printRepeating1 = (arr: number[]) => {
  // time complexity: O(n^2)
  // space complexity: O(n)
  const size = arr.length;
  const exSearched: number[] = [];
  let outputString = 'Repeating elements are :';
  for (let i = 0; i < size - 1; i++) {
    const value = arr[i];
    if (!exSearched.includes(value)) {
      exSearched.push(value);
      for (let j = i + 1; j < size; j++) {
        if (value === arr[j]) {
          outputString += ' ' + value.toString();
          break;
        }
      }
    }
  }
  console.log(outputString);
};

const printRepeating2 = (arr: number[]) => {
  // time complexity: O(n)
  // space complexity: O(n)
  const ht: Map<number, number> = new Map();
  let outputString = 'Repeating elements are :';
  for (const value of arr) {
    if (ht.has(value)) {
      const exCount = ht.get(value)!;
      if (exCount === 1) {
        outputString += ' ' + value.toString();
      }
      ht.set(value, exCount + 1);
    } else {
      ht.set(value, 1);
    }
  }
  console.log(outputString);
};

const printRepeating3 = (arr: number[]) => {
  // time complexity: o(nlogn)
  // space complexity: o(n)
  const sorted = [...arr].sort((a, b) => a - b);
  let exValue: number | null = null;
  let count: number = 0;
  let outputString = 'Repeating elements are :';
  for (const value of sorted) {
    if (exValue === null || exValue !== value) {
      exValue = value;
      count = 1;
    } else {
      if (count === 1) {
        outputString += ' ' + value.toString();
      }
      count += 1;
    }
  }
  console.log(outputString);
};

(() => {
  const arr = [1, 3, 5, 3, 1, 4, 2, 2, 3];
  printRepeating1(arr);
  printRepeating2(arr);
  printRepeating3(arr);
})();
