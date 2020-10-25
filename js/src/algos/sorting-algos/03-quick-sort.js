const swap = (array, left_index, right_index) => {
    const temp = array[left_index];
    array[left_index] = array[right_index];
    array[right_index] = temp;
}

const partition = (array, left, right) => {
    const middle = array[Math.floor((right + left) / 2)];
    let i = left,
        j = right;

    while (i <= j) {
        while (array[i] < middle) {
            i++;
        }
        while (array[j] > middle) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}

const quick_sort = (array = []) => {
    if (!Array.isArray(array) || array.length <= 1) {
        return array;
    }
    return sort(array, 0, array.length - 1);
}

const sort = (array, left, right) => {
    const index = partition(array, left, right);
    if (left < index - 1) {
        sort(array, left, index - 1);
    }
    if (index < right) {
        sort(array, index, right);
    }
    return array;
}

module.exports = quick_sort;
