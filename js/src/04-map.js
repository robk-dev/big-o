const map = (elems = {}) => {
    let items = { ...elems };

    const has = function (key) {
        return !!items[key];
    };

    const set = function (key, value) {
        items[key] = value;
    };

    const remove = (key) => {
        if (has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };

    const get = function (key) {
        return items[key];
    };

    const keys = function () {
        return Object.keys(items);
    };

    const values = function () {
        return keys().map(key => items[key]);
    };

    const clear = function () {
        items = {};
    };

    const size = function () {
        return keys().length;
    };


    const entries = function () {
        return items;
    };

    const iterator = function () {
        const values = this.values();
        let i = -1;
        return {
            next: () => ({
                value: values[++i],
                done: i >= size()
            })
        };
    };

    return {
        [Symbol.iterator]: iterator,
        has, set, delete: remove, get, keys, values, clear, size, values, entries
    };
}

module.exports = map;
