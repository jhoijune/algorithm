import Stack from './Stack';

class ArrayStack<T> extends Stack<T> {
  private _data: T[] = [];

  /**
   * Add element to the top of the stack.
   * @param {T} element
   */
  push(element: T): this {
    this._data.push(element);
    return this;
  }

  /**
   * Remove and return the element from the top of the stack (i.e.,LIFO)
   *  @throws {Error} if the stack is empty.
   */
  pop(): T {
    if (this.isEmpty()) {
      throw Error('Stack is Empty');
    }
    return this._data.pop()!;
  }

  top(): T {
    if (this.isEmpty()) {
      throw Error('Stack is Empty');
    }
    return this._data[this._data.length - 1];
  }

  size(): number {
    return this._data.length;
  }

  isEmpty(): boolean {
    return this._data.length === 0;
  }

  print() {
    for (const data of this._data) {
      console.log(`${data} `);
    }
    console.log('\n');
  }
}

export default ArrayStack;
