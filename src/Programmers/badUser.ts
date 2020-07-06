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

const solution = (user_id: string[], banned_id: string[]): number => {
  const size = banned_id.length;
  const regexs = banned_id.map(
    (value) => new RegExp(value.replace(/\*/g, '[a-z0-9]'))
  );
  let answer = 0;
  for (const combination of combinations(user_id, size)) {
    for (const ids of permutations(combination, size)) {
      let index = 0;
      for (; index < size; index++) {
        if (
          ids[index].length !== banned_id[index].length ||
          !regexs[index].test(ids[index])
        ) {
          break;
        }
      }
      if (index === size) {
        answer += 1;
        break;
      }
    }
  }
  return answer;
};
