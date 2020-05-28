import _ from 'lodash';

import SinglyLinkedList, {
  SinglyLinkedNode,
} from '../../DataStructure/SinglyLinkedList';

const copy = (value: any) => {
  if (
    typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'boolean'
  ) {
    return value;
  }
  return Object.assign(Object.create(Object.getPrototypeOf(value)), value);
};

class ExtendedSinglyList<T> extends SinglyLinkedList<T> {
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
  copyList(): ExtendedSinglyList<T> {
    const ll = new ExtendedSinglyList<T>();
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
  copyReversedList(): ExtendedSinglyList<T> {
    const ll = new ExtendedSinglyList<T>();
    let curr = this._head;
    while (curr !== null) {
      ll.addHead(copy(curr.value));
      curr = curr.next;
    }
    return ll;
  }
}

(() => {
  const ll = new ExtendedSinglyList<number>();
  for (let count = 0; count < 20; count++) {
    ll.sortedInsert(_.random(100));
  }
  const ll2 = ll.copyReversedList();
  ll2.print();
})();
