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
        let prev;
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

    const removeAt = function (pos) {
        if (pos < 0 || pos >= length || !head) {
            return null;
        }

        let temp = head;
        let prev;
        let index = 0;

        if (pos === 0) {
            head = temp.next;
        } else {
            while (index++ < pos) {
                temp = temp.next;
            }

            temp.prev.next = temp.next; // swap
            temp.next.prev = temp.prev.prev;
        }

        length--;
        return temp.get();
    };

    const remove = function (element) {
        const index = indexOf(element)
        return removeAt(index);
    };

    const peek = {
        first: () => {
            return head;
        }, last: () => {
            return tail;
        }
    }

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
            str += "<->" + `(${temp.element})`;
            temp = temp.next;
        }

        return str + '<-';
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
        getHead, getTail, isEmpty, count, append, prepend, peek, insertAt, remove, removeAt, indexOf, toString
    };
};

module.exports = doubly_linked_list;
