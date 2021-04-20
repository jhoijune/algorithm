const removeDuplicates = function (nums: number[]) {
  const size = nums.length;
  let curr = 1;
  let insert = 1;
  while (curr < size) {
    if (nums[insert - 1] !== nums[curr]) {
      nums[insert] = nums[curr];
      insert += 1;
    }
    curr += 1;
  }
  nums.splice(insert, size - insert);
  return nums.length;
};
