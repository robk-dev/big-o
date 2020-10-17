const linked_list = require('./03-linked-list');
const Map = require('./04-map');
const { hashStringToString } = require('./05-hash-string');
const deep_equal = require('deep-equal');

// hash map - json with hashed keys and 2D arrays of [key, value] pairs
const HashMap = () => {
    let buckets = Map();
    let list = linked_list();

    const get = (key) => {
        const hash = hashStringToString(key);
        const bucket = buckets.get(hash);

        if (!bucket) {
            return null;
        }

        if (bucket.length === 1) {
            return bucket[0][1];
        }

        const value = bucket.find(([k, _v]) => deep_equal(k, key));
        return value && value[1];
    }

    const set = (key, value) => {
        if (key !== 0 && !key) {
            throw new TypeError('missing or invalid parameters');
        }

        const hash = hashStringToString(key);
        let bucket = buckets.get(hash);

        if (!bucket) {
            buckets.set(hash, [[key, value]]);
        } else {
            // TODO: check if duplicates should be allowed
            // const matches = bucket.find(item => deep_equal(item, [key, value]));
            // if (matches && matches.length > 0) {
            //     throw new Error('duplicate key-value pair');
            // }
            bucket.push([key, value]);
        }
        list.append([key, value]);
    }

    const remove = (key) => {
        const hash = hashStringToString(key);
        const bucket = buckets.get(hash);

        if (!bucket) {
            return false;
        }

        const idx = bucket.findIndex(([k, _v]) => deep_equal(k, key));
        const removed = bucket.splice(idx, 1);

        if (removed && removed.length > 0) {
            removed.forEach((item) => list.remove(item));
            return true;
        }
        return false;
    };

    const clear = () => {
        buckets = Map();
        list = linked_list();
    }

    const iterator = function () {
        const iter = list[Symbol.iterator]();
        return {
            next: () => {
                const { value = '', done } = iter.next();
                return {
                    value: value && value.get()[1],
                    done
                }
            }
        };
    };

    return {
        [Symbol.iterator]: iterator,
        get,
        set,
        clear,
        remove,
        size: () => list.count(),
        count: () => list.count()
    };
}

module.exports = HashMap;

// TODO: compare to 2D Map/JSON for efficiency