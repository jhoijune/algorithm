/**
 * 왼쪽과 오른쪽에 있는 수가  정상적으로 정렬되어 있는지
 * @param left
 * @param right
 * @param isAscending
 */
const isSorted = (
  left: number,
  right: number,
  isAscending: boolean = true
): boolean => {
  if (isAscending) {
    return left < right;
  }
  return left > right;
};

export default isSorted;
export { isSorted };
