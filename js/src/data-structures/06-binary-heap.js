const node = (key, index) => {
    const positions = [index];
    return {
        add: (idx) => positions.push(idx),
        remove: () => positions.pop(),
        key, positions
    }
}

// TODO: finish
const Heap = () => {
    // let parent_index = i // be the parent node index
    // let left_child = 2i+1
    // let right_child = 2i+2
    // (zero based index)

    let items = {};

    const bubble_up = (node) => {

    }
    const bubble_down = () => {

    }

    return {
        insert: () => { },
        poll: () => {
            return items
        },
        remove: () => { },
    }
}