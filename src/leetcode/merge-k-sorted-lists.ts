import ListNode from './ListNode';

const mergeKLists = function (lists: (ListNode | null)[]): ListNode {
  const size = lists.length;
  const dummyHead = new ListNode();
  let pointer = dummyHead;
  while (true) {
    let selected = -1;
    for (let index = 0; index < size; index++) {
      const list = lists[index];
      if (
        list !== null &&
        (selected === -1 || list.val < lists[selected]!.val)
      ) {
        selected = index;
      }
    }
    if (selected === -1) {
      break;
    }
    pointer.next = new ListNode(lists[selected]!.val);
    pointer = pointer.next;
    lists[selected] = lists[selected]!.next;
  }
  return dummyHead.next!;
};
