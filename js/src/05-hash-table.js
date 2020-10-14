const { hashStringToNum } = require('./05-hash-string');
const LinkedList = require('./03-linked-list');

// hash table with arrays
const HashTable = (num_buckets = 10000, _resize_percent = 0.8) => {
    let items = new Array(num_buckets);
    const list = LinkedList();

    return {
        get: (key) => {
            const hash = hashStringToNum(key, num_buckets);
            const bucket = items[hash];
            if (!bucket) {
                return null;
            }
            return bucket.find(([k, _v]) => k === key)[1];
        },
        set: (key, value) => {
            const hash = hashStringToNum(key, num_buckets);
            const bucket = items[hash];

            if (!bucket) {
                items[hash] = [[key, value]];
            } else {
                items[hash].push([key, value]);
            }

            list.append([key, value]);
        }
    };
};

module.exports = HashTable;
