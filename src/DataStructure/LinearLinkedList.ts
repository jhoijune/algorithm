import LinkedNode from './LinkedNode';
import LinkedList from './LinkedList';

abstract class LinearLinkedList<T> extends LinkedList<T> {
  protected _length: number = 0;
  protected _head: LinkedNode<T> | null = null;
  protected _tail: LinkedNode<T> | null = null;

  size(): number {
    return this._length;
  }

  isEmpty(): boolean {
    return this._length === 0;
  }

  print() {
    let temp = this._head;
    while (temp !== null) {
      process.stdout.write(`${temp.value} `);
      temp = temp.next;
    }
    process.stdout.write('\n');
  }

  /**
   * Search element in linked list. Given a head pointer and value. Returns True if value found in list
   * else returns false.
   * @param data
   */
  isPresent(data: T): boolean {
    let curr = this._head;
    while (curr !== null) {
      if (curr.value === data) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }

  head(): T {
    if (this.isEmpty()) {
      throw Error('List is Empty.');
    }
    return this._head!.value;
  }

  compareList(list: LinearLinkedList<T>): boolean {
    if (this.constructor.name === list.constructor.name) {
      let node1 = this._head;
      let node2 = list._head;
      while (node1 !== null && node2 !== null) {
        if (node1.value !== node2.value) {
          return false;
        }
        node1 = node1.next;
        node2 = node2.next;
      }
      if (node1 === null && node2 === null) {
        return true;
      }
    }
    return false;
  }

  /**
   * Find the length of given linked list.
   */
  findLength(): number {
    let node = this._head;
    let length = 0;
    while (node !== null) {
      node = node.next;
      length += 1;
    }
    return length;
  }
}

export default LinearLinkedList;
