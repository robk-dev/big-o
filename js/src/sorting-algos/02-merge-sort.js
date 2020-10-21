const merge = (left, right) => {
    let i = 0, j = 0;
    const array = [];

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            array.push(left[i]);
            i++;
        } else {
            array.push(right[j]);
            j++;
        }
    }

    return [...array, ...left.slice(i), ...right.slice(j)];
}


const merge_sort = (array = []) => {
    if (!Array.isArray(array) || array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(
        merge_sort(left), merge_sort(right)
    );
}

module.exports = merge_sort;
