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

const solution = (source: number, target: number) => {
  const operationD = (num: number) => (2 * num) % 10000;

  const operationS = (num: number) => (10000 + num - 1) % 10000;

  const operationL = (num: number) =>
    Math.floor(num / 1000) + (num % 1000) * 10;

  const operationR = (num: number) => Math.floor(num / 10) + (num % 10) * 1000;

  const queue = new Queue<[number, string]>();
  queue.enqueue([source, '']);
  const numberSet = new Array(10000).fill(false);
  numberSet[source] = true;

  while (!queue.isEmpty()) {
    const [num, operation] = queue.dequeue()!;
    if (num === target) {
      console.log(operation);
      return;
    }
    if (!numberSet[operationD(num)]) {
      numberSet[operationD(num)] = true;
      queue.enqueue([operationD(num), operation + 'D']);
    }
    if (!numberSet[operationS(num)]) {
      numberSet[operationS(num)] = true;
      queue.enqueue([operationS(num), operation + 'S']);
    }
    if (!numberSet[operationL(num)]) {
      numberSet[operationL(num)] = true;
      queue.enqueue([operationL(num), operation + 'L']);
    }
    if (!numberSet[operationR(num)]) {
      numberSet[operationR(num)] = true;
      queue.enqueue([operationR(num), operation + 'R']);
    }
  }
};

let count: number;
const numbers: number[][] = [];

rl.on('line', (line) => {
  if (typeof count === 'undefined') {
    count = Number(line);
  } else {
    const container = line.split(' ').map((v) => Number(v));
    numbers.push(container);
    if (numbers.length === count) {
      rl.close();
    }
  }
}).on('close', () => {
  for (const [source, target] of numbers) {
    solution(source, target);
  }
  process.exit();
});
