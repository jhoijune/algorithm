import {} from 'module';

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

const solution = (n: number, costs: [number, number, number][]): number => {
  const adj = Array.from(
    Array(n),
    () => new Array<{ dst: number; cost: number }>()
  );
  for (const [src, dst, cost] of costs) {
    adj[src].push({ dst, cost });
    adj[dst].push({ dst: src, cost });
  }
  const dist = new Array<number>(n).fill(Infinity);
  const parents = new Array<number>(n).fill(-1);
  const pq = new Heap<number>();
  dist[0] = 0;
  for (let num = 0; num < n; num++) {
    pq.add(dist[num], num);
  }
  while (!pq.isEmpty()) {
    const [, vertex] = pq.remove();
    const edges = adj[vertex];
    for (const { dst, cost } of edges) {
      const alt = dist[vertex] + cost;
      if (alt < dist[dst]) {
        const ex = dist[dst];
        dist[dst] = alt;
        parents[dst] = vertex;
        pq.update(ex, dst, alt);
      }
    }
  }
  let answer = dist.reduce((prev, curr) => prev + curr, 0);
  while (true) {
    console.log(parents);
    let index = 1;
    while (index < n && parents[index] === 0) {
      index += 1;
    }
    if (index === n) {
      break;
    }
    index = 1;
    while (index < n) {
      if (parents[index] !== 0) {
        answer -= dist[parents[index]];
        parents[index] = parents[parents[index]];
      }
      index += 1;
    }
  }
  return answer;
};

console.log(
  solution(4, [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ])
);
