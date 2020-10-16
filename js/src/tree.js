const fs = require('fs');
const { BinaryTree, printTree } = require('.');

const tree = BinaryTree();

for (let i = 0; i < 15; i++) {
    tree.add(i, i);
}

const _root = tree.getRoot();

console.log('=======IN_ORDER=======');
const IN_ORDER = []
tree.traverse(_root).in_order(({ key }) => IN_ORDER.push(key));
fs.writeFileSync('./IN_ORDER.json', JSON.stringify(IN_ORDER));

console.log('=======PRE_ORDER=======');
const PRE_ORDER = []
tree.traverse(_root).pre_order(({ key }) => PRE_ORDER.push(key));
fs.writeFileSync('./PRE_ORDER.json', JSON.stringify(PRE_ORDER));


console.log('=======POST_ORDER=======');
const POST_ORDER = []
tree.traverse(_root).post_order(({ key }) => POST_ORDER.push(key));

fs.writeFileSync('./POST_ORDER.json', JSON.stringify(POST_ORDER));

console.log({ root: _root.get(), left: _root.left.key, right: _root.right.key });
console.log(tree.print(5));
//             7  3x2
//            / \  3x2 -1  
//           3  15 2x2
//          / \ /    2x2-1
//                 1x2
//                 1