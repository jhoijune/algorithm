import {} from 'module';

const solution = (numbers: string) => {
  /**
   * 소수 찾기
   * TODO: 순열 알고리즘
   */
  const size = numbers.length;
  const set = new Set<number>();
  const visited = new Array(size).fill(false);
  let count = 0;
  const permutation = (curr: string, start: number) => {
    if (!visited.every((value) => value)) {
      let index = (start + 1) % size;
      while (index !== start) {
        if (!visited[index]) {
          const concat = curr + numbers[index];
          count += 1;
          set.add(Number(concat));
          visited[index] = true;
          permutation(concat, index);
          visited[index] = false;
        }
        index = (index + 1) % size;
      }
    }
  };
  for (let index = 0; index < size; index++) {
    count += 1;
    set.add(Number(numbers[index]));
    visited[index] = true;
    permutation(numbers[index], index);
    visited[index] = false;
  }
  let answer = 0;
  for (const num of set.keys()) {
    const limit = Math.floor(Math.sqrt(num));
    if (num === 2 || num === 3) {
      answer += 1;
    }
    for (let div = 2; div <= limit; div++) {
      if (num % div === 0) {
        break;
      }
      if (div === limit) {
        answer += 1;
      }
    }
  }
  return answer;
};

console.log(solution('1234567'));
