import {} from 'module';

const solution = (arr: number[]) => {
  /**
   * 같은 숫자는 싫어
   * time complexty: O(n)
   * space complexity: O(n)
   */
  const size = arr.length;
  const answer: number[] = [];
  let [curr] = arr;
  answer.push(curr);
  for (let index = 0; index < size; index++) {
    if (curr !== arr[index]) {
      curr = arr[index];
      answer.push(curr);
    }
  }
  return answer;
};
