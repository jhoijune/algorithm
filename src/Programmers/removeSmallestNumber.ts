import {} from 'module';

const solution = (arr: number[]) => {
  /**
   * 제일 작은수 제거하기
   * time complexity: O(n)
   */
  const size = arr.length;
  let minIndex = 0;
  for (let index = 1; index < size; index++) {
    if (arr[minIndex] > arr[index]) {
      minIndex = index;
    }
  }
  arr.splice(minIndex, 1);
  return size === 1 ? [-1] : arr;
};
