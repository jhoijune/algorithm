import {} from 'module';

const partition = (array: number[], start: number, end: number): number => {
  let pivot = array[start];
  let left = start + 1;
  let right = end;
  while (left <= right) {
    while (left <= right && array[left] < pivot) {
      left += 1;
    }
    while (left <= right && array[right] > pivot) {
      right -= 1;
    }
    if (left <= right) {
      const temp = array[left];
      array[left] = array[right];
      array[right] = temp;
      left += 1;
      right -= 1;
    }
  }
  const temp = array[start];
  array[start] = array[right];
  array[right] = temp;
  return right;
};

const quickSelect = (
  array: number[],
  start: number,
  end: number,
  k: number
): number => {
  if (start !== end) {
    const pivot = partition(array, start, end);
    if (k - 1 > pivot) {
      return quickSelect(array, pivot + 1, end, k);
    } else if (k - 1 < pivot) {
      return quickSelect(array, start, pivot - 1, k);
    } else {
      return array[pivot];
    }
  }
  return array[start];
};

const solution = (
  array: number[],
  commands: [number, number, number][]
): number[] => {
  /**
   * K번째 수
   * time complexity:  O(n)
   * space complexity:  O(n)
   */
  const result: number[] = [];
  for (const command of commands) {
    const sliced = array.slice(command[0] - 1, command[1]);
    const kth = quickSelect(sliced, 0, sliced.length - 1, command[2]);
    result.push(kth);
  }
  return result;
};
