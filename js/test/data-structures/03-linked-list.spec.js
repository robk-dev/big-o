const linked_list = require("../../src/data-structures/03-linked-list");

describe("Linked List Suite:", () => {
    test("New linked list should be empty", () => {
        const ll = linked_list();
        expect(ll.count()).toBe(0);
        expect(ll.isEmpty()).toBe(true);
    });

    test("getHead() should return the head of the list; null when it's empty", () => {
        const ll = linked_list();
        expect(ll.getHead()).toBe(null);
        ll.append(1);
        expect(ll.getHead().element).toBe(1);
    });

    test("Adding an element should increase the count", () => {
        const ll = linked_list();
        ll.append(5);
        expect(ll.count()).toBe(1);
        expect(ll.isEmpty()).toBe(false);
    });

    test("indexOf() should return index of an element; -1 if it doesn't exist", () => {
        const ll = linked_list();

        const arr = [0, 1, 2, 3];
        arr.forEach(item => ll.append(item));

        const index = ll.indexOf(3);
        expect(index).toBe(3);

        expect(ll.indexOf(5)).toBe(-1);
    });

    test("remove() should remove a specific element and decrease the count", () => {
        const ll = linked_list();
        ll.append(5);
        ll.append(7);

        const count = ll.count();

        const el = ll.remove(5);

        expect(el).toBe(5);
        expect(ll.count()).toBe(count - 1);
        expect(ll.getHead().get()).toBe(7);
    });

    test("Removing an element from an empty list or outside bounds should return null", () => {
        const ll1 = linked_list();
        expect(ll1.remove(1)).toBe(null);
        expect(ll1.removeAt(0)).toBe(null);

        ll1.append(5);
        expect(ll1.removeAt(1)).toBe(null)
    });

    test("Removing an element at specific index should return expected element", () => {
        const ll = linked_list();
        const arr = [0, 1, 2, 3];
        arr.forEach(item => ll.append(item));

        const count = ll.count();
        const expected = ll.removeAt(1);

        expect(expected).toBe(1);
        expect(ll.count()).toBe(count - 1);
        expect(ll.getHead().get()).toBe(0)
        expect(ll.getHead().next.get()).toBe(2)
    });


    test("insertAt() should return true on success; else false", () => {
        const ll = linked_list();

        expect(ll.insertAt(5, 2)).toBe(false);
        expect(ll.insertAt(5, 0)).toBe(true);
    });


    test("insertAt(5, 2) should insert 5 in position with index 2", () => {
        const ll = linked_list();

        const arr = [0, 1, 2, 3];
        arr.forEach(item => ll.append(item));

        ll.insertAt(5, 2);
        expect(ll.getHead().next.next.get()).toBe(5)
    });


    test("insertAt(999, 0) should insert 999 in position with index 0 and update the head", () => {
        const ll = linked_list();

        const arr = [0, 1, 2, 3];
        arr.forEach(item => ll.append(item));

        ll.insertAt(999, 0);
        expect(ll.getHead().get()).toBe(999);
    });


    test("toString() should return dash separated string of values", () => {
        const ll = linked_list();

        const arr = [0, 'a', 1, 'b', 2, 'c'];
        arr.forEach(item => ll.append(item));
        const str = '-' + arr.join('-');

        expect(ll.toString()).toEqual(str);
    });

    test("Linked list should be iterable and order preserved", () => {
        const ll = linked_list();
        const arr = [0, 1, 2, 3];

        arr.forEach(item => ll.append(item));

        const new_arr = []

        for (node of ll) {
            new_arr.push(node.get());
        }

        expect(new_arr).toEqual(arr);
    });
});


