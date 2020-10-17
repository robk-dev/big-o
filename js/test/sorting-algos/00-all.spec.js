const random_order = [1, 5, 6, 29, 2, 3, 4, 18, 19, 0, 20, 10, 12, 16, 17, 28, 11, 30, 7, 8, 9, 22, 23, 24, 13, 14, 15, 25, 26, 27, 21];
const in_order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
const algos = require('../../src/sorting-algos/index');

describe("Sorting Algorithms Suite:", () => {
    test("insert_sort(array) should work if array.length > 1, else should return array", () => {
        const ordered = algos.InsertionSort(random_order);
        expect(ordered).toEqual(in_order);

        const return_value_back = { a: 'a' };
        expect(algos.InsertionSort(return_value_back)).toEqual(return_value_back);
        expect(algos.InsertionSort(null)).toEqual(null);
    });
    test("merge_sort(array) should work if array.length > 1, else should return array", () => {
        const ordered = algos.MergeSort(random_order);
        expect(ordered).toEqual(in_order);

        const return_value_back = { a: 'a' };
        expect(algos.InsertionSort(return_value_back)).toEqual(return_value_back);
        expect(algos.InsertionSort(null)).toEqual(null);
    });
});