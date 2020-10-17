const queue = require("../../src/data-structures/02-queue");
describe("Queue test suite:", () => {
    test("New queue should be empty if no parameters passed", () => {
        const q = queue();
        expect(q.count()).toBe(0);
        expect(q.isEmpty()).toBe(true);
    });

    test("Pushing an element onto the queue should increase the count", () => {
        const q = queue();
        const count = q.count();
        q.enqueue(1);
        expect(q.count()).toBe(count + 1);
        q.enqueue(5);
        expect(q.count()).toBe(count + 2);
    });

    test("Passing an array of elements to queue should initialize it to hold those elements", () => {
        const arr = [0, 1, 2, 3];
        const q = queue(arr);
        expect(q.count()).toBe(arr.length);
    });

    test("Popping an element off the queue should return the last number and decrease the count", () => {
        const q = queue([9]);
        const num = q.dequeue()
        expect(q.count()).toBe(0);
        expect(num).toBe(9);
    });

    test("Clearing the queue should remove all elements and set count to 0", () => {
        const arr = [0, 1, 2, 3];
        const q = queue(arr);
        q.clear();

        expect(q.count()).toBe(0);
        expect(q.isEmpty()).toBe(true);
    });

    test("Peek should return the first element of the array", () => {
        const arr = [0, 1, 2, 3];
        const q = queue(arr);
        const num = q.peek();

        expect(num).toBe(0);
    });

    test("Queue should be iterable and order preserved", () => {
        const arr = [0, 1, 2, 3];
        const q = queue(arr);

        const new_arr = []

        for (k of q) {
            new_arr.push(k);
        }

        expect(new_arr).toEqual(arr);
    });
});