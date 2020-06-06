import { DoublyLinkedNode } from './DoublyLinkedList';
import Deque from './Deque';

class LinkedListDeque<T> extends Deque<T> {
  private _head: DoublyLinkedNode<T> | null = null;

  private _tail: DoublyLinkedNode<T> | null = null;

  addFirst(element: T): this {
    if (this.isEmpty()) {
      const newNode = new DoublyLinkedNode(element, null, null);
      this._head = newNode;
      this._tail = newNode;
    } else {
      const newNode = new DoublyLinkedNode(element, null, this._head);
      this._head!.prev = newNode;
      this._head = newNode;
    }
    this._size += 1;
    return this;
  }

  addLast(element: T): this {
    if (this.isEmpty()) {
      const newNode = new DoublyLinkedNode(element, null, null);
      this._head = newNode;
      this._tail = newNode;
    } else {
      const newNode = new DoublyLinkedNode(element, this._tail, null);
      this._tail!.next = newNode;
      this._tail = newNode;
    }
    this._size += 1;
    return this;
  }

  first(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this._head!.value;
  }

  last(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this._tail!.value;
  }

  deleteFirst(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const value = this._head!.value;
    if (this._size === 1) {
      this._head = null;
      this._tail = null;
    } else {
      this._head = this._head!.next;
      this._head!.prev = null;
    }
    this._size -= 1;
    return value;
  }

  deleteLast(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    const value = this._tail!.value;
    if (this._size === 1) {
      this._head = null;
      this._tail = null;
    } else {
      this._tail = this._tail!.prev;
      this._tail!.next = null;
    }
    this._size -= 1;
    return value;
  }
}

export default LinkedListDeque;
