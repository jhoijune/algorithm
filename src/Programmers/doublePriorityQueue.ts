import {} from 'module';
import { max } from 'lodash';

class Item<T> {
  constructor(private _key: number, private _value: T) {}

  get key(): number {
    return this._key;
  }

  get value(): T {
    return this._value;
  }

  set key(e: number) {
    this._key = e;
  }

  set value(e: T) {
    this._value = e;
  }
}

class Heap<T> {
  private _data: Item<T>[];

  private _isMinHeap: boolean;

  constructor(isMinHeap: boolean = true, contents: [number, T][] = []) {
    this._isMinHeap = isMinHeap;
    this._data = contents.map(([key, value]) => new Item(key, value));
    if (this._data.length > 1) {
      this._heapify();
    }
  }

  private _parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private _left(index: number): number {
    return 2 * index + 1;
  }

  private _right(index: number): number {
    return 2 * index + 2;
  }

  private _hasLeft(index: number): boolean {
    return this._left(index) < this.size();
  }

  private _hasRight(index: number): boolean {
    return this._right(index) < this.size();
  }

  private _swap(i: number, j: number) {
    const temp = this._data[i];
    this._data[i] = this._data[j];
    this._data[j] = temp;
  }

  private _compare(a: number, b: number): boolean {
    if (this._isMinHeap) {
      return a < b;
    }
    return a > b;
  }

  private _upheap(index: number): void {
    const parent = this._parent(index);
    if (
      index > 0 &&
      this._compare(this._data[index].key, this._data[parent].key)
    ) {
      this._swap(index, parent);
      this._upheap(parent);
    }
  }

  private _downheap(index: number): void {
    if (this._hasLeft(index)) {
      const left = this._left(index);
      let selected = left;
      if (this._hasRight(index)) {
        const right = this._right(index);
        if (this._compare(this._data[right].key, this._data[left].key)) {
          selected = right;
        }
      }
      if (this._compare(this._data[selected].key, this._data[index].key)) {
        this._swap(index, selected);
        this._downheap(selected);
      }
    }
  }

  private _heapify() {
    const start = this._parent(this._data.length - 1);
    for (let index = start; index >= 0; index--) {
      this._downheap(index);
    }
  }

  size(): number {
    return this._data.length;
  }

  isEmpty(): boolean {
    return this._data.length === 0;
  }

  add(key: number, value: T): this {
    this._data.push(new Item(key, value));
    this._upheap(this._data.length - 1);
    return this;
  }

  peek(): [number, T] {
    if (this.isEmpty()) {
      throw Error('Priority queue is empty.');
    }
    const [item] = this._data;
    return [item.key, item.value];
  }

  remove(): [number, T] {
    if (this.isEmpty()) {
      throw Error('Priority queue is empty.');
    }
    this._swap(0, this._data.length - 1);
    const item = this._data.pop()!;
    this._downheap(0);
    return [item.key, item.value];
  }

  private _bubble(index: number): void {
    if (index > 0 && this._compare(index, this._parent(index))) {
      this._upheap(index);
    } else {
      this._downheap(index);
    }
  }

  update(originalKey: number, originalValue: T, newKey: number) {
    const size = this._data.length;
    for (let index = 0; index < size; index++) {
      const data = this._data[index];
      if (data.key === originalKey && data.value === originalValue) {
        data.key = newKey;
        this._bubble(index);
        return;
      }
    }
  }
}

const solution = (operations: string[]) => {
  const minHeap = new Heap<number>();
  const maxHeap = new Heap<number>(false);
  for (const operation of operations) {
    const [command, strNum] = operation.split(/\s/);
    if (command === 'I') {
      const number = Number(strNum);
      if (minHeap.isEmpty() && maxHeap.isEmpty()) {
        minHeap.add(number, number);
      } else if (minHeap.isEmpty()) {
        const [max] = maxHeap.peek();
        if (number >= max) {
          maxHeap.add(number, number);
        } else {
          minHeap.add(number, number);
        }
      } else if (maxHeap.isEmpty()) {
        const [min] = minHeap.peek();
        if (number <= min) {
          minHeap.add(number, number);
        } else {
          maxHeap.add(number, number);
        }
      } else {
        const [min] = minHeap.peek();
        if (number <= min) {
          minHeap.add(number, number);
        } else {
          maxHeap.add(number, number);
        }
      }
    } else if (command === 'D' && strNum === '1') {
      if (maxHeap.isEmpty() && !minHeap.isEmpty()) {
        const temp = [];
        while (!minHeap.isEmpty()) {
          const [value] = minHeap.remove();
          maxHeap.add(value, value);
        }
        maxHeap.remove();
      } else if (!maxHeap.isEmpty()) {
        maxHeap.remove();
      }
    } else {
      if (minHeap.isEmpty() && !maxHeap.isEmpty()) {
        while (!maxHeap.isEmpty()) {
          const [value] = maxHeap.remove();
          minHeap.add(value, value);
        }
        minHeap.remove();
      } else if (!minHeap.isEmpty()) {
        minHeap.remove();
      }
    }
  }
  console.log(minHeap);
  console.log(maxHeap);
  if (minHeap.isEmpty() && maxHeap.isEmpty()) {
    return [0, 0];
  } else if (!minHeap.isEmpty() && !maxHeap.isEmpty()) {
    const [max] = maxHeap.peek();
    const [min] = minHeap.peek();
    return [max, min];
  }
  let min = Infinity;
  let max = -Infinity;
  while (!minHeap.isEmpty()) {
    const [value] = minHeap.remove();
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }
  while (!maxHeap.isEmpty()) {
    const [value] = maxHeap.remove();
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
  }
  return [max, min];
};

console.log(
  solution([
    'I 1',
    'I 2',
    'I 3',
    'I 4',
    'I 5',
    'I 6',
    'I 7',
    'I 8',
    'I 9',
    'I 10',
    'D 1',
    'D -1',
    'D 1',
    'D -1',
    'I 1',
    'I 2',
    'I 3',
    'I 4',
    'I 5',
    'I 6',
    'I 7',
    'I 8',
    'I 9',
    'I 10',
    'D 1',
    'D -1',
    'D 1',
    'D -1',
  ])
);
