import { arrayToList, printList } from "./definition.js";

function bubbleSort(head) {
    if(head == null && head.next == null) return head;

    let node_i = head;
    let tail = null;
    while (node_i != null) {
        let node_j = head;
        while (node_j.next != tail) {
            if (node_j.val > node_j.next.val) {
                let temp = node_j.val;
                node_j.val = node_j.next.val;
                node_j.next.val = temp;
            }
            node_j = node_j.next;
        }
        tail = node_j;
        node_i = node_i.next;
    }
    return head;
}

const main = () => {
    const array = [4,2,1,3];
    const list = arrayToList(array);
    printList(bubbleSort(list));
}

main();