import ListNode from './ListNode';

const addTwoNumbers = function (l1: ListNode, l2: ListNode): ListNode {
  const dummyHead = new ListNode();
  let p = dummyHead;
  let p1: null | ListNode = l1;
  let p2: null | ListNode = l2;
  let carry = 0;
  while (p1 !== null || p2 !== null) {
    const sum = (p1 === null ? 0 : p1.val) + (p2 === null ? 0 : p2.val) + carry;
    carry = Math.floor(sum / 10);
    p.next = new ListNode(sum % 10);
    p = p.next;
    if (p1 !== null) {
      p1 = p1.next;
    }
    if (p2 !== null) {
      p2 = p2.next;
    }
  }
  if (carry > 0) {
    p.next = new ListNode(carry);
  }
  return dummyHead.next!;
};
