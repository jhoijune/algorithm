import { readFileSync } from 'fs';

class Heap {
  data: number[];

  constructor() {
    this.data = [];
  }

  parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  left(index: number): number {
    return 2 * index + 1;
  }

  right(index: number): number {
    return 2 * index + 2;
  }

  hasLeft(index: number): boolean {
    return this.left(index) < this.data.length;
  }

  hasRight(index: number): boolean {
    return this.right(index) < this.data.length;
  }

  upheap(index: number) {
    const parent = this.parent(index);
    if (index > 0 && this.data[index] < this.data[parent]) {
      [this.data[index], this.data[parent]] = [
        this.data[parent],
        this.data[index],
      ];
      this.upheap(parent);
    }
  }

  downHeap(index: number) {
    if (this.hasLeft(index)) {
      const left = this.left(index);
      let selected = left;
      if (this.hasRight(index)) {
        const right = this.right(index);
        if (this.data[right] < this.data[left]) {
          selected = right;
        }
      }
      if (this.data[selected] < this.data[index]) {
        [this.data[selected], this.data[index]] = [
          this.data[index],
          this.data[selected],
        ];
        this.downHeap(selected);
      }
    }
  }

  add(value: number) {
    this.data.push(value);
    this.upheap(this.data.length - 1);
  }

  delete(): number {
    if (this.data.length === 0) {
      return 0;
    }
    [this.data[0], this.data[this.data.length - 1]] = [
      this.data[this.data.length - 1],
      this.data[0],
    ];
    const value = this.data.pop()!;
    this.downHeap(0);
    return value;
  }
}

const source = __dirname + '\\input.txt';
const input = readFileSync(source).toString().trim().split('\n');

const heap = new Heap();

for (let index = 1; index < input.length; index++) {
  const number = Number(input[index].trim());
  if (number === 0) {
    const head = heap.delete();
    console.log(head);
  } else {
    heap.add(number);
  }
}
