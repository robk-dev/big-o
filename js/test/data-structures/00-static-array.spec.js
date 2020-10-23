const array = require("../../src/data-structures/00-static-array");

describe("Static Array test suite:", () => {
    test("New array should be empty if no parameters passed", () => {
        const arr = array();
        expect(arr.size()).toBe(0);
        expect(arr.isEmpty()).toBe(true);
    });

    test("array.add() should increase size", () => {
        const arr = array();
        expect(arr.size()).toBe(0);
        arr.add(1);
        expect(arr.size()).toBe(1);
        expect(arr.isEmpty()).toBe(false);
    });


    test("capacity should double when reached on adding, should handle 0", () => {
        const arr = array(0);
        expect(arr.size()).toBe(0);
        arr.add(1);
        arr.add(2);
        arr.add(3);
        expect(arr.size()).toBe(3);
    });

    test("array should be 0 indexed and should return elements", () => {
        const arr = array(0);
        expect(arr.size()).toBe(0);
        arr.add(1);
        expect(arr.get(0)).toBe(1);
    });

    
    test("array.set(index, elem) should overwrite existing elements", () => {
        const arr = array(0);
        expect(arr.size()).toBe(0);
        arr.add(1);
        expect(arr.get(0)).toBe(1);
        arr.set(0, 5);
        expect(arr.get(0)).not.toBe(1);
        expect(arr.get(0)).toBe(5);
    });

    test("array.clear() should set all values to null and update length", () => {
        const arr = array(0);
        expect(arr.size()).toBe(0);
        arr.add(1);
        arr.add(2);
        expect(arr.size()).toBe(2);
        arr.clear();
        expect(arr.size()).toBe(0);
    });

    test("array.removeAt(index) should remove element, update size and return it", () => {
        const arr = array(0);
        expect(arr.size()).toBe(0);
        arr.add(1);
        expect(arr.removeAt(0)).toBe(1);
        expect(arr.size()).toBe(0);
    });

    test("array.indexOf(elem) should return index of element if found, else -1", () => {
        const arr = array(0);
        expect(arr.size()).toBe(0);
        arr.add(1);
        arr.add(2);
        arr.add(3);
        expect(arr.indexOf(3)).toBe(2);
        expect(arr.indexOf(99)).toBe(-1);
    });

    test("array.remove(elem) should return true on success, false otherwise", () => {
        const arr = array(0);
        expect(arr.size()).toBe(0);
        arr.add({ a: 'a' });
        arr.add(3);

        expect(arr.remove({ a: 'a' })).toBe(true);
        expect(arr.remove({ a: 'a' })).toBe(false);
        expect(arr.remove(3)).toBe(true);

        expect(arr.size()).toBe(0);
    });

    test("array.contains(elem) should return true if element is present", () => {
        const arr = array(0);
        arr.add({ a: 'a' });
        expect(arr.contains({ a: 'a' })).toBe(true);
    });

});