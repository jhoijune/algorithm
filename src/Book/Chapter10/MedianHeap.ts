import { NumberHeap } from '../../DataStructure';

class MedianHeap {
  private _minHeap: NumberHeap = new NumberHeap();
  private _maxHeap: NumberHeap = new NumberHeap(false);

  insert(value: number): this {
    if (this._maxHeap.isEmpty() || this._maxHeap.peek() >= value) {
      this._maxHeap.add(value);
    } else {
      this._minHeap.add(value);
    }
    if (this._maxHeap.size() > this._minHeap.size() + 1) {
      const value = this._maxHeap.remove();
      this._minHeap.add(value);
    }
    if (this._minHeap.size() > this._maxHeap.size() + 1) {
      const value = this._minHeap.remove();
      this._maxHeap.add(value);
    }
    return this;
  }

  getMedian(): number {
    if (this._maxHeap.isEmpty() && this._minHeap.isEmpty()) {
      throw Error('Heap is empty');
    }
    if (this._minHeap.size() === this._maxHeap.size()) {
      return (this._minHeap.peek() + this._maxHeap.peek()) / 2;
    } else if (this._minHeap.size() > this._maxHeap.size()) {
      return this._minHeap.peek();
    }
    return this._maxHeap.peek();
  }
}
