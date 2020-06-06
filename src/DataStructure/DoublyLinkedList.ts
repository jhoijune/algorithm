import LinkedNode from './LinkedNode';
import LinearLinkedList from './LinearLinkedList';

class DoublyLinkedNode<T> extends LinkedNode<T> {
  constructor(
    value: T,
    public prev: DoublyLinkedNode<T> | null,
    public next: DoublyLinkedNode<T> | null
  ) {
    super(value);
  }
}

class DoublyLinkedList<T> extends LinearLinkedList<T> {
  protected _head: DoublyLinkedNode<T> | null = null;
  protected _tail: DoublyLinkedNode<T> | null = null;

  addHead(value: T): this {
    const newNode = new DoublyLinkedNode(value, null, null);
    if (this.isEmpty()) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._head!.prev = newNode;
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
    } else {
      this._tail!.next = newNode;
      newNode.prev = this._tail;
      this._tail = newNode;
    }
    this._length++;
    return this;
  }

  sortedInsert(value: T): this {
    let curr = this._head;
    if (curr === null || value < curr.value) {
      return this.addHead(value);
    }
    while (curr !== null) {
      const next: DoublyLinkedNode<T> | null = curr.next;
      if (next === null) {
        return this.addTail(value);
      }
      if (value <= next.value) {
        const newNode = new DoublyLinkedNode(value, curr, next);
        curr.next = newNode;
        next.prev = newNode;
        this._length++;
        break;
      }
      curr = next;
    }
    return this;
  }

  removeHead(): T {
    if (this._head === null) {
      throw Error('Linked List is empty');
    }
    const value = this._head.value;
    this._head = this._head.next;
    if (this._head !== null) {
      this._head.prev = null;
    } else {
      this._tail = null;
    }
    this._length--;
    return value;
  }

  deleteNode(target: T): boolean {
    let curr = this._head;
    while (curr !== null) {
      if (curr.value === target) {
        if (curr.prev === null && curr.next === null) {
          this._head = null;
          this._tail = null;
        } else if (curr.prev === null) {
          this._head = curr.next;
          this._head!.prev = null;
        } else if (curr.next === null) {
          this._tail = curr.prev;
          this._tail!.next = null;
        } else {
          curr.prev.next = curr.next;
          curr.next.prev = curr.prev;
        }
        this._length--;
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  /**
   * Consider the list as sorted remove the repeated value nodes of the list.
   */
  removeDuplicate() {
    let prevValue: T | null = null;
    let curr = this._head;
    while (curr !== null) {
      if (prevValue !== null && prevValue === curr.value) {
        curr.prev!.next = curr.next;
        if (curr.next === null) {
          this._tail = curr.prev;
        } else {
          curr.next.prev = curr.prev;
        }
        this._length--;
      }
      prevValue = curr.value;
      curr = curr.next;
    }
  }

  reverse() {
    let curr = this._head;
    while (curr !== null) {
      const next = curr.next;
      curr.next = curr.prev;
      curr.prev = next;
      if (curr.prev === null) {
        this._tail = this._head;
        this._head = curr;
        return;
      }
      curr = curr.prev;
    }
  }
}

export default DoublyLinkedList;
export { DoublyLinkedNode };
