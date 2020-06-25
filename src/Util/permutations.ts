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

export { permutations };
