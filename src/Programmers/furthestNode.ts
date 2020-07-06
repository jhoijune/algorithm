import {} from 'module';

class Queue<T> {
  static DEFAULT_CAPACITY: number = 10;

  private _size: number = 0; // current number of elements

  private _data: (T | null)[]; // generic array used for storage.

  private _front: number = 0; // index of the front element

  constructor(capacity: number = Queue.DEFAULT_CAPACITY) {
    this._data = new Array(capacity);
  }

  /**
   * Returns the number of elements in the queue.
   */
  size(): number {
    return this._size;
  }

  /**
   * Tests whether the queue is empty.
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Inserts an element at the rear of the queue.
   * @param element
   */
  enqueue(element: T): this {
    if (this._size === this._data.length) {
      this._resize(2 * this._size);
    }
    const avail: number = (this._front + this._size) % this._data.length;
    this._data[avail] = element;
    this._size += 1;
    return this;
  }

  /**
   * Resize to a new list of capacity >= data.length.
   * @param capacity
   */
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

  /**
   * Removes and returns the first element of the queue (null if empty)
   */
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

const solution = (n: number, edge: [number, number][]): number => {
  const adj: number[][] = Array.from(Array(n), () => []);
  for (const [src, dst] of edge) {
    adj[dst - 1].push(src - 1);
    adj[src - 1].push(dst - 1);
  }
  const distance = new Array<number>(n).fill(Infinity);
  const path = new Array<number>(n).fill(0);
  const que = new Queue<number>();
  que.enqueue(0);
  distance[0] = 0;
  while (!que.isEmpty()) {
    const src = que.dequeue()!;
    const dsts = adj[src];
    for (const dst of dsts) {
      if (distance[dst] === Infinity) {
        distance[dst] = distance[src] + 1;
        path[dst] = src;
        que.enqueue(dst);
      }
    }
  }
  const max = distance.reduce((prev, curr) => {
    if (curr !== Infinity && curr > prev) {
      return curr;
    }
    return prev;
  }, 0);
  return distance.filter((value) => value === max).length;
};
