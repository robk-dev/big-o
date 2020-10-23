const deep_equal = require('deep-equal');

const static_array = (capacity = 10) => {
    let arr = new Array(capacity);
    let length = 0;

    return {
        add: (elem) => {
            if (length >= capacity) {
                if (capacity === 0) capacity = 1;
                else capacity *= 2;
                const new_arr = new Array(capacity);

                for (let i = 0; i < length; i++) {
                    new_arr[i] = arr[i];
                }
                arr = new_arr;
            }
            arr[length] = elem;
            length++;
        },
        set: (index, elem) => {
            arr[index] = elem;
        },
        get: (index) => {
            return arr[index];
        },
        size: () => {
            return length;
        },
        isEmpty: () => {
            return length === 0;
        },
        clear: () => {
            for (let i = 0; i < capacity; i++) {
                arr[i] = null;
            }
            length = 0;
        },
        removeAt: (index) => {
            if (index >= length || index < 0) throw new Error('index out of bounds');

            const elem = arr[index];
            const new_arr = new Array(length - 1);
            for (let i = 0, j = 0; i < length; i++, j++) {
                if (i === index) j--;
                else new_arr[j] = arr[i];
            }
            arr = new_arr;
            capacity = --length;
            return elem;
        },
        indexOf: (elem) => {
            for (let i = 0; i < length; i++) {
                if (deep_equal(arr[i], elem)) {
                    return i;
                }
            }
            return -1;
        },
        remove: function (elem) {
            for (let i = 0; i < length; i++) {
                if (deep_equal(arr[i], elem)) {
                    this.removeAt(i);
                    return true;
                }
            }
            return false;
        },
        contains: function (elem) {
            return this.indexOf(elem) !== -1;
        }
    }
};

module.exports = static_array;