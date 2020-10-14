const hashStringToNum = (s, table_size = 1000) => {
    let hash = 1213;

    const str = String(s);

    for (const char of str) {
        const charCode = char.charCodeAt(0);
        hash *= charCode % table_size;
    }
    return hash;
}

const hashStringToString = (s, table_size = 1000) => {
    return hashStringToNum(s, table_size).toString();
}

module.exports = {
    hashStringToNum,
    hashStringToString
};
