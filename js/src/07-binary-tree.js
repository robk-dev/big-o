const skew = (node) => {
    if (node.left && node.left.level === node.level) {
        let temp = node;
        node = node.left;
        temp.left = node.right;
        node.right = temp;
    }
    return node;
}

function split(node) {
    if (node.right && node.right.right && node.right.right.level === node.level) {
        let temp = node;
        node = node.right;
        temp.right = node.left;
        node.left = temp;
        node.level++;
    }
    return node;
}

const node = (key, value, level = 0, left = null, right = null) => {
    return {
        key,
        value,
        left,
        right,
        level
    }
}


const traverse = (root) => {
    const in_order = (_node, callback) => {
        if (_node) {
            in_order(_node.left, callback);
            callback && callback(_node.key);
            in_order(_node.right, callback);
        }
    }

    const depth_first = (_node, callback) => {
        if (_node) {
            callback && callback(_node.key);
            depth_first(_node.left, callback);
            depth_first(_node.right, callback);
        }
    }

    const breadth_first = (_node, callback) => {
        if (_node) {
            breadth_first(_node.left, callback);
            breadth_first(_node.right, callback);
            callback && callback(_node.key);
        }
    }

    return {
        in_order: (callback) => {
            in_order(root, callback);
        },
        pre_order: (callback) => {
            depth_first(root, callback);
        },
        post_order: (callback) => {
            breadth_first(root, callback);
        }
    };
};

const Tree = () => {
    let root = null;

    const insert = (_root, _node) => {
        if (_root.key > _node.key) {
            if (!_root.left) {
                _root.left = _node;
            } else {
                insert(_root.left, _node);
            }

        } else {
            if (!_root.right) {
                _root.right = _node;
            } else {
                insert(_root.right, _node);
            }
        }
    }

    const compare = (a, b) => {
        return a < b ? -1 : a > b ? 1 : 0;
    }

    const rebalance = (paths, level) => {
        let rotated, node, parent, updated, noOps = 0;

        for (let i = level; i >= 0; i--) {
            rotated = node = paths[i];

            if (node.left && node.right && node.level && node.right.level === node.left.level === node.level) {
                updated = true;
                node.level++;

            } else {
                rotated = skew(node);
                rotated = split(rotated);
            }

            if (rotated !== node) {
                updated = true;
                if (i) {
                    parent = paths[i - 1];
                    if (parent.left === node) {
                        parent.left = rotated;
                    } else {
                        parent.right = rotated;
                    }

                } else {
                    root = rotated
                }
            }
            if (!updated) noOps++;
            if (noOps === 2) break;
        }
    }

    const add = (key, value) => {
        const new_node = node(key, value);
        const paths = [];

        if (!root) {
            root = new_node;
            return;
        }

        let temp = root;

        let level = -1;

        while (++level > -1) {
            const comparison = compare(key, temp.key);
            if (comparison === 0) return;

            paths[level] = temp;

            if (comparison < 0) {
                if (!temp.left) {
                    temp.left = new_node;
                    break;
                }
                temp = temp.left;

            } else {
                if (!temp.right) {
                    temp.right = new_node;
                    break;
                }
                temp = temp.right;
            }
        }

        rebalance(paths, level);
    };

    const get = (key) => {

    };


    return {
        // [Symbol.iterator]: iterator, 
        getRoot: () => root,
        add, get, traverse
    };
};


module.exports = Tree;

// function JSBSTree() {


//     var root = null;

//     this.insert = function (key) {
//         var newNode = new Node(key);

//         if (root === null) {
//             root = newNode;
//         } else {
//             insertNode(root, newNode);
//         }
//     };

//     var insertNode = function (node, newNode) {
//         if (newNode.key < node.key) {
//             if (node.left === null) {
//                 node.left = newNode;
//             } else {
//                 insertNode(node.left, newNode);
//             }
//         } else {
//             if (node.right === null) {
//                 node.right = newNode;
//             } else {
//                 insertNode(node.right, newNode);
//             }
//         }
//     };

//     this.inOrderTraverse = function (visitor) {
//         inOrderTraverseNode(root, visitor); //visitor callback
//     };

//     var inOrderTraverseNode = function (node, visitor) {
//         if (node !== null) {
//             inOrderTraverseNode(node.left, visitor);
//             visitor(node.key);
//             inOrderTraverseNode(node.right, visitor);
//         }
//     };

//     this.preOrderTraverse = function (visitor) {
//         preOrderTraverseNode(root, visitor);
//     };

//     var preOrderTraverseNode = function (node, visitor) {
//         if (node !== null) {
//             visitor(node.key);
//             preOrderTraverseNode(node.left, visitor);
//             preOrderTraverseNode(node.right, visitor);
//         }
//     };

//     this.postOrderTraverse = function (visitor) {
//         postOrderTraverseNode(root, visitor);
//     };

//     var postOrderTraverseNode = function (node, visitor) {
//         if (node !== null) {
//             postOrderTraverseNode(node.left, visitor);
//             postOrderTraverseNode(node.right, visitor);
//             visitor(node.key);
//         }
//     };

//     this.min = function () {
//         return minNode(root);
//     };

//     var minNode = function (node) {
//         if (node) {
//             while (node && node.left !== null) {
//                 node = node.left;
//             }
//             return node.key;
//         }
//         return null;
//     };

//     this.max = function () {
//         return maxNode(root);
//     };

//     var maxNode = function (node) {
//         if (node) {
//             while (node && node.right !== null) {
//                 node = node.right;
//             }

//             return node.key;
//         }
//         return null;
//     };

//     this.lookup = function (key) {
//         return lookupNode(root, key);
//     };

//     var lookupNode = function (node, key) {

//         if (node === null) {
//             return false;
//         }
//         if (key < node.key) {
//             return lookupNode(node.left, key);

//         } else if (key > node.key) {
//             return lookupNode(node.right, key);

//         } else {
//             return true;
//         }
//     };

//     this.remove = function (key) {
//         root = removeNode(root, key);
//     };

//     var removeNode = function (node, key) {

//         if (node === null) {
//             return null;
//         }
//         if (key < node.key) {
//             node.left = removeNode(node.left, key);
//             return node;

//         } else if (key > node.key) {
//             node.right = removeNode(node.right, key);
//             return node;

//         } else {

//             if (node.left === null && node.right === null) {
//                 node = null;
//                 return node;
//             }

//             if (node.left === null) {
//                 node = node.right;
//                 return node;

//             } else if (node.right === null) {
//                 node = node.left;
//                 return node;
//             }

//             var aux = findMinNode(node.right);
//             node.key = aux.key;
//             node.right = removeNode(node.right, aux.key);
//             return node;
//         }
//     };

//     var findMinNode = function (node) {
//         if (node) {
//             while (node && node.left !== null) {
//                 node = node.left;
//             }
//             return node;
//         }
//         return null;
//     };


// }
