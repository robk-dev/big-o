const fs = require('fs');
const { BinaryTree } = require('./');

const tree = BinaryTree();

for (let i = 0; i < 1000; i++) {
    tree.add(i, i);
}

const root = tree.getRoot();

console.log('=======IN_ORDER=======');
const IN_ORDER = []
tree.traverse(root).in_order(key => IN_ORDER.push(key));
fs.writeFileSync('./IN_ORDER.json', JSON.stringify(IN_ORDER));

console.log('=======PRE_ORDER=======');
const PRE_ORDER = []
tree.traverse(root).pre_order(key => PRE_ORDER.push(key));
fs.writeFileSync('./PRE_ORDER.json', JSON.stringify(PRE_ORDER));


console.log('=======POST_ORDER=======');
const POST_ORDER = []
tree.traverse(root).post_order(key => POST_ORDER.push(key));

fs.writeFileSync('./POST_ORDER.json', JSON.stringify(POST_ORDER));