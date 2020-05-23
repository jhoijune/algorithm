/*
In given text file, print the words with their frequency. Now print the kth word in term of frequency.
*/

import { swap } from '../../Util';

type Item = { word: string; count: number };

const partition = (arr: Item[], start: number, end: number): number => {
  let pivot = arr[start].count;
  let left = start + 1;
  let right = end;
  while (left <= right) {
    while (left <= right && arr[left].count < pivot) {
      left += 1;
    }
    while (left <= right && arr[right].count > pivot) {
      right -= 1;
    }
    if (left <= right) {
      swap(arr, left, right);
      left += 1;
      right -= 1;
    }
  }
  swap(arr, start, right);
  return right;
};

const QuickSelectModificationUtil = (
  arr: Item[],
  start: number,
  end: number,
  k: number
): string => {
  if (start !== end) {
    const pivot = partition(arr, start, end);
    if (k - 1 < pivot) {
      return QuickSelectModificationUtil(arr, start, pivot - 1, k);
    } else if (k - 1 > pivot) {
      return QuickSelectModificationUtil(arr, pivot + 1, end, k);
    } else {
      return arr[pivot].word;
    }
  }
  return arr[start].word;
};

const QuickSelectModification = (arr: Item[], k: number): string => {
  const size = arr.length;
  if (!Number.isInteger(k)) {
    throw Error('k is not integer');
  }
  if (k > size || k < 1) {
    throw RangeError('k is not in range');
  }
  return QuickSelectModificationUtil(arr, 0, size - 1, k);
};

const ex01 = (text: string, k: number): string => {
  // text를 split하고
  // 순회하면서 map에 저장
  // map의 키로 순회하면서 {word:string,count:number}[]로 생성
  // 퀵선택 활용해서 k번째 것을 찾음
  const words = text.split(' ');
  const ht: Map<string, number> = new Map();
  for (const word of words) {
    let modified = word.replace(/('s)|["',.?!;/]/g, '');
    if (ht.has(modified)) {
      const exCount = ht.get(modified)!;
      ht.set(modified, exCount + 1);
    } else {
      ht.set(modified, 1);
    }
  }
  const arr: Item[] = [];
  for (const word of ht.keys()) {
    arr.push({ word, count: ht.get(word)! });
  }
  return QuickSelectModification(arr, k);
};

(() => {
  const text =
    "President Donald Trump's administration has made a show of donating his quarterly salary since he took office, but Friday's big reveal went a little too far.White House press secretary Kayleigh McEnany kicked off the press briefing by announcing that Trump would donate $100,000 to the U.S. Department of Health and Human Services to develop new therapies for treating and preventing coronavirus.\"Here is the check,\" she said before holding up what appeared to be a real Capital One check bearing not just the president's name and signature, but also his bank information.Clearly visible was an address for his Mar-a-Lago resort in Florida and other personal details, like accounting and routing numbers.";
  console.log(ex01(text, 5));
})();
