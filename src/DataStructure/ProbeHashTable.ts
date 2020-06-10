import HashTableBase, { Item } from './HashTableBase';

class ProbeHashTable<T, U> extends HashTableBase<T, U> {
  private _table: (null | object | Item<T, U>)[];

  private _AVAIL: object = {};

  constructor(capacity?: number, p?: number) {
    super(capacity, p);
    this._table = new Array(this._capacity).fill(null);
  }

  private _findSlot(index: number, key: T): [boolean, number] {
    let avail = null;
    while (true) {
      const item = this._table[index];
      if (item === null || item === this._AVAIL) {
        if (avail === null) {
          avail = index;
        }
        if (this._table[index] === null) {
          return [false, avail];
        }
      } else if (item instanceof Item && key === item.key) {
        return [true, index];
      }
      index = (index + 1) % this._table.length;
    }
  }

  _createTable() {
    this._table = new Array(this._capacity).fill(null);
  }

  _bucketGetitem(index: number, key: T): U | null {
    const [found, realIndex] = this._findSlot(index, key);
    if (!found) {
      return null;
    }
    return (this._table[realIndex] as Item<T, U>).value;
  }

  _bucketSetitem(index: number, key: T, value: U): boolean {
    const [found, realIndex] = this._findSlot(index, key);
    if (found) {
      const item = this._table[realIndex];
      if (item instanceof Item) {
        item.value = value;
        return false;
      }
    }
    this._table[realIndex] = new Item(key, value);
    this._n += 1;
    return true;
  }

  _bucketDelitem(index: number, key: T): boolean {
    const [found, realIndex] = this._findSlot(index, key);
    if (!found) {
      return false;
    }
    this._table[realIndex] = this._AVAIL;
    return true;
  }
}

export default ProbeHashTable;
