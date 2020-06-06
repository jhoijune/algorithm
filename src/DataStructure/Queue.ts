abstract class Queue<T> {
  protected _size: number = 0; // current number of elements
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
  abstract enqueue(element: T): this;
  /**
   * Returns, but does not remove, the first element of the queue (null if empty).
   */
  abstract first(): T | null;
  /**
   * Removes and returns the first element of the queue (null if empty).
   */
  abstract dequeue(): T | null;
}

export default Queue;
