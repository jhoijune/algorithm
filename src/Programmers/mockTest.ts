import {} from 'module';

const solution = (answers: number[]): number[] => {
  /**
   * 모의고사
   * time complexity: O(n)
   * space complexity: O()
   */
  const persons = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];
  const sizes = persons.map((value) => value.length);
  const indexs = new Array<number>(persons.length).fill(0);
  const score = new Array<number>(persons.length).fill(0);
  for (const answer of answers) {
    for (let th = 0; th < persons.length; th++) {
      const person = persons[th];
      const index = indexs[th];
      if (person[index] === answer) {
        score[th] = score[th] + 1;
      }
      indexs[th] = (index + 1) % sizes[th];
    }
  }
  const max = Math.max(...score);
  const result: number[] = [];
  score.forEach((value, index) => {
    if (value === max) {
      result.push(index + 1);
    }
  });
  return result;
};
