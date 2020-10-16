
const max_level = (root) => {
    if (root == null)
        return 0;

    return Math.max(max_level(root.left), max_level(root.right)) + 1;
}

const skew = (node) => {
    if (node.left && node.left.level === node.level) {
        let temp = node;
        node = node.left;
        temp.left = node.right;
        node.right = temp;
        node.level++;
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
        get: function () {
            return { key: this.key, value: this.value }
        },
        left,
        right,
        level
    };
};

const print_tree = (root, tree, max_recurse) => {
    if (tree && tree.size() === 0)
        return;

    const nodes = levels(root);
    const maxLevel = max_recurse || max_level(root);

    let level = -1;
    let output = '';

    while (++level < nodes.length) {

        const floor = maxLevel - level;
        const left_indent = (floor * 2) + 1;
        const space_between = Math.max(left_indent, 2)


        let str = '';
        let edges = '\n';
        str += get_spaces(left_indent + space_between + 2);
        edges += get_spaces(left_indent + space_between - 1);

        nodes[level].forEach(node => {
            const { key } = node.get();

            str += key;
            str += get_spaces(space_between);

            edges += node.left ? '/' : ' ';
            edges += get_spaces((space_between / 2) + 1);
            edges += node.right ? '\\' : ' ';
            edges += get_spaces(space_between / 2);
        });
        output += str + edges + '\n';
    }
    return output;
}

const levels = (_node, level = 0, aggregator = []) => {
    aggregator[level] ?
        aggregator[level].push(_node) :
        aggregator[level] = [_node];

    if (_node.left)
        levels(_node.left, level + 1, aggregator);
    if (_node.right)
        levels(_node.right, level + 1, aggregator);
    return aggregator;
}

const _traverse = (root) => {
    const in_order = (_node, callback) => {
        if (_node) {
            in_order(_node.left, callback);
            callback && callback(_node);
            in_order(_node.right, callback);
        }
    }

    const depth_first = (_node, callback) => {
        if (_node) {
            callback && callback(_node);
            depth_first(_node.left, callback);
            depth_first(_node.right, callback);
        }
    }

    const breadth_first = (_node, callback) => {
        if (_node) {
            breadth_first(_node.left, callback);
            breadth_first(_node.right, callback);
            callback && callback(_node);
        }
    }

    return {
        in_order: (callback) => {
            in_order(root, callback);
        },
        pre_order: (callback, cb) => {
            depth_first(root, callback, cb);
        },
        post_order: (callback) => {
            breadth_first(root, callback);
        }
    };
};

const Tree = () => {
    let root = null;
    const nodes = [];

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
                    root = rotated;
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
            nodes.push(new_node);
            return true;
        }

        let temp = root;
        let level = -1;

        while (++level > -1) {
            const comparison = compare(key, temp.key);
            if (comparison === 0)  return false;

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

    const get = (key) => {
        let temp = root;
        if (!temp) return null;

        while (true) {
            const comparison = compare(key, temp.key);
            if (comparison === 0) return temp.value;

            if (comparison < 0) {
                if (!temp.left) {
                    break;
                }
                temp = temp.left;
            } else {
                if (!temp.right) {
                    break;
                }
                temp = temp.right;
            }
        }
        return null;
    }

    return {
        add,
        get,
        getRoot: () => root,
        size: () => nodes.length,
        traverse: () => {
            return _traverse(root);
        },
        print: function (max_recurse) {
            return print_tree(root, this, max_recurse);
        }
    };
};

const get_spaces = (count) => {
    let str = '';
    for (let i = 0; i < count; i++)
        str += ' ';

    return str;
}

module.exports = Tree;