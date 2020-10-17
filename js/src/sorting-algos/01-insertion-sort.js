const insert_sort = (array = []) => {
    if (!Array.isArray(array) || array.length <= 1) {
        return array;
    }

    for (let i = 1, max = array.length; i < max; i++) {
        const current = array[i];

        let j = i - 1;
        while ((j > -1) && (current < array[j])) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = current;
    }
    return array;
};

module.exports = insert_sort;
