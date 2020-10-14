const hashString = (s, table_size) => {
    let hash = 1213;

    const str = String(s);

    for (const char of str) {
        const charCode = char.charCodeAt(0);
        hash *= charCode % table_size;
    }
    return hash;
}

const HashTable = (num_buckets = 10000, _resize_percent = 0.8) => {
    let items = new Array(num_buckets);

    return {
        get: (key) => {
            const hash = hashString(key, num_buckets);
            const bucket = items[hash];
            if (!bucket) {
                return null;
            }
            return bucket.find(([k, _v]) => k === key)[1];
        },
        set: (key, value) => {
            const hash = hashString(key, num_buckets);
            const bucket = items[hash];

            if (!bucket) {
                items[hash] = [[key, value]];
            } else {
                items[hash].push([key, value]);
            }
        }
    };
};

module.exports = HashTable;
