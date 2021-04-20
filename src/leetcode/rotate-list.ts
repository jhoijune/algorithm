import ListNode from './ListNode';

const rotateRight = function (head: ListNode, k: number) {
  let size = 0;
  let curr: null | ListNode = head;
  while (curr !== null) {
    size += 1;
    curr = curr.next;
  }
  k = k % size;
  if (isNaN(k) || k === 0) {
    return head;
  }
  let count = 0;
  curr = head;
  while (count < size - k - 1) {
    count += 1;
    curr = curr!.next;
  }
  const newHead = curr!.next!;
  curr!.next = null;
  curr = newHead;
  while (curr.next !== null) {
    curr = curr.next;
  }
  curr.next = head;
  return newHead;
};
