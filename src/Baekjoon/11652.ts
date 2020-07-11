import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const solution = (arr: number[]) => {
  /**
   * 일반적인 생각 -> 언어적인 한계 때문에 통과를 못하는듯
   */
  const numberCount = new Map<number, number>();
  for (const num of arr) {
    const ex = numberCount.get(num);
    if (typeof ex === 'undefined') {
      numberCount.set(num, 1);
    } else {
      numberCount.set(num, ex + 1);
    }
  }
  let numbers: number[] = [];
  let max = -Infinity;
  for (const [num, count] of numberCount) {
    if (count > max) {
      numbers = [num];
      max = count;
    } else if (count === max) {
      numbers.push(num);
    }
  }
  console.log(Math.min(...numbers));
};

const solution2 = (arr: number[]) => {
  const size = arr.length;
  arr.sort((a, b) => a - b);
  let maxCount = 0;
  let maxNum = Infinity;
  let left = 0;
  while (left < size) {
    let right = left;
    while (right < size - 1) {
      if (arr[left] === arr[right + 1]) {
        right += 1;
      } else {
        break;
      }
    }
    if (right - left + 1 > maxCount) {
      maxCount = right - left + 1;
      maxNum = arr[left];
    }
    left = right + 1;
  }
  console.log(maxNum);
};

let count: number;
const numbers: number[] = [];

rl.on('line', (line) => {
  if (typeof count === 'undefined') {
    count = Number(line);
  } else {
    numbers.push(Number(line));
    if (numbers.length === count) {
      rl.close();
    }
  }
}).on('close', () => {
  solution2(numbers);
  process.exit();
});
