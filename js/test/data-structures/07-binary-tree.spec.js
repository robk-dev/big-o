const BinaryTree = require("../../src/data-structures/07-binary-tree");
const max_level = require("../../src/data-structures/07-tree-helpers").max_level;

describe("Binary Tree Suite:", () => {
    const random_order = [1, 5, 6, 2, 3, 4, 18, 19, 0, 20, 10, 11, 12, 16, 17, 28, 29, 30, 7, 8, 9, 22, 23, 24, 13, 14, 15, 25, 26, 27, 21];

    const pre_order = [15, 7, 3, 1, 0, 2, 5, 4, 6, 11, 9, 8, 10, 13, 12, 14, 23, 19, 17, 16, 18, 21, 20, 22, 27, 25, 24, 26, 29, 28, 30]; // left first
    const in_order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]; // bottom left first
    const post_order = [0, 2, 1, 4, 6, 5, 3, 8, 10, 9, 12, 14, 13, 11, 7, 16, 18, 17, 20, 22, 21, 19, 24, 26, 25, 28, 30, 29, 27, 23, 15]; // left -> right -> bubble to top

    test("tree.size() should be 0 when empty", () => {
        const tree = BinaryTree();
        expect(tree.size()).toEqual(0);
    });

    test("tree.add() should return true on success, false on fail/duplicate keys", () => {
        const tree = BinaryTree();
        expect(tree.add(1, 1)).toEqual(true);
        expect(tree.add(1, 1)).toEqual(false);
    });

    test("tree.add() should work and increase tree size", () => {
        const key = 'key';
        const value = 999;

        const tree = BinaryTree();
        expect(tree.size()).toEqual(0);

        tree.add(key, value);
        expect(tree.size()).toEqual(1);
    });

    test("tree.get(key) should return value if it exists; else null", () => {
        const tree = BinaryTree();
        random_order.forEach(v => {
            tree.add(v, v);
        });
        expect(tree.get(1)).toEqual(1);
        expect(tree.get(30)).toEqual(30);
        expect(tree.get(999)).toEqual(null);
        expect(tree.get(-1)).toEqual(null);
    });

    //         50       <-- remove by replacing with 40 or 60 (predecessor/successor and setting them as null)
    //       /    \
    //     30       70  <-- remove nodes with one child with their children
    //   /   \     /   
    // 20    40   60    <-- remove leaf nodes by assigning parent's pointer to null      

    test("tree.remove(key) should return true on success, else false", () => {
        const tree = BinaryTree();

        console.log(`
         50  <-- delete by replacing with 40 or 60 (predecessor/successor and setting them as null)
       /    \\
     30       70
   /   \\     /   \\
 20    40   60    80 <- leaf node, delete by assigning null to pointer of parent
 // when one child is null, replace with other child`);

        const balanced = [20, 30, 40, 50, 60, 70, 80];
        balanced.forEach(v => tree.add(v, v));

        console.log('TREE:\n\n', tree.print());

        // root node with both children
        expect(tree.remove(50)).toEqual(true);
        expect(tree.remove(50)).toEqual(false);
        console.log('TREE -(50):\n\n', tree.print());
        expect(tree.getRoot().value).toEqual(60);

        // leaf node
        expect(tree.remove(80)).toEqual(true);
        expect(tree.remove(80)).toEqual(false);
        console.log('TREE -(80):\n', tree.print());

        // node with 1 child
        expect(tree.remove(60)).toEqual(true);
        expect(tree.remove(60)).toEqual(false);
        console.log('TREE -(60):\n', tree.print());
    });

    test("tree.traverse().in_order() should return values 1 by 1 in ascending order", () => {
        const tree = BinaryTree();

        random_order.forEach(v => tree.add(v));

        const ordered = [];
        tree.traverse().in_order(({ key }) => ordered.push(key))
        expect(ordered).toEqual(in_order);
    });

    test("tree.traverse().pre_order() should return values leftmost values first, starting from root", () => {
        const tree = BinaryTree();

        in_order.forEach(v => tree.add(v));

        console.log('TREE :\n', tree.print());
        console.log('max_level :\n', max_level(tree.getRoot()));
        const ordered = [];
        tree.traverse().pre_order(({ key }) => ordered.push(key))
        expect(ordered).toEqual(pre_order);
    });

    test("tree.traverse().post_order() should return values leftmost values first, starting from root", () => {
        const tree = BinaryTree();

        in_order.forEach(v => tree.add(v));

        const ordered = [];
        tree.traverse().post_order(({ key }) => ordered.push(key))
        expect(ordered).toEqual(post_order);
    });

    test("tree.print() should return empty string when empty", () => {
        const tree = BinaryTree();
        expect(tree.print()).toEqual('');
    });

    test("tree.getRoot() to return current root", () => {
        const tree = BinaryTree();

        const root = 1;

        const t = BinaryTree();
        tree.add(0, 0);
        tree.add(root, root);
        tree.add(2, 2);

        const node = tree.getRoot();
        expect(node.key).toEqual(root);
    });

    test("tree.get_min() to return current root //needs work", () => {
        const tree = BinaryTree();
        random_order.forEach(v => tree.add(v));

        const min = 0;
        expect(tree.getMin().key).toEqual(min);
    });
    test("tree.get_max() to return current root //needs work", () => {
        const tree = BinaryTree();
        random_order.forEach(v => tree.add(v));

        const max = 30;
        expect(tree.getMax().key).toEqual(max);
    });
});