import HashTableBase, { Item } from './HashTableBase';

class ChainHashTable<T, U> extends HashTableBase<T, U> {
  private _table: (null | Item<T, U>[])[];

  constructor(capacity?: number, p?: number) {
    super(capacity, p);
    this._table = new Array(this._capacity).fill(null);
  }

  _createTable() {
    this._table = new Array(this._capacity).fill(null);
  }

  _bucketGetitem(index: number, key: T): U | null {
    const bucket = this._table[index];
    if (bucket === null) {
      return null;
    }
    for (const item of bucket) {
      if (item.key === key) {
        return item.value;
      }
    }
    return null;
  }

  _bucketSetitem(index: number, key: T, value: U): boolean {
    if (this._table[index] === null) {
      this._table[index] = new Array<Item<T, U>>();
    }
    const bucket = this._table[index]!;
    for (const item of bucket) {
      if (item.key === key) {
        item.value = value;
        return false;
      }
    }
    bucket.push(new Item(key, value));
    this._n += 1;
    return true;
  }

  _bucketDelitem(index: number, key: T): boolean {
    const bucket = this._table[index];
    if (bucket === null) {
      return false;
    }
    const toDelete = bucket.findIndex((item) => item.key === key);
    if (toDelete === -1) {
      return false;
    }
    bucket.splice(toDelete, 1);
    return true;
  }
}

export default ChainHashTable;
