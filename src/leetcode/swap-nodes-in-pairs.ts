import ListNode from './ListNode';

const swapPairs = function (head: ListNode | null): ListNode | null {
  if (head === null) {
    return null;
  }
  let curr: ListNode | null = head;
  let ex: ListNode | null = null;
  const swappedHead = head.next;
  while (curr !== null && curr.next !== null) {
    const next: ListNode = curr.next;
    curr.next = next.next;
    next.next = curr;
    if (ex !== null) {
      ex.next = next;
    }
    ex = curr;
    curr = curr.next;
  }
  return swappedHead === null ? head : swappedHead;
};

const head = new ListNode(1);
let curr = head;
for (let num = 2; num <= 4; num++) {
  curr.next = new ListNode(num);
  curr = curr.next;
}

swapPairs(head);
