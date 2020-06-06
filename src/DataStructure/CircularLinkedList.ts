import LinkedList from './LinkedList';
import { SinglyLinkedNode } from './SinglyLinkedList';

class CircularLinkedList<T> extends LinkedList<T> {
  protected _tail: SinglyLinkedNode<T> | null = null;

  addHead(value: T): this {
    const newNode = new SinglyLinkedNode(value, null);
    if (this.isEmpty()) {
      this._tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this._tail!.next;
      this._tail!.next = newNode;
    }
    this._length++;
    return this;
  }

  addTail(value: T): this {
    const newNode = new SinglyLinkedNode(value, null);
    if (this.isEmpty()) {
      this._tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this._tail!.next;
      this._tail!.next = newNode;
      this._tail = newNode;
    }
    this._length++;
    return this;
  }

  find(value: T): boolean {
    let curr = this._tail;
    for (let count = 0; count < this._length; count++) {
      if (curr!.value === value) {
        return true;
      }
      curr = curr!.next;
    }
    return false;
  }

  print() {
    let temp = this._tail!.next;
    for (let count = 0; count < this._length; count++) {
      process.stdout.write(`${temp!.value} `);
      temp = temp!.next;
    }
    process.stdout.write('\n');
  }

  removeHead(): T {
    if (this.isEmpty()) {
      throw Error('Linked list is empty');
    }
    const head = this._tail!.next;
    if (head === this._tail) {
      this._tail = null;
    } else {
      this._tail!.next = head!.next;
    }
    this._length--;
    return head!.value;
  }

  deleteNode(target: T): boolean {
    if (this.isEmpty()) {
      return false;
    }
    let prev = this._tail;
    let curr = this._tail!.next;
    for (let count = 0; count < this._length; count++) {
      if (curr!.value === target) {
        if (curr === this._tail) {
          if (prev === curr) {
            this._tail = null;
          } else {
            this._tail = prev;
            prev!.next = curr!.next;
          }
        } else {
          prev!.next = curr!.next;
        }
        this._length--;
        return true;
      }
      prev = curr;
      curr = curr!.next;
    }
    return false;
  }
}
