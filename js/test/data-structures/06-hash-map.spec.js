const HashMap = require("../../src/data-structures/06-hash-map");

describe("HashMap Suite:", () => {
    const key = 'key';
    const value = 999;

    test("Should keep count of items inserted", () => {
        const map = HashMap();
        expect(map.count()).toEqual(0);
    });

    test("get() and set() should work", () => {
        const map = HashMap();
        const key_value = 'str';
        map.set(key_value, key_value)
        expect(map.get(key_value)).toEqual(key_value);
    });

    test("map.get() should return null if no matching keys", () => {
        const map = HashMap();
        expect(map.get(key)).toBeNull();
    });

    test("map.set() should throw error if key isnt truthy", () => {
        const map = HashMap();
        expect(() => map.set(null, value)).toThrow();
    });

    // should it?
    // test("set() should throw error if key-value pair isnt unique", () => {
    //     const map = HashMap();
    //     map.set(key, value);
    //     expect(() => map.set(key, value)).toThrow();
    // });

    test("get() should return first element if duplicate keys", () => {
        const map = HashMap();
        const _key = { a: 'a', b: 'b' };
        map.set(_key, _key);
        map.set({ b: _key.b, ..._key }, 1);
        expect(map.get(_key)).toEqual(_key)
    });

    test("map.set(k, v) should increase count", () => {
        const map = HashMap();
        map.set(key, value)

        expect(map.count()).toEqual(1);
        expect(map.get(key)).toEqual(value);
    });

    test("map.set(k, v) should increase count", () => {
        const map = HashMap();
        map.set(key, value);
        map.set(value, key);

        expect(map.size()).toEqual(2);

        map.clear();
        expect(map.size()).toEqual(0);
    });

    test("map.remove(key) should return true on success, else false", () => {
        const map = HashMap();
        map.set(key, value)

        expect(map.remove(key)).toEqual(true);
        expect(map.remove(11)).toEqual(false);
    });

    test("map.remove(key) should decrease count", () => {
        const map = HashMap();
        map.set(key, value)
        map.set(1, 2)

        let count = map.count();

        expect(map.remove(key)).toEqual(true);
        expect(map.count()).toEqual(--count);

        expect(map.remove(1)).toEqual(true);
        expect(map.size()).toEqual(--count);
    });

    test("map.remove(non_existing_key) should return false ", () => {
        const map = HashMap();
        expect(map.remove('non_existing_key')).toEqual(false);
    });

    test("Should be iterable and order preserved", () => {
        const map = HashMap();
        const arr = [0, 1, 2, 3];

        arr.forEach(item => map.set(item, item));
        const new_arr = []

        for (val of map) {
            new_arr.push(val);
        }

        expect(new_arr).toEqual(arr);
    });

    test("Should deal with hash collisions", () => {
        const map = HashMap();
        const expected_length = 10000;
        for (let i = 0; i <= expected_length - 1; i++) {
            map.set(i, i);
        }

        expect(map.count()).toEqual(expected_length);
    });
});