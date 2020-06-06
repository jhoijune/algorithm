import LinkedList from './LinkedList';
import { DoublyLinkedNode } from './DoublyLinkedList';

class DoubleCircularLinkedList<T> extends LinkedList<T> {
  protected _head: DoublyLinkedNode<T> | null = null;
  protected _tail: DoublyLinkedNode<T> | null = null;

  addHead(value: T): this {
    const newNode = new DoublyLinkedNode(value, null, null);
    if (this.isEmpty()) {
      this._head = newNode;
      this._tail = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      this._head!.prev = newNode;
      this._tail!.next = newNode;
      newNode.prev = this._tail;
      newNode.next = this._head;
      this._head = newNode;
    }
    this._length++;
    return this;
  }

  addTail(value: T): this {
    const newNode = new DoublyLinkedNode(value, null, null);
    if (this.isEmpty()) {
      this._head = newNode;
      this._tail = newNode;
      newNode.prev = newNode;
      newNode.next = newNode;
    } else {
      this._head!.prev = newNode;
      this._tail!.next = newNode;
      newNode.prev = this._tail;
      newNode.next = this._head;
      this._tail = newNode;
    }
    this._length++;
    return this;
  }

  removeHead(): T {
    if (this.isEmpty()) {
      throw Error('Linked list is empty.');
    }
    const value = this._head!.value;
    if (this._length === 1) {
      this._head = null;
      this._tail = null;
    } else {
      const next = this._head!.next;
      this._tail!.next = next;
      next!.prev = this._tail;
      this._head = next;
    }
    this._length--;
    return value;
  }

  removeTail(): T {
    if (this.isEmpty()) {
      throw Error('Linked list is empty.');
    }
    const value = this._tail!.value;
    if (this._length === 1) {
      this._head = null;
      this._tail = null;
    } else {
      const prev = this._tail!.prev;
      prev!.next = this._head;
      this._head!.prev = prev;
      this._tail = prev;
    }
    this._length--;
    return value;
  }
}

export default DoubleCircularLinkedList;
