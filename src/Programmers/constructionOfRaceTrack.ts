import {} from 'module';
class Deque<T> {
  static DEFAULT_CAPACITY: number = 10;

  private _data: (T | null)[];

  private _front: number = 0;

  private _size: number = 0;

  constructor(capacity: number = Deque.DEFAULT_CAPACITY) {
    this._data = new Array(capacity);
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  addFirst(element: T): this {
    if (this._size === this._data.length) {
      this._resize(2 * this._size);
    }
    const avail = this._front === 0 ? this._data.length - 1 : this._front - 1;
    this._data[avail] = element;
    this._size += 1;
    return this;
  }

  addLast(element: T): this {
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

  last(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const back = (this._front + this._size - 1) % this._data.length;
    return this._data[back];
  }

  deleteFirst(): T | null {
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

  deleteLast(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const back = (this._front + this._size - 1) % this._data.length;
    const takenThing: T = this._data[back] as T;
    this._size -= 1;
    if (this._size > 0 && this._size < Math.floor(this._data.length / 4)) {
      this._resize(Math.floor(this._data.length / 2));
    }
    return takenThing;
  }
}

const solution = (board: number[][]) => {
  const N = board.length;
  const bfs = (start: number) => {
    const dist = Array.from(Array(N), () =>
      new Array<number>(N).fill(Infinity)
    );
    dist[0][0] = 0;
    const que = new Deque<[number, number, number, number]>();
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    let result: number = Infinity;
    if (start === 0 && board[0][1] === 0) {
      que.addLast([0, 1, 0, 100]);
      dist[0][1] = 100;
    }
    if (start === 1 && board[1][0] === 0) {
      que.addLast([1, 0, 1, 100]);
      dist[1][0] = 100;
    }
    while (!que.isEmpty()) {
      const [row, col, direction, cost] = que.deleteFirst()!;
      if (row === N - 1 && col === N - 1) {
        console.log(dist);
        result = Math.min(result, cost);
      }
      for (let dir = 0; dir < 4; dir++) {
        const nRow = row + directions[dir][0];
        const nCol = col + directions[dir][1];
        const newCost = cost + (direction === dir ? 100 : 600);
        if (
          nRow >= 0 &&
          nRow < N &&
          nCol >= 0 &&
          nCol < N &&
          board[nRow][nCol] === 0 &&
          dist[nRow][nCol] > newCost
        ) {
          dist[nRow][nCol] = newCost;
          que.addLast([nRow, nCol, dir, newCost]);
        }
      }
    }
    return result;
  };
  const right = bfs(0);
  const down = bfs(1);
  return Math.min(right, down);
};

console.log(
  solution([
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
  ])
);
