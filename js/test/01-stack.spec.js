const stack = require("../src/01-stack");

describe("Stack test suite:", () => {
    test("New stack should be empty if no parameters passed", () => {
        const s = stack();
        expect(s.count()).toBe(0);
        expect(s.isEmpty()).toBe(true);
    });

    test("Last element of the stack should be the last one pushed", () => {
        const s = stack();
        s.push(1);
        s.push(2);
        s.push(999);
        expect(s.top()).toBe(999);
    });

    test("Pushing an element onto the stack should increase the count", () => {
        const s = stack();
        const count = s.count();
        s.push(1);
        expect(s.count()).toBe(count + 1);
        s.push(5);
        expect(s.count()).toBe(count + 2);
    });

    test("Passing an array of elements to stack should initialize it to hold those elements", () => {
        const arr = [0, 1, 2, 3];
        const s = stack(arr);
        expect(s.count()).toBe(arr.length);
    });

    test("Popping an element off the stack should return the last number and decrease the count", () => {
        const s = stack([9]);
        const num = s.pop()
        expect(s.count()).toBe(0);
        expect(num).toBe(9);
    });

    test("Clearing the stack should remove all elements and set count to 0", () => {
        const arr = [0, 1, 2, 3];
        const s = stack(arr);
        s.clear();

        expect(s.count()).toBe(0);
        expect(s.isEmpty()).toBe(true);
    });
});