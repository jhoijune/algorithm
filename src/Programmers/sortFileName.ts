import {} from 'module';

const swap = (arr: any[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const solution = (files: string[]): string[] => {
  /**
   * 파일명 정렬
   * time complexity: O(n^2)
   * space complexity: O(n)
   */
  const size = files.length;
  const answer = [...files];
  const modified: { head: string; number: number }[] = [];
  files.forEach((file) => {
    const [head, number] = file.match(/[a-zA-Z-\. ]+|\d+/g)!;
    modified.push({ head: head.toLowerCase(), number: Number(number) });
  });
  for (let limit = size - 1; limit > 0; limit--) {
    for (let index = 0; index < limit; index++) {
      if (modified[index].head < modified[index + 1].head) {
        continue;
      } else if (modified[index].head > modified[index + 1].head) {
        swap(modified, index, index + 1);
        swap(answer, index, index + 1);
        continue;
      }
      if (modified[index].number > modified[index + 1].number) {
        swap(modified, index, index + 1);
        swap(answer, index, index + 1);
      }
    }
  }
  return answer;
};
