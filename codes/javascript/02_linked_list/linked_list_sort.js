import { arrayToList, printList } from "./definition.js";

// 冒泡排序
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

// 选择排序
function selectionSort(head) {
    let node_i = head;
    while (node_i != null && node_i.next != null) {
        let min_node = node_i;
        let node_j = node_i.next;
        
        while (node_j != null) {
            if (node_j.val < min_node.val) {
                min_node = node_j;
            }
            node_j = node_j.next;
        }
        if (node_i != min_node) {
            [node_i.val, min_node.val] = [min_node.val, node_i.val];
        }
        node_i = node_i.next;
    }
    return head;
}

function main() {
    const arr = [1, 5, 2, 4, 10 ,23 ,77 ,11 ,0];
    const head = arrayToList(arr);
    // printList(bubbleSort(head))
    printList(selectionSort(head))
}

main()