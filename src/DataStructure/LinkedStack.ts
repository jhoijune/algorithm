import Stack from './Stack';
import SinglyLinkedList, { SinglyLinkedNode } from './SinglyLinkedList';

class LinkedStack<T> extends Stack<T> {
  private _head: SinglyLinkedNode<T> | null = null;
  private _length: number = 0;

  push(element: T): this {
    const newNode = new SinglyLinkedNode(element, this._head);
    this._head = newNode;
    this._length++;
    return this;
  }

  pop(): T {
    if (this.isEmpty()) {
      throw Error('Stack is empty');
    }
    const value = this._head!.value;
    this._head = this._head!.next;
    this._length--;
    return value;
  }

  top(): T {
    if (this.isEmpty()) {
      throw Error('Stack is empty');
    }
    return this._head!.value;
  }

  size(): number {
    return this._length;
  }

  isEmpty(): boolean {
    return this._length === 0;
  }

  print() {
    let curr = this._head;
    while (curr !== null) {
      console.log(`${curr} `);
      curr = curr.next;
    }
    console.log('\n');
  }
}

export default LinkedStack;
