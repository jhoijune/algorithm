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

const solution = (N: number, K: number) => {
  if (N >= K) {
    console.log(N - K);
    return;
  }
  const numberSet = new Set<number>();
  const queue = new Queue<[number, number]>();
  queue.enqueue([N, 0]);
  while (!queue.isEmpty()) {
    const [number, cost] = queue.dequeue()!;
    if (number === K) {
      console.log(cost);
      return;
    }
    if (number + 1 <= 100000 && !numberSet.has(number + 1)) {
      numberSet.add(number + 1);
      queue.enqueue([number + 1, cost + 1]);
    }
    if (number - 1 >= 0 && !numberSet.has(number - 1)) {
      numberSet.add(number - 1);
      queue.enqueue([number - 1, cost + 1]);
    }
    if (number * 2 <= 100000 && !numberSet.has(number * 2)) {
      numberSet.add(number * 2);
      queue.enqueue([number * 2, cost + 1]);
    }
  }
};

let N: number;
let K: number;

rl.on('line', (line) => {
  const numbers = line.split(' ').map((v) => Number(v));
  N = numbers[0];
  K = numbers[1];
  rl.close();
}).on('close', () => {
  solution(N, K);
  process.exit();
});
