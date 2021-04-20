import AbstractMap from './AbstractMap';

abstract class AbstractHashMap<K, V> extends AbstractMap<K, V> {
  protected n: number = 0;

  protected capacity: number;

  #prime: number;

  #scale: number;

  #shift: number;

  constructor(cap: number = 17, p: number = 109345121) {
    super();
    this.#prime = p;
    this.capacity = cap;
    this.#scale = 1 + Math.floor(Math.random() * p);
    this.#shift = Math.floor(Math.random() * p);
    this._createTable();
  }

  protected abstract _createTable(): void;

  protected abstract _bucketGet(hash: number, key: K): V | undefined;

  protected abstract _bucketSet(hash: number, key: K, value: V): V | undefined;

  protected abstract _bucketRemove(hash: number, key: K): V | undefined;

  size(): number {
    return this.n;
  }

  get(key: K): V | undefined {
    return this._bucketGet(this._hashValue(key), key);
  }

  delete(key: K): V | undefined {
    return this._bucketRemove(this._hashValue(key), key);
  }

  set(key: K, value: V): V | undefined {
    const ex = this._bucketSet(this._hashValue(key), key, value);
    if (this.n > this.capacity / 2) {
      this._resize(2 * this.capacity - 1);
    }
    return ex;
  }

  private _hashValue(key: K): number {
    const stringified = JSON.stringify(key);
    let hashCode = 0;
    for (const char of stringified) {
      const charCode = char.charCodeAt(0);
      hashCode = (hashCode << 5) - hashCode + charCode;
      hashCode |= 0;
    }
    return (
      ((hashCode * this.#scale + this.#shift) % this.#prime) % this.capacity
    );
  }

  private _resize(newCap: number): void {
    const buffer: [K, V][] = [];
    for (const entry of this.entries()) {
      buffer.push(entry);
    }
    this.capacity = newCap;
    this._createTable();
    this.n = 0;
    for (const [key, value] of buffer) {
      this.set(key, value);
    }
  }

  has(key: K): boolean {
    return !!this._bucketGet(this._hashValue(key), key);
  }
}

export default AbstractHashMap;
