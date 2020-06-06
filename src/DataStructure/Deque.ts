abstract class Deque<T> {
  protected _size: number = 0;

  abstract addFirst(element: T): this;

  abstract addLast(element: T): this;

  abstract deleteFirst(): T | null;

  abstract deleteLast(): T | null;

  abstract first(): T | null;

  abstract last(): T | null;

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
}

export default Deque;
