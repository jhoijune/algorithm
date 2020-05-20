// 내 버전 O(n)
const rotateArray1 = (arr: number[], count: number): number[] => {
  const size = arr.length;
  const newCount = count % size;
  const left = arr.slice(newCount);
  const right = arr.slice(0, newCount);
  const result = [...left, ...right];
  return result;
};

const test1 = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const result = rotateArray1(numbers, 4);
  console.log(result);
};

test1();

// 책버전 발상이 독특함

const rotateArray2 = (arr: number[], count: number): void => {
  const size = arr.length;
  reverseArray(arr, 0, count - 1);
  reverseArray(arr, count, size - 1);
  reverseArray(arr, 0, size - 1);
};

const reverseArray = (arr: number[], start: number, end: number): void => {
  for (let i = start, j = end; i < j; i++, j--) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};

const test2 = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rotateArray2(numbers, 4);
  // [4,3,2,1,5,6,7,8,9,10];
  // [4,3,2,1,10,9,8,7,6,5];
  // [5,6,7,8,9,10,1,2,3,4];
  console.log(numbers);
};
