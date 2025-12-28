import { arrayToList, ListNode, printList } from "./definition.js";

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

// 插入排序
function insertionSort(head) {
    if (head == null && head.next == null) {
        return head;
    }
    let cur = head;
    let tail = head;
    let dummy_head = new ListNode();
    dummy_head.next = head;
    while(cur != null) {
        if (cur.val >= tail.val) { // 已在正确位置
            tail = cur;
        }
        else {
            let pre = dummy_head;
            while (pre.next.val <= cur.val) {
                pre = pre.next;
            }
            tail.next = cur.next;
            cur.next = pre.next;
            pre.next = cur;
        }
        cur = tail.next;
    }

    return dummy_head.next;
}

// 147.对链表进行插入排序
function insertionSortList(head) {
    if (head == null && head.next == null) {
        return head;
    }
    let node_i = head;
    let tail = head;
    let dummy_head = new ListNode();
    dummy_head.next = head;
    while (node_i != null) {
        if (node_i.val >= tail.val) {
            tail = node_i;
        }
        else {
            let pre = dummy_head;
            while(pre.next.val < node_i.val) {
                pre = pre.next;
            }
            tail.next = node_i.next;
            node_i.next = pre.next;
            pre.next = node_i;
        }
        node_i = tail.next;
    }
    return dummy_head.next;
}

// 归并排序
function merge(left, right) {
    let dummy_head = new ListNode();
    let cur = dummy_head;
    while (left != null && right != null) {
        if (left.val <= right.val) {
            cur.next = left;
            left = left.next;
        }
        else {
            cur.next = right;
            right = right.next;
        }
        cur = cur.next;
    }
    if (left != null) {
        cur.next = left;
    }
    else if(right != null) {
        cur.next = right;
    }
    return dummy_head.next;
}

function mergeSort(head) {
    if (head == null || head.next == null) {
        return head;
    }
    let slow = head;
    let fast = head.next;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let left_head = head, right_head = slow.next;
    slow.next = null;

    left_head = mergeSort(left_head);
    right_head = mergeSort(right_head);
    return merge(left_head, right_head);
}

function main() {
    const arr = [1, 5, 2, 4, 10 ,23 ,77 ,11 ,0];
    const head = arrayToList(arr);
    // printList(bubbleSort(head))
    // printList(selectionSort(head))
    printList(mergeSort(head))
    
}

main()