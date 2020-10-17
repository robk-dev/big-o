const hashTable = require("../src/05-hash-table");

describe("HashTable Suite:", () => {
    const strings = ['apple', 'banana', 'plane', 'milk', 'person', 'man', 'woman', 'camera', 'tv'];

    test("table.get() should return null if no matches", () => {
        const table = hashTable();
        expect(table.get('something')).toEqual(null);
    });

    test("Should set() and get() items", () => {
        const table = hashTable();

        const value = { any: 'value' };
        table.set('test', value);

        expect(table.get('test')).toEqual(value);
    });

    test("count() should return number of items in table", () => {
        const table = hashTable();
        strings.forEach(str => table.set(str, str));

        expect(strings.length).toEqual(table.count());
    });

    test("Should resize when past some threshold", () => {
        const table = hashTable(2, 0.5);
        const size = table.size()
        strings.forEach(str => table.set(str, str));

        expect(size).toBeLessThan(table.size());
    });

    test("table.delete() should delete item; true on success, false on fail", () => {
        const table = hashTable();

        table.set(1, 1);
        expect(table.get(1)).toBe(1);
        expect(table.delete(1)).toEqual(true);
        expect(table.count()).toBe(0);
        expect(table.delete(1)).toEqual(false);
    });

    test("table.delete() should delete item; true on success, false on fail", () => {
        const table = hashTable();
        expect(table.delete(1)).toEqual(false);
    });

    // test("Should deal with collisions; will allow duplicates", () => {
    //     const table = hashTable(2);

    //     strings.forEach(str => table.set(str, str));
    //     console.log(table.getTable());
    //     strings.forEach(str => expect(table.get(str)).toEqual(str));
    // });

});