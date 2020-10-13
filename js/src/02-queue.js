const queue = (elements = []) => {
    let items = [...elements];

    const isEmpty = function () {
        return items.length == 0;
    };

    const count = function () {
        return items.length;
    };

    const clear = function () {
        items = [];
    };

    const enqueue = function (element) {
        items.push(element);
    };

    const dequeue = function () {
        return items.shift();
    };

    const peek = function () {
        return items[0];
    };

    return { count, clear, peek, enqueue, dequeue, isEmpty };
}

module.exports = queue;