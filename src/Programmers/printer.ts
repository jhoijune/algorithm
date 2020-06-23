import {} from 'module';

const solution = (priorities: number[], location: number): number => {
  /**
   * 프린터
   * time complexity: O(nlogn)
   * space complexity: O(n)
   */
  const size = priorities.length;
  const sorted = [...priorities].sort((a, b) => a - b);
  const isPrinted = new Array<boolean>(size).fill(false);
  let index = 0;
  let priorityIndex = size - 1;
  let printCount = 0;
  while (!isPrinted[location]) {
    if (!isPrinted[index] && priorities[index] === sorted[priorityIndex]) {
      isPrinted[index] = true;
      priorityIndex -= 1;
      printCount += 1;
    }
    index = (index + 1) % size;
  }
  return printCount;
};
