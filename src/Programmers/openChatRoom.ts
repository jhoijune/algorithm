import {} from 'module';

const solution = (record: string[]) => {
  /**
   * 오픈 채팅방
   * time complexity: O(n)
   * space complexity: O(n)
   */
  const idMap = new Map<string, string>();
  for (const value of record) {
    const [action, id, nickname] = value.split(' ');
    if (action === 'Enter' || action === 'Change') {
      idMap.set(id, nickname);
    }
  }
  const answer: string[] = [];
  for (const value of record) {
    const [action, id] = value.split(' ');
    const nickname = idMap.get(id)!;
    if (action === 'Enter') {
      answer.push(`${nickname}님이 들어왔습니다.`);
    } else if (action === 'Leave') {
      answer.push(`${nickname}님이 나갔습니다.`);
    }
  }
  return answer;
};
