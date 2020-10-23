const binary_search = (sorted_array, value) => {
    let low = sorted_array[0];
    let high = sorted_array[sorted_array.length - 1];
    while (low <= high) {
        mid = Math.ceil((low + high) / 2);

        if (array[mid] === value) {
            return mid;
        }

        if (array[mid] < value) {
            low = mid + 1;
        } else if (array[mid] > value) {
            high = mid - 1;
        }
    }
}