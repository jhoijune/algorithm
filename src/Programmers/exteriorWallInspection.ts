import {} from 'module';

function* _permutationsUtil(
  arr: any[],
  num: number,
  curr: any[],
  visited: boolean[]
): IterableIterator<any[]> {
  if (curr.length !== num) {
    const size = arr.length;
    for (let index = 0; index < size; index++) {
      if (!visited[index]) {
        const concat = [...curr, arr[index]];
        visited[index] = true;
        for (const value of _permutationsUtil(arr, num, concat, visited)) {
          yield value;
        }
        visited[index] = false;
      }
    }
  } else {
    yield curr;
  }
}

function* permutations(arr: any[], num: number): IterableIterator<any[]> {
  const size = arr.length;
  if (num > size) {
    throw Error('Invalid input');
  }
  const visited = new Array(size).fill(false);
  for (const value of _permutationsUtil(arr, num, [], visited)) {
    yield value;
  }
}

const solution = (n: number, weak: number[], dist: number[]): number => {
  /**
   * 외벽점검
   * TODO: 다시 보기
   */
  dist.sort((a, b) => b - a);
  const size = weak.length;
  for (let index = 0; index < size - 1; index++) {
    weak.push(weak[index] + n);
  }
  let count = 1;
  while (count <= dist.length) {
    for (const distIndexs of permutations([...Array(count).keys()], count)) {
      for (let start = 0; start < size; start++) {
        let loc = start;
        for (const index of distIndexs) {
          const lower = weak[loc];
          while (loc < weak.length && weak[loc] - lower <= dist[index]) {
            loc += 1;
          }
        }
        if (loc - start >= size) {
          return count;
        }
      }
    }
    count += 1;
  }
  return -1;
};
