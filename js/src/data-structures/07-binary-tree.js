const { compare,
    print_tree,
    skew, split,
    get_min,
    get_max,
    _traverse,
    get_successor
} = require('./07-tree-helpers');

const node = (key, value, level = 0, left = null, right = null) => {
    return {
        key,
        value,
        get: function () {
            return { key: this.key, value: this.value };
        },
        left,
        right,
        level,
        isLeaf: function () {
            return this.left === null && this.right === null;
        }
    };
};

const Tree = () => {
    let root = null;
    const nodes = [];

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
                    root = rotated;
                }
            }
            if (!updated) noOps++;
            if (noOps === 2) break;
        }
    };

    const add = (key, value) => {
        const new_node = node(key, value);
        const paths = [];

        if (!root) {
            root = new_node;
            nodes.push(new_node);
            return true;
        }

        let temp = root;
        let level = -1;

        while (++level > -1) {
            const comparison = compare(key, temp.key);
            if (comparison === 0) return false;

            paths[level] = temp;

            if (comparison < 0) {
                if (!temp.left) {
                    temp.left = new_node;
                    nodes.push(new_node);
                    break;
                }
                temp = temp.left;

            } else {
                if (!temp.right) {
                    temp.right = new_node;
                    nodes.push(new_node);
                    break;
                }
                temp = temp.right;
            }
        }

        rebalance(paths, level);
        return true;
    };

    const get_node = (key) => {
        let temp = root;
        let parent = null;
        if (!temp) return {};

        while (true) {
            const comparison = compare(key, temp.key);
            if (comparison === 0) return { node: temp, parent, value: temp.value };

            if (comparison < 0) {
                if (!temp.left) {
                    break;
                }
                parent = temp;
                temp = temp.left;
            } else {
                if (!temp.right) {
                    break;
                }
                parent = temp;
                temp = temp.right;
            }
        }
        return {};
    }

    const get = (key) => {
        const { value = null } = get_node(key);
        return value;
    }

    const remove = (key) => {
        let {
            node: _node,
            parent: _parent = {}
        } = get_node(key);

        if (!_node) {
            return false;
        }

        if (_node.isLeaf()) {
            if (_parent.left && _parent.left.key === _node.key) {
                _parent.left = null;
            } else if (_parent.right && _parent.right.key === _node.key) {
                _parent.right = null;
            }
            _node = null;
            return true;
        }

        if (_node.left === null) {
            _node = _node.right;
            return true;

        } else if (_node.right === null) {
            _node = _node.left;
            return true;
        }

        // get the next biggest value by taking min value from right subtree
        const { successor, parent } = get_successor(_node, _node.right);
        _node.key = successor.key;
        _node.value = successor.value;

        if (parent && parent.key !== successor.key) {
            parent.left = null;
        } else {
            _node.right = null;
        }
        return true;
    };

    return {
        add,
        get,
        remove: (key) => remove(key),
        getRoot: () => root,
        size: () => nodes.length,
        traverse: (node) => _traverse(node || root),
        print: function (max_recurse) {
            return print_tree(root, this, max_recurse);
        },
        getMin: () => get_min(root),
        getMax: () => get_max(root)
    };
};

module.exports = Tree;