const BinaryTree = require("../src/07-binary-tree");

describe("Binary Tree Suite:", () => {
    const random_order = [1, 5, 6, 2, 3, 4, 18, 19, 0, 20, 10, 11, 12, 16, 17, 28, 29, 30, 7, 8, 9, 22, 23, 24, 13, 14, 15, 25, 26, 27, 21];

    const pre_order = [15, 7, 3, 1, 0, 2, 5, 4, 6, 11, 9, 8, 10, 13, 12, 14, 23, 19, 17, 16, 18, 21, 20, 22, 27, 25, 24, 26, 29, 28, 30]; // left first
    const in_order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; // bottom left first
    const post_order = [0, 2, 1, 4, 6, 5, 3, 8, 10, 9, 12, 14, 13, 11, 7, 16, 18, 17, 20, 22, 21, 19, 24, 26, 25, 28, 30, 29, 27, 23, 15]; // left -> right -> bubble to top

    test("tree.size() should be 0 when empty", () => {
        const tree = BinaryTree();
        expect(tree.size()).toEqual(0);
    });

    test("tree.add() should work and increase tree size", () => {
        const key = 'key';
        const value = 999;

        const tree = BinaryTree();
        expect(tree.size()).toEqual(0);

        tree.add(key, value);
        expect(tree.size()).toEqual(1);
    });

    // test("tree.get(key) should return value if it exists; else null", () => {
    //     const tree = BinaryTree();
    //     random_order.forEach(v => {
    //         tree.add(v);
    //     });
    //     expect(tree.get(1)).toEqual(1);
    //     expect(tree.get(30)).toEqual(30);
    //     expect(tree.get('nothing')).toEqual(null);
    // });

    test("tree.traverse().in_order() should return values 1 by 1 in ascending order", () => {
        const tree = BinaryTree();

        random_order.forEach(v => {
            tree.add(v);
        });

        const ordered = [];
        tree.traverse().in_order(({ key }) => ordered.push(key))
        expect(ordered).toEqual(in_order);
    });

    test("tree.traverse().pre_order() should return values leftmost values first, starting from root", () => {
        const tree = BinaryTree();

        in_order.forEach(v => {
            tree.add(v);
        });

        const ordered = [];
        tree.traverse().pre_order(({ key }) => ordered.push(key))
        expect(ordered).toEqual(pre_order);
    });

    test("tree.traverse().post_order() should return values leftmost values first, starting from root", () => {
        const tree = BinaryTree();

        in_order.forEach(v => {
            tree.add(v);
        });

        const ordered = [];
        tree.traverse().post_order(({ key }) => ordered.push(key))
        expect(ordered).toEqual(post_order);
    });

    test("tree.traverse().print() should print a tree //needs work", () => {
        const tree = BinaryTree();

        in_order.forEach(v => {
            tree.add(v);
        });

        const str = tree.print();
        console.log('**************TREE****************\n', str)
        expect(typeof str).toEqual('string');
        expect(str.length).toBeGreaterThan(5);
    });
});