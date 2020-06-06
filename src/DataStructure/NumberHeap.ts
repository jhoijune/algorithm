import Heap from './Heap';

class NumberHeap {
  private _data: Heap<number>;

  constructor(isMinHeap: boolean = true, contents: number[] = []) {
    const processed: [number, number][] = contents.map((value) => [
      value,
      value,
    ]);
    this._data = new Heap<number>(isMinHeap, processed);
  }

  size(): number {
    return this._data.size();
  }

  isEmpty(): boolean {
    return this._data.isEmpty();
  }

  add(value: number): this {
    this._data.add(value, value);
    return this;
  }

  minOrMax(): number {
    const [value] = this._data.minOrMax();
    return value;
  }

  remove(): number {
    const [value] = this._data.remove();
    return value;
  }
}

export default NumberHeap;
