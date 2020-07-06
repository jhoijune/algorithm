import {} from 'module';

const solution = (
  n: number,
  t: number,
  m: number,
  timetable: string[]
): string => {
  let times = timetable.map((time) => {
    const [hour, minute] = time.split(':');
    return Number(hour) * 60 + Number(minute);
  });
  times.sort((a, b) => b - a);
  let count = 1;
  let time = 60 * 9 - t;
  while (count <= n) {
    let limit = count === n ? m - 1 : m;
    for (let _ = 0; _ < limit; _++) {
      if (times[times.length - 1] <= time) {
        times.pop();
      } else {
        break;
      }
    }
    count += 1;
    time += t;
  }
  let selected;
  if (times.length === 0) {
    selected = time;
  } else if (times[times.length - 1] > time) {
    selected = time;
  } else {
    selected = times[times.length - 1] - 1;
  }
  const answer =
    Math.floor(selected / 60)
      .toString()
      .padStart(2, '0') +
    ':' +
    String(selected % 60).padStart(2, '0');
  return answer;
};
