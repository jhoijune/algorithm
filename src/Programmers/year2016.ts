import {} from 'module';

const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const solution = (a: number, b: number): typeof day[number] => {
  /**
   * 2016년
   * time complexity: O(a)
   * space complexity: O(1)
   */
  if (!Number.isInteger(a) || a < 1 || a > 12) {
    throw Error('Invalid input');
  }
  if (!Number.isInteger(b) || b <= 0 || b > days[a]) {
    throw Error('Invalid input');
  }
  let sum = b;
  for (let month = 0; month < a - 1; month++) {
    sum += days[month];
  }
  return day[(sum + 4) % 7];
};

const solution2 = (a: number, b: number): typeof day[number] => {
  const date = new Date(2016, a - 1, b);
  const index = date.getDay();
  return day[index];
};
