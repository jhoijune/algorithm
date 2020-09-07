function* _permutationsUtil<T>(
  arr: T[],
  num: number,
  curr: T[],
  visited: boolean[]
): IterableIterator<T[]> {
  if (curr.length !== num) {
    const size = arr.length;
    for (let index = 0; index < size; index++) {
      if (!visited[index]) {
        curr.push(arr[index]);
        visited[index] = true;
        for (const value of _permutationsUtil(arr, num, curr, visited)) {
          yield value;
        }
        curr.pop();
        visited[index] = false;
      }
    }
  } else {
    yield curr;
  }
}

function* permutations<T>(arr: T[], num: number): IterableIterator<T[]> {
  const size = arr.length;
  if (num > size) {
    throw Error('Invalid input');
  }
  const visited = new Array(size).fill(false);
  for (const value of _permutationsUtil(arr, num, [], visited)) {
    yield value;
  }
}

export { permutations };
