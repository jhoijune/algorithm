const ArrayIndexMaxDiff1 = (arr: number[]) => {
  const size = arr.length;
  let maxDiff = -1;
  let j;
  for (let i = 0; i < size; i++) {
    j = size - 1;
    while (j > i) {
      if (arr[j] > arr[i]) {
        maxDiff = Math.max(maxDiff, j - i);
        break;
      }
      j -= 1;
    }
  }
  return maxDiff;
};

// 독특한 발상

const ArrayIndexMaxDiff2 = (arr: number[]) => {
  const size = arr.length;
  const leftMin: number[] = new Array(size); // 특정 index에서의 값은 처음부터 현재까지 최소값이다.
  const rightMax: number[] = new Array(size); // 특정 index에서의 값은 현재부터 끝까지의 최대값이다.
  leftMin[0] = arr[0];
  let i;
  let j;
  let maxDiff = -1;
  for (i = 1; i < size; i++) {
    if (leftMin[i - 1] < arr[i]) {
      leftMin[i] = leftMin[i - 1];
    } else {
      leftMin[i] = arr[i];
    }
  }
  rightMax[size - 1] = arr[size - 1];
  for (i = size - 2; i >= 0; i--) {
    if (rightMax[i + 1] > arr[i]) {
      rightMax[i] = rightMax[i + 1];
    } else {
      rightMax[i] = arr[i];
    }
  }
  i = 0;
  j = 0;
  while (j < size && i < size) {
    if (leftMin[i] < rightMax[j]) {
      maxDiff = Math.max(maxDiff, j - i);
      j = j + 1;
    } else {
      i = i + 1;
    }
  }
  return maxDiff;
};
