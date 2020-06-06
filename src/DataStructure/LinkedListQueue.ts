import Queue from './Queue';
import { SinglyLinkedNode } from './SinglyLinkedList';

class LinkedListQueue<T> extends Queue<T> {
  private _tail: SinglyLinkedNode<T> | null = null;

  enqueue(element: T): this {
    if (this.isEmpty()) {
      const newNode = new SinglyLinkedNode(element, null);
      this._tail = newNode;
      this._tail.next = newNode;
    } else {
      const newNode = new SinglyLinkedNode(element, this._tail!.next);
      this._tail!.next = newNode;
      this._tail = newNode;
    }
    this._size++;
    return this;
  }

  dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const head = this._tail!.next;
    const value = head!.value;
    if (this._size === 1) {
      this._tail = null;
    } else {
      this._tail!.next = head!.next;
    }
    this._size -= 1;
    return value;
  }

  first(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const head = this._tail!.next;
    return head!.value;
  }
}

export default LinkedListQueue;
