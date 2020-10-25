const selection_sort = (array = []) => {
    if (!Array.isArray(array) || array.length <= 1) {
        return array;
    }

    for (let i = 0, max = array.length; i < max; i++) {
        let min = i;
        for (let j = i; j < max; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        if (min != i) {
            let tmp = array[i];
            array[i] = array[min];
            array[min] = tmp;
        }
    }
    return array;
};

module.exports = selection_sort;
