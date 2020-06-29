import {} from 'module';

const solution = (m: string, musicinfos: string[]): string => {
  /**
   * 방금 그 곡
   * time complexity: O(n^2)
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
    if (time <= matched.time) {
      continue;
    }
    const notes = note.match(/[A-Z]#?/g)!;
    const noteLen = notes.length;
    for (let start = 0; start < time - tokens.length + 1; start++) {
      let count = 0;
      for (; count < tokens.length; count++) {
        if (notes[(start + count) % noteLen] !== tokens[count]) {
          break;
        }
      }
      if (count === tokens.length) {
        matched.time = time;
        matched.title = title;
        break;
      }
    }
  }
  return matched.title;
};

const computeFailure = (arr: any[]): number[] => {
  const size = arr.length;
  const fail = new Array<number>(size).fill(0);
  let i = 0;
  let j = 1;
  while (j < size) {
    if (arr[i] === arr[j]) {
      fail[j] = i + 1;
      i += 1;
      j += 1;
    } else if (i > 0) {
      i = fail[i - 1];
    } else {
      j += 1;
    }
  }
  return fail;
};

const solution2 = (m: string, musicinfos: string[]): string => {
  /**
   * KMP algorithm 버전
   */
  const matched: { time: number; title: string } = { time: 0, title: '(None)' };
  const tokens = m.match(/[A-Z]#?/g)!;
  const fail = computeFailure(tokens);
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
    if (time <= matched.time) {
      continue;
    }
    const notes = note.match(/[A-Z]#?/g)!;
    const noteLen = notes.length;
    let tokenIndex = 0;
    let noteIndex = 0;
    while (noteIndex < time) {
      if (tokens[tokenIndex] === notes[noteIndex % noteLen]) {
        if (tokenIndex === tokens.length - 1) {
          matched.time = time;
          matched.title = title;
          break;
        }
        tokenIndex += 1;
        noteIndex += 1;
      } else if (tokenIndex > 0) {
        tokenIndex = fail[tokenIndex - 1];
      } else {
        noteIndex += 1;
      }
    }
  }
  return matched.title;
};
