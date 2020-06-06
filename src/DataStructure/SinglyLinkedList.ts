import LinkedNode from './LinkedNode';
import LinearLinkedList from './LinearLinkedList';
import { copy } from '../Util';

class SinglyLinkedNode<T> extends LinkedNode<T> {
  constructor(value: T, next: SinglyLinkedNode<T> | null) {
    super(value, next);
  }
}

class SinglyLinkedList<T> extends LinearLinkedList<T> {
  protected _head: SinglyLinkedNode<T> | null = null;
  protected _tail: SinglyLinkedNode<T> | null = null;

  addHead(value: T): this {
    this._head = new SinglyLinkedNode(value, this._head);
    if (this._length === 0) {
      this._tail = this._head;
    }
    this._length++;
    return this;
  }

  addTail(value: T): this {
    const newNode = new SinglyLinkedNode(value, null);
    if (this.isEmpty()) {
      this._head = newNode;
    } else {
      this._tail!.next = newNode;
    }
    this._tail = newNode;
    this._length++;
    return this;
  }

  /**
   * Insert an element in sorted order in linked list given head pointer
   * @param value
   */
  sortedInsert(value: T): this {
    let curr = this._head;
    if (curr === null || value < curr.value) {
      return this.addHead(value);
    }
    while (curr !== null) {
      const next: SinglyLinkedNode<T> | null = curr.next;
      if (next === null) {
        return this.addTail(value);
      } else {
        const nextValue = next.value;
        if (value <= nextValue) {
          const newNode = new SinglyLinkedNode(value, next);
          curr.next = newNode;
          this._length++;
          break;
        }
        curr = next;
      }
    }
    return this;
  }

  /**
   * Delete element at the head of the linked list.
   */
  removeHead(): T {
    if (this._head === null) {
      throw Error('Linked List is empty');
    }
    const { value } = this._head;
    this._head = this._head.next;
    if (this._head === null) {
      this._tail = null;
    }
    this._length--;
    return value;
  }

  /**
   * Delete the first node whose value is equal to the given value.
   * If found return true else return false.
   * @param target
   */
  deleteNode(target: T): boolean {
    let prev: SinglyLinkedNode<T> | null = null;
    let curr = this._head;
    while (curr !== null) {
      if (curr.value === target) {
        if (prev === null) {
          this._head = curr.next;
        } else {
          prev.next = curr.next;
          if (prev.next === null) {
            this._tail = prev;
          }
        }
        this._length--;
        return true;
      }
      prev = curr;
      curr = curr.next;
    }
    return false;
  }

  /**
   * Delete all the nodes whose value is equal to the given value.
   * @param target
   */
  deleteNodes(target: T): number {
    let prev: SinglyLinkedNode<T> | null = null;
    let curr = this._head;
    let deleteCount = 0;
    while (curr !== null) {
      if (curr.value === target) {
        if (prev === null) {
          this._head = curr.next;
        } else {
          prev.next = curr.next;
          if (prev.next === null) {
            this._tail = prev;
          }
        }
        this._length--;
        deleteCount += 1;
      }
      prev = curr;
      curr = curr.next;
    }
    return deleteCount;
  }

  /**
   * Reverse a singly linked List
   */
  reverse() {
    let curr = this._head;
    let prev: SinglyLinkedNode<T> | null = null;
    let next: SinglyLinkedNode<T> | null = null;
    while (curr !== null) {
      next = curr.next;
      curr.next = prev;
      if (curr.next === null) {
        this._tail = curr;
      }
      prev = curr;
      curr = next;
    }
    this._head = prev;
  }

  /**
   * Copy the content of given linked list into another linked list. If the original linked list contains
   * elements in order 1,2,3,4, the new list should contain the elements in order 1,2,3,4.
   */
  copyList(): SinglyLinkedList<T> {
    const ll = new SinglyLinkedList<T>();
    let curr = this._head;
    while (curr !== null) {
      ll.addTail(copy(curr.value));
      curr = curr.next;
    }
    return ll;
  }

  /**
   * Copy the content of linked list in another linked list in reverse order. If the original linked list
   * contains elements in order 1,2,3,4, the new list should contain the elements in order 4,3,2,1.
   */
  copyReversedList(): SinglyLinkedList<T> {
    const ll = new SinglyLinkedList<T>();
    let curr = this._head;
    while (curr !== null) {
      ll.addHead(copy(curr.value));
      curr = curr.next;
    }
    return ll;
  }

  /**
   * Find Nth node from beginning
   */
  findNthNode(N: number): T {
    if (N > this.size()) {
      throw RangeError('N is greater than size of list');
    }
    let node = this._head;
    let count = 1;
    while (node !== null && count < N) {
      count += 1;
      node = node.next;
    }
    return node!.value;
  }

  findNthNodeFromEnd(N: number): T {
    if (N > this.size()) {
      throw RangeError('N is greater than size of list');
    }
    let count = 0;
    let forward = this._head;
    let curr = this._head;
    while (forward !== null && count < N) {
      forward = forward.next;
      count += 1;
    }
    while (forward !== null) {
      forward = forward.next;
      curr = curr!.next;
    }
    return curr!.value;
  }

  detectLoop(): boolean {
    let node = this._head;
    let count = 0;
    const size = this.size();
    while (node !== null && count < size) {
      count += 1;
      node = node.next;
    }
    if (node === null) {
      return false;
    }
    return true;
  }

  detectLoopType(): number {
    let slowPtr = this._head;
    let fastPtr = this._head;
    while (fastPtr!.next !== null && fastPtr!.next!.next !== null) {
      if (fastPtr!.next === this._head || fastPtr!.next!.next === this._head) {
        return 2;
      }
      slowPtr = slowPtr!.next;
      fastPtr = fastPtr!.next!.next;
      if (fastPtr === slowPtr) {
        return 1;
      }
    }
    return 0;
  }

  detectLoopTail(): SinglyLinkedNode<T> | null {
    const set = new Set<SinglyLinkedNode<T>>();
    let curr = this._head;
    let prev: SinglyLinkedNode<T> | null = null;
    while (curr !== null) {
      if (set.has(curr)) {
        return prev;
      } else {
        set.add(curr);
        prev = curr;
        curr = curr.next;
      }
    }
    return null;
  }

  removeLoop() {
    const point = this.detectLoopTail();
    if (point === null) {
      return;
    }
    this._tail = point;
    point.next = null;
  }

  /**
   * Insert an element at kth position from the start of linked list. Return true if success and if list is not
   *  long enough, then return false.
   * @param value
   * @param position
   */
  insertKthElementFromStart(value: T, position: number): boolean {
    if (!Number.isInteger(position)) {
      throw Error('Position is not an integer');
    }
    if (this._length < position) {
      return false;
    }
    const newNode = new SinglyLinkedNode(value, null);
    if (position === 0) {
      newNode.next = this._head;
      this._head = newNode;
      this._length++;
      return true;
    }
    let count = 0;
    let curr = this._head!;
    while (count !== position - 1) {
      curr = curr.next!;
      count += 1;
    }
    const next = curr.next;
    curr.next = newNode;
    newNode.next = next;
    this._length++;
    return true;
  }

  /**
   * Insert an element at kth position from the end of linked list. Return true if success and if list is not long
enough, then return -1.
   * @param value 
   * @param position 
   */
  insertKthElementFromEnd(value: T, position: number): boolean {
    if (!Number.isInteger(position)) {
      throw Error('Position is not an integer');
    }
    if (this._length < position) {
      return false;
    }
    return this.insertKthElementFromStart(value, this._length - position);
  }
}

export default SinglyLinkedList;
export { SinglyLinkedNode };
