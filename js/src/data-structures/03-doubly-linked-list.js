const deep_equal = require('deep-equal');

const Node = function (element, next = null, prev = null) {
    this.element = element;
    this.next = next;
    this.prev = prev;

    this.get = () => {
        return this.element;
    }
};

const doubly_linked_list = () => {
    let length = 0;
    let head = null;
    let tail = null;

    const getHead = () => {
        return head;
    };

    const getTail = () => {
        return tail;
    };

    const isEmpty = () => {
        return length === 0;
    };

    const count = () => {
        return length;
    };

    const append = (element) => {
        const node = new Node(element);
        if (!tail) {
            head = tail = node;
        } else {
            tail.next = node;
            node.prev = tail;
            tail = node;
        }
        length++;
        return true;
    };

    const prepend = (element) => {
        const node = new Node(element);
        if (!head) {
            head = tail = node;
        } else {
            head.prev = node;
            node.next = head;
            head = node;
        }
        length++;
        return true;
    };

    const insertAt = function (element, pos) {
        if (pos < 0 || pos > length) {
            return false;
        }

        const node = new Node(element);
        let temp = head;
        let index = 0;

        if (pos === 0) {
            return prepend(element);
        } else {
            while (index++ < pos) {
                temp = temp.next;
            }
            node.next = temp; // swap
            temp.prev.next = node;
            node.prev = temp.prev;
            temp.prev = node;
        }

        length++;
        return true;
    };

    const removeFirst = () => {
        let temp = head;

        temp.next.prev = null;
        head = temp.next;

        const data = temp.element;

        temp = temp.next = temp.element = null;
        length--;

        return data;
    };

    const removeLast = () => {
        let temp = tail;

        tail.prev.next = null;
        tail = temp.prev;

        const data = temp.element;

        temp = temp.prev = temp.element = null;
        length--;

        return data;
    };

    const removeNode = function (node) {
        if (node.prev === null) {
            return removeFirst();
        }
        if (node.next == null) {
            return removeLast();
        }

        node.next.prev = node.prev;
        node.prev.next = node.next;

        const data = node.element;
        node = node.next = node.prev = node.element = null;

        length--;
        return data;
    };

    const removeAt = function (pos) {
        if (pos < 0 || pos >= length || !head) {
            return null;
        }

        let temp;
        let index = 0;

        if (pos === 0) {
            return removeFirst();
        }

        if (pos === length - 1) {
            return removeLast();
        }

        if (pos < length / 2) {
            temp = head;
            while (index++ < pos) {
                temp = temp.next;
            }

        } else {
            temp = tail;
            index = length;
            while (--index > pos) {
                temp = temp.prev;
            }

        }
        return removeNode(temp);
    };

    const remove = function (element) {
        const index = indexOf(element)
        return removeAt(index);
    };

    const indexOf = function (element) {
        let temp = head;
        let index = 0;

        while (temp) {
            if (deep_equal(element, temp.element)) {
                return index;
            }
            index++;
            temp = temp.next;
        }
        return -1;
    };

    const toString = function () {
        let temp = head;
        let str = "->";

        while (temp) {
            str += `(${temp.element})<->`;
            temp = temp.next;
        }

        return str.slice(0, -3) + '<-';
    };

    const iterator = () => {
        let temp = { next: head };
        return {
            next: () => ({
                value: temp = temp.next,
                done: !temp
            })
        };
    };

    return {
        [Symbol.iterator]: iterator,
        getHead, getTail, isEmpty, count, append, prepend, insertAt, remove, removeAt, indexOf, toString
    };
};

module.exports = doubly_linked_list;
