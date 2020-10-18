const algos = require('../../src/sorting-algos/index');
const random_order = [1, 5, 6, 29, 2, 3, 4, 18, 19, 0, 20, 10, 12, 16, 17, 28, 11, 30, 7, 8, 9, 22, 23, 24, 13, 14, 15, 25, 26, 27, 21];
const in_order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

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

    test("merge_sort(array) should work if array.length > 1, else should return array", () => {
        const random_order2 = [99, 98, 95, 13, 14, 15, 16, 7, 9, 2, 8, 999, 0, -12];
        const expected = [-12, 0, 2, 7, 8, 9, 13, 14, 15, 16, 95, 98, 99, 999];

        const ordered = algos.MergeSort(random_order2);
        expect(ordered).toEqual(expected);
    });

    test("merge_sort(array) should return [] when called with no arguments", () => {
        expect(algos.MergeSort()).toEqual([]);
    });

    test("quick_sort(array) should work if array.length > 1, else should return array", () => {
        const ordered = algos.QuickSort(random_order);
        expect(ordered).toEqual(in_order);
    });

    test("quick_sort(array) should return [] when called with no arguments", () => {
        expect(algos.QuickSort()).toEqual([]);
    });
});