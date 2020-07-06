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
  /**
   * 블록 이동하기
   */
  const N = board.length;
  const deque = new Deque<[[number, number], [number, number], number]>();
  const visited = new Set<string>();
  visited.add('(0,0),(0,1)');
  deque.addLast([[0, 0], [0, 1], 0]);
  const moves = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const rotate1 = [
    [
      [-1, 0],
      [0, -1],
    ],
    [
      [-1, 1],
      [0, 0],
    ],
    [
      [0, 0],
      [1, -1],
    ],
    [
      [0, 1],
      [1, 0],
    ],
  ];
  const rotate2 = [
    [
      [0, -1],
      [-1, 0],
    ],
    [
      [1, -1],
      [0, 0],
    ],
    [
      [0, 0],
      [-1, 1],
    ],
    [
      [1, 0],
      [0, 1],
    ],
  ];
  while (!deque.isEmpty()) {
    const [[loc1Row, loc1Col], [loc2Row, loc2Col], time] = deque.deleteFirst()!;
    console.log(visited);
    if (loc2Row === N - 1 && loc2Col === N - 1) {
      return time;
    }
    for (const [incRow, incCol] of moves) {
      const newRow1 = loc1Row + incRow;
      const newRow2 = loc2Row + incRow;
      const newCol1 = loc1Col + incCol;
      const newCol2 = loc2Col + incCol;
      if (
        newRow1 >= 0 &&
        newRow1 < N &&
        newRow2 >= 0 &&
        newRow2 < N &&
        newCol1 >= 0 &&
        newCol1 < N &&
        newCol2 >= 0 &&
        newCol2 < N &&
        board[newRow1][newCol1] === 0 &&
        board[newRow2][newCol2] === 0 &&
        !visited.has(`(${newRow1},${newCol1}),(${newRow2},${newCol2})`)
      ) {
        visited.add(`(${newRow1},${newCol1}),(${newRow2},${newCol2})`);
        deque.addLast([[newRow1, newCol1], [newRow2, newCol2], time + 1]);
      }
    }
    if (loc1Row == loc2Row) {
      for (let count = 0; count < 4; count++) {
        const [[incRow1, incCol1], [incRow2, incCol2]] = rotate1[count];
        const newRow1 = loc1Row + incRow1;
        const newRow2 = loc2Row + incRow2;
        const newCol1 = loc1Col + incCol1;
        const newCol2 = loc2Col + incCol2;
        const temp = Math.floor(count / 2) === 0 ? -1 : 1;
        if (
          newRow1 >= 0 &&
          newRow1 < N &&
          newRow2 >= 0 &&
          newRow2 < N &&
          newCol1 >= 0 &&
          newCol1 < N &&
          newCol2 >= 0 &&
          newCol2 < N &&
          board[loc1Row + temp][loc1Col] === 0 &&
          board[loc2Row + temp][loc2Col] === 0 &&
          !visited.has(`(${newRow1},${newCol1}),(${newRow2},${newCol2})`)
        ) {
          visited.add(`(${newRow1},${newCol1}),(${newRow2},${newCol2})`);
          deque.addLast([[newRow1, newCol1], [newRow2, newCol2], time + 1]);
        }
      }
    }
    if (loc1Col === loc2Col) {
      for (let count = 0; count < 4; count++) {
        const [[incRow1, incCol1], [incRow2, incCol2]] = rotate2[count];
        const newRow1 = loc1Row + incRow1;
        const newRow2 = loc2Row + incRow2;
        const newCol1 = loc1Col + incCol1;
        const newCol2 = loc2Col + incCol2;
        const temp = Math.floor(count / 2) === 0 ? -1 : 1;
        if (
          newRow1 >= 0 &&
          newRow1 < N &&
          newRow2 >= 0 &&
          newRow2 < N &&
          newCol1 >= 0 &&
          newCol1 < N &&
          newCol2 >= 0 &&
          newCol2 < N &&
          board[loc1Row][loc1Col + temp] === 0 &&
          board[loc2Row][loc2Col + temp] === 0 &&
          !visited.has(`(${newRow1},${newCol1}),(${newRow2},${newCol2})`)
        ) {
          visited.add(`(${newRow1},${newCol1}),(${newRow2},${newCol2})`);
          deque.addLast([[newRow1, newCol1], [newRow2, newCol2], time + 1]);
        }
      }
    }
  }
};

console.log(
  solution([
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1],
    [1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0],
  ])
);
