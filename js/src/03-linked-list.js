const Node = function (element) {
    this.element = element;
    this.next = null;

    this.get = () => {
        return this.element;
    }
};

const linked_list = () => {
    let length = 0;
    let head = null;

    const getHead = function () {
        return head;
    };

    const isEmpty = function () {
        return length === 0;
    };

    const count = function () {
        return length;
    };

    const append = function (element) {
        const node = new Node(element);
        let temp;

        if (!head) {
            head = node;
        } else {
            temp = head;

            while (temp.next) {
                temp = temp.next;
            }

            temp.next = node;
        }
        length++;
    };

    const insertAt = function (element, pos) {
        if (pos >= 0 && pos <= length) {
            const node = new Node(element);
            let temp = head;
            let prev;
            let index = 0;

            if (pos === 0) {
                node.next = temp;
                head = node;

            } else {
                while (index++ < pos) {
                    prev = temp;
                    temp = temp.next;
                }
                node.next = temp;
                prev.next = node;
            }

            length++;
            return true;
        } else {
            return false;
        }
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
                prev = temp;
                temp = temp.next;
            }

            prev.next = temp.next;
        }

        length--;
        return temp.get();
    };

    const remove = function (element) {
        const index = indexOf(element)
        return removeAt(index);
    };

    const indexOf = function (element) {
        let temp = head;
        let index = 0;

        while (temp) {
            if (element === temp.element) {
                return index;
            }
            index++;
            temp = temp.next;
        }
        return -1;
    };

    const toString = function () {
        let temp = head;
        let str = "";

        while (temp) {
            str += "-" + temp.element;
            temp = temp.next;
        }

        return str;
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
        getHead, isEmpty, count, append, insertAt, remove, removeAt, indexOf, toString
    };
};

module.exports = linked_list;