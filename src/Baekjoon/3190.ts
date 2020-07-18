import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Queue<T> {
  static DEFAULT_CAPACITY: number = 10;

  private _size: number = 0;

  private _data: (T | null)[];

  private _front: number = 0;

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

const solution = (
  N: number,
  apple: [number, number][],
  info: [string, string][]
) => {
  const EMPTY = 0;
  const BODY = 1;
  const APPLE = 2;
  const board = Array.from(Array(N), () => new Array<number>(N).fill(0));
  for (const [row, col] of apple) {
    board[row - 1][col - 1] = APPLE;
  }
  board[0][0] = BODY;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  let head: [number, number] = [0, 0];
  const bodys = new Queue<[number, number]>();
  bodys.enqueue([0, 0]);
  let direction = 1;
  let time = 0;
  const infoSize = info.length;
  let index = 0;

  while (true) {
    time += 1;
    const nr = head[0] + dr[direction];
    const nc = head[1] + dc[direction];
    if (nr >= N || nr < 0 || nc >= N || nc < 0) {
      break;
    }
    head = [nr, nc];
    bodys.enqueue(head);
    if (board[nr][nc] === BODY) {
      break;
    } else if (board[nr][nc] === APPLE) {
      board[nr][nc] = BODY;
    } else {
      board[nr][nc] = BODY;
      const [row, col] = bodys.dequeue()!;
      board[row][col] = EMPTY;
    }
    if (index < infoSize && Number(info[index][0]) === time) {
      if (info[index][1] === 'L') {
        direction = (4 + direction - 1) % 4;
      } else if (info[index][1] === 'D') {
        direction = (direction + 1) % 4;
      }
      index += 1;
    }
  }
  console.log(time);
};

let N: number;
let appleSize: number;
const apple: [number, number][] = [];
let infoSize: number;
const info: [string, string][] = [];

rl.on('line', (line) => {
  if (typeof N === 'undefined') {
    N = Number(line);
  } else if (typeof appleSize === 'undefined') {
    appleSize = Number(line);
  } else if (apple.length !== appleSize) {
    apple.push(line.split(' ').map((v) => Number(v)) as [number, number]);
  } else if (typeof infoSize === 'undefined') {
    infoSize = Number(line);
  } else {
    info.push(line.split(' ') as [string, string]);
    if (info.length == infoSize) {
      rl.close();
    }
  }
}).on('close', () => {
  solution(N, apple, info);
  process.exit();
});
