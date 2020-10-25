
/**
 * todo: finish/fix
 *
 * @param {*} [arr=[]]
 */
const prefix_sum2D = (arr = []) => {
    let rows = arr.length;
    let cols = arr[0].length;

    let psa = new Array(rows).fill(new Array(cols));

    psa[0][0] = arr[0][0];

    // fill first row and first column 
    for (let i = 1; i < cols; i++) {
        psa[0][i] = psa[0][i - 1] + arr[0][i];
    }

    for (let i = 1; i < rows; i++) {
        psa[i][0] = psa[i - 1][0] + arr[i][0];
    }

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            // values in the cells of new array 
            // are updated 
            psa[i][j] = psa[i - 1][j] + psa[i][j - 1] - psa[i - 1][j - 1] + arr[i][j];
        }
    }

    let str = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            str += psa[i][j] + " ";
        }
        str += '\n';
    }
    console.log(str);
}

prefix_sum2D([
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
]);