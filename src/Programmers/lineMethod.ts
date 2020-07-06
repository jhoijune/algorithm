import {} from 'module';

const solution = (n: number, k: number) => {
  const used = new Array<boolean>(n).fill(false);
  let factorial = [...Array(n - 1).keys()].reduce(
    (prev, curr) => prev * (curr + 1),
    1
  );
  let curr = 0;
  const answer: number[] = [];
  while (k > 0) {
    if (k > factorial) {
      k -= factorial;
      curr = (curr + 1) % n;
      while (used[curr]) {
        curr = (curr + 1) % n;
      }
    } else if (k === factorial) {
      k -= factorial;
      used[curr] = true;
      answer.push(curr + 1);
      curr = n - 1;
      while (curr >= 0) {
        if (!used[curr]) {
          answer.push(curr + 1);
          used[curr] = true;
        }
        curr -= 1;
      }
    } else if (k < factorial) {
      used[curr] = true;
      answer.push(curr + 1);
      factorial = factorial / (n - answer.length);
      curr = 0;
      while (used[curr]) {
        curr = (curr + 1) % n;
      }
    }
  }
  return answer;
};

console.log(solution(3, 5));
