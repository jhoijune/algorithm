abstract class LinkedList<T> {
  protected _length: number = 0;

  size(): number {
    return this._length;
  }

  isEmpty(): boolean {
    return this._length === 0;
  }

  abstract addHead(value: T): this;

  abstract addTail(value: T): this;
}

export default LinkedList;
