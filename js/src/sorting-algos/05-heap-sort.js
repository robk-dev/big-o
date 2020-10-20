const heap_root = (array, idx, length) => {
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;
    let max = idx;

    if (left < length && array[left] > array[max]) {
        max = left;
    }

    if (right < length && array[right] > array[max]) {
        max = right;
    }

    if (max != idx) {
        swap(array, idx, max);
        heap_root(array, max, length);
    }
}

const swap = (array, idx, max) => {
    const temp = array[idx];
    array[idx] = array[max];
    array[max] = temp;
}

const heap_sort = (unsorted = []) => {
    if (!Array.isArray(unsorted) || unsorted.length <= 1) {
        return unsorted;
    }

    let array = [...unsorted];
    let length = array.length;

    for (let idx = Math.floor(length / 2); idx >= 0; idx--) {
        heap_root(array, idx, length);
    }

    for (let idx = array.length - 1; idx > 0; idx--) {
        swap(array, 0, idx);
        length--;
        heap_root(array, 0, length);
    }
    return array;
}

module.exports = heap_sort;