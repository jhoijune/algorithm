import {} from 'module';

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

const solution = (relation: string[][]): number => {
  /**
   * 후보키
   *
   */
  const rowLen = relation.length;
  const colLen = relation[0].length;
  const set = new Set<string>();
  const superSet: number[][] = [];
  for (let num = 1; num <= colLen; num++) {
    for (const indexs of combinations([...Array(colLen).keys()], num)) {
      let row = 0;
      while (row < rowLen) {
        const temp = [];
        for (const index of indexs) {
          temp.push(relation[row][index]);
        }
        const concat = temp.join(' ');
        if (set.has(concat)) {
          break;
        }
        set.add(concat);
        row += 1;
      }
      if (row === rowLen) {
        superSet.push(indexs);
      }
      set.clear();
    }
  }
  let answer = 0;
  const size = superSet.length;
  for (let index = 0; index < size; index++) {
    let count = 1;
    while (count < size) {
      const mod = (index + count) % size;
      if (superSet[mod].every((value) => superSet[index].includes(value))) {
        break;
      }
      count += 1;
    }
    if (count === size) {
      answer += 1;
    }
  }
  return answer;
};
