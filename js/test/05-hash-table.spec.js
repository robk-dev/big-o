const hashTable = require("../src/05-hash-table");

describe("HashTable Suite:", () => {
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

    test("Should deal with collisions as long as keys are unique", () => {
        const table = hashTable(2);

        const strings = ['apple', 'banana', 'plane', 'milk', 'person', 'man', 'woman', 'camera', 'tv'];
        strings.forEach(str => table.set(str, str));

        strings.forEach(str => expect(table.get(str)).toEqual(str));
    });


    // test("Should resize when past some threshold", () => {
    //     const table = hashTable();
    //     // and now I need to keep track of number of items..
    // });
});