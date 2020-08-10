import {} from 'module';

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

const mergeTwoLists = function (
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let list: null | ListNode = null;
  let p1: ListNode | null = l1;
  let p2: ListNode | null = l2;
  let curr: null | ListNode = null;
  while (p1 !== null || p2 !== null) {
    if (list === null) {
      list = new ListNode();
      curr = list;
    } else {
      curr!.next = new ListNode();
      curr = curr!.next;
    }
    if (p2 === null || (p1 !== null && p1.val < p2.val)) {
      curr.val = p1!.val;
      p1 = p1!.next;
    } else {
      curr.val = p2!.val;
      p2 = p2!.next;
    }
  }
  return list;
};
