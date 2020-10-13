const stack = (elements = []) => {

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


    return { push, pop, top, isEmpty, count, clear };
}

module.exports = stack;