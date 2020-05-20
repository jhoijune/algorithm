import '';

const SmallestPositiveMissingNumber1 = (arr: number[]): number => {
  const size = arr.length;
  let isFound: boolean;
  for (let i = 1; i < size + 1; i++) {
    isFound = false;
    for (let j = 0; j < size; j++) {
      if (arr[j] === i) {
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      return i;
    }
  }
  return -1;
};

const SmallestPositiveMissingNumber2 = (arr: number[]): number => {
  const size = arr.length;
  const hs: Set<number> = new Set();
  for (let index = 0; index < size; index++) {
    hs.add(arr[index]);
  }
  for (let number = 1; number < size + 1; number++) {
    if (hs.has(number) === false) {
      return number;
    }
  }
  return -1;
};

const SmallestPositiveMissingNumber3 = (arr: number[]): number => {
  const size = arr.length;
  const aux = new Array(size).fill(-1);
  for (let index = 0; index < size; index++) {
    if (arr[index] > 0 && arr[index] <= size) {
      aux[arr[index] - 1] = arr[index];
    }
  }
  for (let index = 0; index < size; index++) {
    if (aux[index] !== index + 1) {
      return index + 1;
    }
  }
  return -1;
};

const SmallestPositiveMissingNumber4 = (arr: number[]): number => {
  const size = arr.length;
  let temp: number;
  for (let index = 0; index < size; index++) {
    while (arr[index] !== index + 1 && arr[index] > 0 && arr[index] <= size) {
      temp = arr[index];
      arr[index] = arr[temp - 1];
      arr[temp - 1] = temp;
    }
  }
  for (let index = 0; index < size; index++) {
    if (arr[index] !== index + 1) {
      return index + 1;
    }
  }
  return -1;
};

const test = () => {
  const arr = [8, 5, 6, 1, 9, 11, 2, 7, 4, 10];
  console.info(
    `Smallest Positive Missing Number:${SmallestPositiveMissingNumber4(arr)}`
  );
  console.log(arr);
};

test();
