import {} from 'module';

const solution = (seoul: string[]): string => {
  /**
   * 서울에서 김서방 찾기
   * time complexity: O(n)
   */
  const index = seoul.indexOf('Kim');
  return `김서방은 ${index}에 있다`;
};
