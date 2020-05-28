class SinglyLinkedNode<T> {
  value: T;
  next: SinglyLinkedNode<T> | null;
  constructor(value: T, next: SinglyLinkedNode<T> | null) {
    this.value = value;
    this.next = next;
  }
}

class SinglyLinkedList<T> {
  protected _length: number = 0;
  protected _head: SinglyLinkedNode<T> | null = null;
  protected _tail: SinglyLinkedNode<T> | null = null;

  size(): number {
    return this._length;
  }

  isEmpty(): boolean {
    return this._length === 0;
  }

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
}

export default SinglyLinkedList;
export { SinglyLinkedNode };
