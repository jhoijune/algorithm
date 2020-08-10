import { readFileSync } from 'fs';

class Node {
  value: string;
  prev: Node | null = null;
  next: Node | null = null;
  constructor(value: string) {
    this.value = value;
  }
}

class LinkedList {
  size: number = 0;
  head: Node | null = null;
  tail: Node = new Node('');

  constructor(input: string) {
    for (const char of input) {
      this._insertTail(char);
    }
  }

  _insertTail(value: string) {
    if (this.size === 0) {
      const node = new Node(value);
      this.head = node;
      this.head.next = this.tail;
      this.tail.prev = this.head;
    } else {
      const node = new Node(value);
      node.prev = this.tail.prev;
      node.next = this.tail;
      this.tail.prev!.next = node;
      this.tail.prev = node;
    }
    this.size += 1;
  }

  insert(pointer: Node, value: string) {
    if (pointer === this.head) {
      const node = new Node(value);
      this.head = node;
      this.head.next = pointer;
      pointer.prev = this.head;
    } else {
      const node = new Node(value);
      node.prev = pointer.prev;
      node.next = pointer;
      pointer.prev!.next = node;
      pointer.prev = node;
    }
    this.size += 1;
  }

  delete(pointer: Node) {
    if (this.size === 0) {
      return;
    }
    if (pointer === this.head) {
      return;
    } else if (pointer.prev === this.head) {
      this.head = pointer;
      this.head.prev = null;
    } else {
      pointer.prev!.prev!.next = pointer;
      pointer.prev = pointer.prev!.prev;
    }
    this.size -= 1;
  }

  traverse() {
    const result: string[] = [];
    let curr = this.head;
    while (curr !== this.tail) {
      result.push(curr!.value);
      curr = curr!.next!;
    }
    return result.join('');
  }

  moveLeft(pointer: Node): Node {
    if (pointer.prev === null) {
      return pointer;
    }
    return pointer.prev;
  }

  moveRight(pointer: Node): Node {
    if (pointer.next === null) {
      return pointer;
    }
    return pointer.next;
  }
}

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const commands: string[] = [];
for (let index = 2; index < input.length; index++) {
  commands.push(input[index].trim());
}

const list = new LinkedList(input[0].trim());
let pointer = list.tail;
for (const command of commands) {
  const [action, insert] = command.split(' ');
  if (action === 'L') {
    pointer = list.moveLeft(pointer);
  } else if (action === 'D') {
    pointer = list.moveRight(pointer);
  } else if (action === 'B') {
    list.delete(pointer);
  } else {
    list.insert(pointer, insert);
  }
}

console.log(list.traverse());
