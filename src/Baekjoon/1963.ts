import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
class Queue<T> {
  static DEFAULT_CAPACITY: number = 10;

  private _size: number = 0; // current number of elements

  private _data: (T | null)[]; // generic array used for storage.

  private _front: number = 0; // index of the front element

  constructor(capacity: number = Queue.DEFAULT_CAPACITY) {
    this._data = new Array(capacity);
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  enqueue(element: T): this {
    if (this._size === this._data.length) {
      this._resize(2 * this._size);
    }
    const avail: number = (this._front + this._size) % this._data.length;
    this._data[avail] = element;
    this._size += 1;
    return this;
  }

  private _resize(capacity: number): void {
    const old: (T | null)[] = this._data;
    const oldLen: number = old.length;
    this._data = new Array(capacity);
    let walk: number = this._front;
    for (const index of [...Array(this._size).keys()]) {
      this._data[index] = old[walk];
      walk = (1 + walk) % oldLen;
    }
    this._front = 0;
  }

  first(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this._data[this._front];
  }

  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const takenThing: T = this._data[this._front] as T;
    this._data[this._front] = null;
    this._front = (this._front + 1) % this._data.length;
    this._size -= 1;
    if (this._size > 0 && this._size < Math.floor(this._data.length / 4)) {
      this._resize(Math.floor(this._data.length / 2));
    }
    return takenThing;
  }
}

const primes: number[] = [];
for (let num = 1001; num < 10000; num += 2) {
  let div = 3;
  const limit = Math.floor(Math.sqrt(num));
  for (; div <= limit; div++) {
    if (num % div === 0) {
      break;
    }
  }
  if (div === limit + 1) {
    primes.push(num);
  }
}

const isChangeAble = (num1: number, num2: number) => {
  const str1 = num1.toString();
  const str2 = num2.toString();
  const size = str1.length;
  let count = 0;
  for (let index = 0; index < size; index++) {
    if (str1[index] === str2[index]) {
      count += 1;
    }
  }
  return count === size - 1;
};

const solution = (source: number, target: number) => {
  const queue = new Queue<[number, number]>();
  const numberSet = new Set<number>();
  queue.enqueue([source, 0]);
  numberSet.add(source);
  while (!queue.isEmpty()) {
    const [number, cost] = queue.dequeue()!;
    if (number === target) {
      console.log(cost);
      return;
    }
    for (const prime of primes) {
      if (!numberSet.has(prime) && isChangeAble(number, prime)) {
        numberSet.add(prime);
        queue.enqueue([prime, cost + 1]);
      }
    }
  }
  console.log('Impossible');
};

let size: number;
const numbers: number[][] = [];

rl.on('line', (line) => {
  if (typeof size === 'undefined') {
    size = Number(line);
  } else {
    const container: number[] = line.split(' ').map((v) => Number(v));
    numbers.push(container);
    if (numbers.length === size) {
      rl.close();
    }
  }
}).on('close', () => {
  for (const [num1, num2] of numbers) {
    solution(num1, num2);
  }
  process.exit();
});
