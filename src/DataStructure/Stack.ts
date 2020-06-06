abstract class Stack<T> {
  /**
   * Add element to the top of the stack.
   * @param {T} element
   */
  abstract push(element: T): this;

  abstract pop(): T;

  abstract top(): T;

  abstract isEmpty(): boolean;

  abstract size(): number;
}

export default Stack;
