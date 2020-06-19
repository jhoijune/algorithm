class Item<T, U> {
  constructor(public key: T, public value: U) {}
}

abstract class HashTableBase<T, U> {
  protected _capacity: number;

  protected _keys: T[] = [];

  protected _values: U[] = [];

  protected _n: number = 0;

  private _prime: number;

  private _scale: number;

  private _shift: number;

  constructor(capacity: number = 11, p: number = 109345121) {
    this._capacity = capacity;
    this._prime = p;
    this._scale = 1 + Math.floor(Math.random() * p);
    this._shift = Math.floor(Math.random() * p);
  }

  protected abstract _createTable(): void;

  protected abstract _bucketGetitem(index: number, key: T): U | null;

  protected abstract _bucketSetitem(index: number, key: T, value: U): boolean;

  protected abstract _bucketDelitem(index: number, key: T): boolean;

  *entries(): IterableIterator<[T, U]> {
    const size = this._keys.length;
    for (let index = 0; index < size; index++) {
      yield [this._keys[index], this._values[index]];
    }
  }

  *keys(): IterableIterator<T> {
    for (const key of this._keys) {
      yield key;
    }
  }

  *values(): IterableIterator<U> {
    for (const value of this._values) {
      yield value;
    }
  }

  *[Symbol.iterator](): IterableIterator<[T, U]> {
    for (const [key, value] of this.entries()) {
      yield [key, value];
    }
  }

  private _hashFunction(key: any): number {
    const stringified = JSON.stringify(key);
    let hashCode = 0;
    for (const char of stringified) {
      const charCode = char.charCodeAt(0);
      hashCode = (hashCode << 5) - hashCode + charCode;
      hashCode |= 0;
    }
    return (
      ((hashCode * this._scale + this._shift) % this._prime) % this._capacity
    );
  }

  size(): number {
    return this._n;
  }

  get(key: T): U | null {
    const num = this._hashFunction(key);
    return this._bucketGetitem(num, key);
  }

  has(key: T): boolean {
    const num = this._hashFunction(key);
    if (this._bucketGetitem(num, key) === null) {
      return false;
    }
    return true;
  }

  set(key: T, value: U) {
    const num = this._hashFunction(key);
    const isCreated = this._bucketSetitem(num, key, value);
    if (isCreated) {
      this._keys.push(key);
      this._values.push(value);
    } else {
      const index = this._keys.indexOf(key);
      this._values[index] = value;
    }
    if (this._n > Math.floor(this._capacity / 2)) {
      this._resize(2 * this._capacity - 1);
    }
  }

  del(key: T): boolean {
    const num = this._hashFunction(key);
    const isDeleted = this._bucketDelitem(num, key);
    if (isDeleted) {
      const toDelete = this._keys.indexOf(key);
      this._keys.splice(toDelete, 1);
      this._values.splice(toDelete, 1);
      this._n -= 1;
      return true;
    }
    return false;
  }

  _resize(capacity: number) {
    const keys = [...this._keys];
    const values = [...this._values];
    const size = keys.length;
    this._keys = [];
    this._values = [];
    this._capacity = capacity;
    this._createTable();
    this._n = 0;
    for (let index = 0; index < size; index++) {
      this.set(keys[index], values[index]);
    }
  }
}

export default HashTableBase;
export { Item };
