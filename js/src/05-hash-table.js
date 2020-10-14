const hashString = (s, table_size) => {
    let hash = 1213;

    const str = String(s);

    for (const char of str) {
        const charCode = char.charCodeAt(0);
        hash *= 17 * charCode % table_size;
    }
    return hash;
}

const HashTable = (num_buckets = 10000, resize_percent = 0.8) => {
    let buckets = new Array(num_buckets);
    let item_count = 0;

    return {
        count: () => item_count,
        size: () => buckets.length,
        getTable: () => buckets,
        get: (key) => {
            const hash = hashString(key, buckets.length);
            const bucket = buckets[hash];
            if (!bucket) {
                return null;
            }
            const res = bucket.find(([k, _v]) => k === key); // [1] for value
            return res ? res[1] : res;
        },
        set: function (key, value) {

            if (item_count / buckets.length > resize_percent) {
                this.resize();
            }

            const hash = parseInt(hashString(key, buckets.length));
            const bucket = buckets[hash];

            if (!bucket || !bucket.length) {
                buckets[hash] = [[key, value]];
            } else {
                buckets[hash].push([key, value]);
            }
            item_count++;
        },
        delete: (key) => {
            const bucket = buckets[hashString(key, buckets.length)];

            if (!bucket) {
                return false;
            }
            const idx = bucket.findIndex(([k, _v]) => k === key);
            const res = bucket.splice(idx, 1);

            if (res && res.length > 0) {
                item_count--;
                return true;
            }
            return false;
        },
        resize: () => {
            const new_table = new Array(buckets.length * 2);
            temp = buckets;

            buckets.forEach(b => {
                console.log({ msg: 'resize()', b });
                if (b && b.length > 0) {
                    b.forEach(([k, v]) => {
                        const hash = parseInt(hashString(k, new_table.length));

                        console.log({ hash, type: typeof hash });
                        const bucket = new_table[hash];

                        if (!bucket || !bucket.length) {
                            new_table[hash] = [[k, v]];
                        } else {
                            new_table[hash].push([k, v]);
                        }
                    })
                }
            });

            buckets = new_table;
        }
    }
};

module.exports = HashTable;
