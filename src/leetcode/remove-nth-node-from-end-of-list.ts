/**
 * Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
 */

type ListNode = {
  val: number;
  next: null | ListNode;
};

const removeNthFromEnd = (
  head: ListNode | null,
  n: number
): ListNode | null => {
  let forward: ListNode | null = head;
  let behind: ListNode | null = head;
  let behind2: ListNode | null = null;
  for (let _ = 0; _ < n; _++) {
    forward = forward!.next;
  }
  while (forward !== null && behind !== null) {
    forward = forward.next;
    behind2 = behind;
    behind = behind.next;
  }
  if (behind2 === null) {
    head = head!.next;
  } else {
    behind2.next = behind2.next!.next;
  }
  return head;
};
