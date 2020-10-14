const { hashStringToNum, hashStringToString } = require("../src/05-hash-string");

describe("HashString Suite:", () => {
    test("hashStringToNum() should return a number bigger than 0 given a string", () => {
        const number = hashStringToNum('abc');
        expect(typeof number).toBe('number');
        expect(number).toBeGreaterThan(0);
    });
    test("hashStringToString() should return a number bigger than 0 given a string", () => {
        const key = 'abc';
        const hash_string = hashStringToString('abc');
        expect(key !== hash_string).toBe(true);
    });
});
