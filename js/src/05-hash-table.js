const { hashStringToNum } = require('./05-hash-string');
const LinkedList = require('./03-linked-list');

// hash table with arrays
const HashTable = (num_buckets = 10000, resize_percent = 0.8) => {
    let buckets = new Array(num_buckets);
    let list = LinkedList();;

    return {
        count: () => list.count(),
        size: () => buckets.length,
        get: (key) => {
            const hash = hashStringToNum(key, buckets.length);
            const bucket = buckets[hash];
            if (!bucket) {
                return null;
            }
            const res = bucket.find(([k, _v]) => k === key); // [1] for value
            return res ? res[1] : res;
        },
        set: function (key, value) {

            if ((this.count() / buckets.length) > resize_percent) {
                this.resize();
            }

            const hash = hashStringToNum(key, buckets.length);
            const bucket = buckets[hash];

            if (!bucket || !bucket.length) {
                buckets[hash] = [[key, value]];
            } else {
                buckets[hash].push([key, value]);
            }
            list.append([key, value]);
        },
        delete: (key) => {
            const bucket = buckets[hashStringToNum(key, buckets.length)];

            if (!bucket) {
                return false;
            }
            const idx = bucket.findIndex(([k, _v]) => k === key);
            const removed = bucket.splice(idx, 1);

            if (removed && removed.length > 0) {
                removed.forEach(item => list.remove(item));
                return true;
            }
            return false;
        },
        resize: () => {
            const new_table = new Array(buckets.length * 2);
            const new_list = LinkedList();
            temp = buckets;

            buckets.forEach(b => {
                if (b && b.length > 0) {
                    b.forEach(([k, v]) => {
                        const hash = hashStringToNum(k, new_table.length);
                        const bucket = new_table[hash];

                        if (!bucket || !bucket.length) {
                            new_table[hash] = [[k, v]];
                        } else {
                            new_table[hash].push([k, v]);
                        }
                        list.append([k, v]);
                    });
                }
            });

            buckets = new_table;
            list = new_list;
        }
    }
};

module.exports = HashTable;
