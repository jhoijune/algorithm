class MapEntry<K, V> {
  #key: K;

  #value: V;

  constructor(key: K, value: V) {
    this.#key = key;
    this.#value = value;
  }

  getKey(): K {
    return this.#key;
  }

  getValue(): V {
    return this.#value;
  }

  setKey(key: K) {
    this.#key = key;
  }

  setValue(value: V): V {
    const old = this.#value;
    this.#value = value;
    return old;
  }
}

export default MapEntry;
