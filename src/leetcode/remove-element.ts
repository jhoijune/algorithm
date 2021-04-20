const removeElement = function (nums: number[], val: number) {
  const size = nums.length;
  let curr = 0;
  let insert = 0;
  while (curr < size) {
    if (nums[curr] !== val) {
      nums[insert] = nums[curr];
      insert += 1;
    }
    curr += 1;
  }
  nums.splice(insert, size - insert);
  return nums.length;
};
