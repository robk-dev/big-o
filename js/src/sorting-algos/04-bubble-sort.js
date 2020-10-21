const bubble_sort = (array = []) => {
    if (!Array.isArray(array) || array.length <= 1) {
        return array;
    }

    do {
        swapped = false;
        for (let i = 0, max = array.length - 1; i < max; i++) {
            if (array[i] > array[i + 1]) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return array;
};

module.exports = bubble_sort;