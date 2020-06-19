import ArrayQueue from './ArrayQueue';
import GeneralTree from './GeneralTree';
import Heap from './Heap';
import LinkedBinaryTree from './LinkedBinaryTree';
import NumberHeap from './NumberHeap';
import Position from './Position';

// TODO:  타입인 Position도 union에 묶이게
const union = {
  ArrayQueue,
  GeneralTree,
  Heap,
  LinkedBinaryTree,
  NumberHeap,
};

export default union;
export {
  ArrayQueue,
  GeneralTree,
  Heap,
  LinkedBinaryTree,
  Position,
  NumberHeap,
};
