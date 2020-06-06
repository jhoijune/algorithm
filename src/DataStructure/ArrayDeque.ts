import _ from 'lodash';
import Deque from './Deque';

class ArrayDeque<T> extends Deque<T> {
  static DEFAULT_CAPACITY: number = 10;

  private _data: (T | null)[];

  private _front: number = 0;

  constructor(capacity: number = ArrayDeque.DEFAULT_CAPACITY) {
    super();
    this._data = new Array(capacity);
  }

  /**
   * Inserts an element at the front of the deque.
   * @param element
   */
  addFirst(element: T): this {
    if (this._size === this._data.length) {
      this._resize(2 * this._size);
    }
    const avail = this._front === 0 ? this._data.length - 1 : this._front - 1;
    this._data[avail] = element;
    this._size += 1;
    return this;
  }

  /**
   * Inserts an element at the back of the deque.
   * @param element
   */
  addLast(element: T): this {
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
    for (const index of _.range(this._size)) {
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

  /**
   * Removes and returns the first element of the deque (null if empty)
   */
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

  /**
   * Removes and returns the last element of the deque (null if empty)
   */
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

export default ArrayDeque;
