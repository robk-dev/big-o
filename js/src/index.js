const Stack = require('./01-stack');
const Queue = require('./02-queue');
const LinkedList = require('./03-linked-list');
const Map = require('./04-map');
const HashTable = require('./05-hash-table');
const HashMap = require('./06-hash-map');

module.exports = {
    Map,
    Stack,
    Queue,
    HashMap,
    HashTable,
    LinkedList
};


const hMap = HashMap();

hMap.set(1, 2);
console.log(hMap)