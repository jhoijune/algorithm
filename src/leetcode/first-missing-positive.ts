const firstMissingPositive = function (nums: number[]) {
  const size = nums.length;
  let index = 0;
  while (index < size) {
    const num = nums[index];
    if (num <= 0 || num > size) {
      nums[index] = 0;
      index += 1;
    } else if (num !== index + 1) {
      if (nums[index] === nums[num - 1]) {
        nums[index] = 0;
        index += 1;
      } else {
        [nums[index], nums[num - 1]] = [nums[num - 1], nums[index]];
      }
    } else {
      index += 1;
    }
  }
  for (let index = 0; index < size; index++) {
    if (nums[index] === 0) {
      return index + 1;
    }
  }
  return size + 1;
};

firstMissingPositive([1, 2, 0]);
