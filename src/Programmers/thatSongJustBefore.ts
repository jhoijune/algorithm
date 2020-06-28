import {} from 'module';

const solution = (m: string, musicinfos: string[]): string => {
  /**
   * 방금 그 곡
   *
   */
  const matched: { time: number; title: string } = { time: 0, title: '(None)' };
  const tokens = m.match(/[A-Z]#?/g)!;
  for (const musicInfo of musicinfos) {
    const [
      startHour,
      startMinute,
      endHour,
      endMinute,
      title,
      note,
    ] = musicInfo.split(/[,:]/g);
    const time =
      (Number(endHour) - Number(startHour)) * 60 +
      Number(endMinute) -
      Number(startMinute);
    const notes = note.match(/[A-Z]#?/g)!;
    const noteLen = notes.length;
    for (let start = 0; start < time - tokens.length + 1; start++) {
      let able = true;
      for (let count = 0; count < tokens.length; count++) {
        if (notes[(start + count) % noteLen] !== tokens[count]) {
          able = false;
          break;
        }
      }
      if (able) {
        if (matched.time < time) {
          matched.time = time;
          matched.title = title;
        }
        break;
      }
    }
  }
  return matched.title;
};
