const fourSum = function (nums: number[], target: number) {
  const count = new Map<number, number>();
  for (const num of nums) {
    const ex = count.get(num);
    if (ex === undefined) {
      count.set(num, 1);
    } else {
      count.set(num, ex + 1);
    }
  }
  const arr = Array.from(count);
  const size = arr.length;
  arr.sort(([a], [b]) => a - b);
  const answer: number[][] = [];
  const duplicateCheck = new Set<string>();
  const DFS = function (start: number, sum: number, curr: number[]) {
    if (curr.length === 4) {
      if (sum === target) {
        const concat = curr.join();
        if (!duplicateCheck.has(concat)) {
          duplicateCheck.add(concat);
          answer.push([...curr]);
        }
      }
      return;
    }
    for (let index = start; index < size; index++) {
      let count = 0;
      for (const num of curr) {
        if (arr[index][0] === num) {
          count += 1;
        }
      }
      if (count + 1 <= arr[index][1]) {
        curr.push(arr[index][0]);
        DFS(index, sum + arr[index][0], curr);
        curr.pop();
      }
    }
  };
  DFS(0, 0, []);
  return answer;
};

fourSum([1, -2, -5, -4, -3, 3, 3, 5], -11);
