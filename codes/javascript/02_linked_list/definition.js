export function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

export function arrayToList(arr) {
    let listHead = null;
    let currentNode = null;
    for (let val of arr) {
        const newNode = new ListNode(val);
        if (!listHead) {
            listHead = newNode;
            currentNode = newNode;
        } else {
            currentNode.next = newNode;
            currentNode = newNode;
        }
    }
    return listHead;
}