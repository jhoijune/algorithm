function* _combinationsUtil(
  arr: any[],
  num: number,
  curr: any[],
  start: number
): IterableIterator<any[]> {
  if (curr.length !== num && arr.length - start >= num - curr.length) {
    const size = arr.length;
    for (let index = start; index < size; index++) {
      const concat = [...curr, arr[index]];
      for (const value of _combinationsUtil(arr, num, concat, index + 1)) {
        yield value;
      }
    }
  } else if (curr.length === num) {
    yield curr;
  }
}

function* combinations(arr: any[], num: number): IterableIterator<any[]> {
  if (num > arr.length) {
    throw Error('Invalid input');
  }
  for (const value of _combinationsUtil(arr, num, [], 0)) {
    yield value;
  }
}

export { combinations };
