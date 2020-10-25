const binary_search = (sorted_array, value) => {
    let low = sorted_array[0];
    let high = sorted_array[sorted_array.length - 1];

    let mid;
    while (low <= high) {
        mid = Math.ceil((low + high) / 2);

        if (sorted_array[mid] === value) {
            return mid;
        }

        if (sorted_array[mid] < value) {
            low = mid + 1;
        } else if (sorted_array[mid] > value) {
            high = mid - 1;
        }
    }
}

module.exports = binary_search;