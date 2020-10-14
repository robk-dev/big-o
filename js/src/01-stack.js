const Stack = (elements = []) => {

    let items = [...elements];

    const isEmpty = function () {
        return items.length == 0;
    };

    const count = function () {
        return items.length;
    };

    const push = function (element) {
        items.push(element);
    };

    const pop = function () {
        return items.pop();
    };

    const top = function () {
        return items[items.length - 1];
    };


    const clear = function () {
        items = [];
    };

    const iterator = function () {
        let i = -1;

        return {
            next: () => ({
                value: items[++i],
                done: i >= count()
            })
        };
    };

    return {
        [Symbol.iterator]: iterator,
        push, pop, top, isEmpty, count, clear,

    };
};

module.exports = Stack;
