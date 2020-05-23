/*
In given integer list that support three functions findMin, findMax, findMedian. Sort the array
*/

import { createRandomArray } from '../../Util';

class SpecialArray extends Array<number> {
  constructor(...args: number[]) {
    super(...args);
  }

  findMin(): number {
    if (this.length === 0) {
      throw Error('Array length is zero');
    }
    let [minValue] = this;
    for (const num of this) {
      if (num < minValue) {
        minValue = num;
      }
    }
    return minValue;
  }

  findMax(): number {
    if (this.length === 0) {
      throw Error('Array length is zero');
    }
    let [maxValue] = this;
    for (const num of this) {
      if (num > maxValue) {
        maxValue = num;
      }
    }
    return maxValue;
  }

  findMedian(): number {
    if (this.length === 0) {
      throw Error('Array length is zero');
    }
    const copied = [...this];
    const size = copied.length;
    copied.sort((left, right) => left - right);
    if (size % 2 === 0) {
      const midR = size / 2;
      const midL = midR - 1;
      return (copied[midL] + copied[midR]) / 2;
    } else {
      const mid = Math.floor(size / 2);
      return copied[mid];
    }
  }
}

(() => {
  const arr = new SpecialArray(...createRandomArray(100, 100));
  console.log(arr);
  console.log(arr.findMin());
  console.log(arr.findMax());
  console.log(arr.findMedian());
})();
