const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;

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


const get_min = (_node) => {
    let temp = _node;
    while (temp && temp.left) {
        temp = temp.left
    }
    return temp;
}

const get_successor = (root, _node) => {
    let temp = _node;
    let parent = root;
    while (temp && temp.left) {
        parent = temp;
        temp = temp.left
    }
    return { successor: temp, parent }; 
}

const get_predeccessor = (root, _node) => {
    let temp = _node;
    let parent = root;
    while (temp && temp.right) {
        parent = temp;
        temp = temp.right
    }
    return { predeccessor: temp, parent };
}

const get_max = (_node) => {
    let temp = _node;
    while (temp && temp.right) {
        temp = temp.right
    }
    return temp;
}


const get_spaces = (count) => {
    let str = '';
    for (let i = 0; i < count; i++)
        str += ' ';

    return str;
}

const levels = (_node, level = 0, aggregator = []) => {
    const next_level = level + 1;

    aggregator[level] ?
        aggregator[level].push(_node) :
        aggregator[level] = [_node];

    if (_node.left) {
        levels(_node.left, next_level, aggregator);
    } else {
        aggregator[next_level] ?
            aggregator[next_level].push(null) :
            aggregator[next_level] = [null];
    }
    if (_node.right) {
        levels(_node.right, next_level, aggregator);
    } else {
        aggregator[next_level] ?
            aggregator[next_level].push(null) :
            aggregator[next_level] = [null];
    }
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

    const pre_order = (_node, callback) => {
        if (_node) {
            callback && callback(_node);
            pre_order(_node.left, callback);
            pre_order(_node.right, callback);
        }
    }

    const post_order = (_node, callback) => {
        if (_node) {
            post_order(_node.left, callback);
            post_order(_node.right, callback);
            callback && callback(_node);
        }
    }

    return {
        in_order: (callback) => {
            in_order(root, callback);
        },
        pre_order: (callback, cb) => {
            pre_order(root, callback, cb);
        },
        post_order: (callback) => {
            post_order(root, callback);
        }
    };
};

const print_tree = (root, tree, max_recurse) => {
    let output = '';

    if (tree && tree.size() === 0) return output;

    const nodes = levels(root);
    const maxLevel = max_recurse || max_level(root);

    let level = -1;

    while (++level < nodes.length) {

        const floor = maxLevel - level;
        const left_indent = (floor * 2) + 1;
        const space_between = Math.max(left_indent, 2)


        let str = '';
        let edges = '\n';
        str += get_spaces(left_indent + space_between + 2);
        edges += get_spaces(left_indent + space_between - 1);

        nodes[level].forEach(node => {
            const key = node ? node.get().key : ' ';

            str += key;
            str += get_spaces(space_between);

            edges += node && node.left ? '/' : ' ';
            edges += get_spaces((space_between / 2) + 1);
            edges += node && node.right ? '\\' : ' ';
            edges += get_spaces(space_between / 2);
        });
        output += str + edges + '\n';
    }
    return output;
};

module.exports = {
    compare,
    max_level,
    levels,
    print_tree,
    skew, split,
    get_successor,
    get_predeccessor,
    get_min,
    get_max,
    get_spaces,
    _traverse,
};
