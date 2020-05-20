class Stack<T> {
  private _data: T[] = [];

  push(element: T) {
    this._data.push(element);
  }

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
}

export default Stack;
