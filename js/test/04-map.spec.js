const my_map = require("../src/04-map");

describe("Map Suite:", () => {
    test("map.has() should return true if key is present; false otherwise", () => {
        const map = my_map();
        map.set(1, 2)
        expect(map.has(1)).toBe(true);
        expect(map.has(2)).toBe(false);
    });

    test("map.get() should return value if key is present; null otherwise", () => {
        const map = my_map();
        map.set(1, 2)
        expect(map.get(1)).toBe(2);
    });

    test("map.size() should return number of entries", () => {
        const map = my_map();
        map.set(1, 2)
        expect(map.size()).toBe(1);
    });

    test("map.clear() should clear all entries", () => {
        const map = my_map();
        map.set(1, 2)
        map.set(2, 2)
        map.set(3, 2)
        map.clear();
        expect(map.size()).toBe(0);
    });

    test("map.entries() should deep equal original object", () => {
        const map = my_map();
        const obj = { 1: 'a', 'potato': 2, 'c': 'c' };

        Object.keys(obj).forEach(key => map.set(key, obj[key]));
        expect(map.entries()).toEqual(obj);
    });

    test("map.delete() should return true if item deleted, false otherwise", () => {
        const map = my_map();
        const obj = { 1: 'a', 'potato': 2, 'c': 'c' };

        Object.keys(obj).forEach(key => map.set(key, obj[key]));

        expect(map.has('potato')).toBe(true);
        expect(map.delete('potato')).toBe(true);

        expect(map.has('potato')).toBe(false);
        expect(map.delete('potato')).toBe(false);
    });

    test("keys(), entries(), values() should return keys, entries, values", () => {
        const map = my_map();
        const obj = { 1: 'a', 'potato': 2, 'c': 'c' };

        const values = [];

        Object.keys(obj).forEach(key => {
            values.push(obj[key]);
            map.set(key, obj[key]);
        })

        expect(map.keys()).toEqual(Object.keys(obj));
        expect(map.values()).toEqual(values);
        expect(map.entries()).toEqual(obj);
    });


    test("Map should be iterable over values", () => {
        const map = my_map();
        const arr = [5, 6, 7, 8];

        arr.forEach((item, idx) => map.set(idx, item));

        const new_arr = []

        for (value of map) {
            new_arr.push(value);
        }

        expect(new_arr).toEqual(arr);
    });
});