const queue = require('../src/data-structures/02-queue');

const Node = function (key, value) {
    this.key = key;
    this.value = value;
    this.neighbors = {};

    this.connect = (node) => {
        this.neighbors[node.key] = node;
        node.neighbors[this.key] = this;
    }
    this.diconnect = (node) => {
        delete node.neighbors[this.key];
        delete this.neighbors[node.key];
    }
}

const Graph = () => {
    let nodes = {};
    let head = null;

    return {
        add: (key, value) => {
            if (!!nodes[key]) return false;
            const n = new Node(key, value);

            if (!head) {
                head = node;
                nodes[n.key] = node;
                return true;
            }
        },
        connect: (key1, key2) => {
            const a = nodes[key1];
            const b = nodes[key2];
            if (!a || !b) return false;
            a.connect(b);
            return true;
        },
        diconnect: (key1, key2) => {
            const a = nodes[key1];
            const b = nodes[key2];
            if (!a || !b) return false;
            a.diconnect(b);
            return true;
        },
        keys: () => {
            return Object.keys(nodes);
        },
        size: () => {
            return Object.keys(nodes).length;
        },
        traverse: (callback) => {
            const q = queue();
            const visited = {};

            let n = head || Object.keys(nodes)[0];

            q.enqueue(n)
            callback && callback(v);
            n.visited = true;
            visited[n.key] = true;

            while (!q.isEmpty()) {
                n = q.dequeue();

                for (const neighbor in n.neighbors) {
                    if (!!visited[neighbor]) {
                        continue;
                    }
                    const v = n.neighbors[neighbor];
                    v.visited = true;
                    visited[v.key] = true;
                    q.enqueue(v);
                    callback && callback(v);
                }
            }
        }
    }
}


//         50       <-- remove by replacing with 40 or 60 (predecessor/successor and setting them as null)
//       /    \
//     30       70  <-- remove nodes with one child with their children
//   /   \     /   
// 20    40   60   
//   \   |   /
//       10

q.push(start_node)