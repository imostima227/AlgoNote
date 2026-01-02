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

// 快速排序
function partition(left, right) {
    if (left == right || left.next == right)
        return left;
    
    let node_i = left, node_j = left.next;
    while (node_j != right) {
        if (node_j.val < left.val) {
            node_i = node_i.next;
            [node_i.val, node_j.val] = [node_j.val, node_i.val];
        }
        node_j = node_j.next;
    }

    [node_i.val, left.val] = [left.val, node_i.val];
    return node_i;
}

function quickSortFunction(left, right) {
    if (left == right || left.next == right)
        return left;

    let pivot = partition(left, right);
    quickSortFunction(left, pivot);
    quickSortFunction(pivot.next, right);

    return left;
}

function quickSort(head) {
    if (head == null || head.next == null)
        return head;

    return quickSortFunction(head, null);
}

// 计数排序
function countingSort(head) {
    if (head == null || head.next == null)
        return head;

    // 遍历链表找最大值和最小值
    let min_value = Number.MAX_SAFE_INTEGER;
    let max_value = Number.MIN_SAFE_INTEGER;
    
    let cur = head;
    while (cur != null) {
        min_value = Math.min(min_value, cur.val);
        max_value = Math.max(max_value, cur.val);
        cur = cur.next;
    }

    // 计数
    let size = max_value - min_value + 1;
    let arr = Array(size).fill(0);
    cur = head;
    while (cur != null) {
        arr[cur.val - min_value] ++;
        cur = cur.next;
    }

    // 排序
    let dummy_head = new ListNode();
    cur = dummy_head;
    
    for (let [idx, val] of arr.entries()) {
        while (val > 0) {
            let new_node = new ListNode(idx + min_value);
            cur.next = new_node;
            cur = cur.next;
            val --;
        }
    }
     
    return dummy_head.next;
}

// 桶排序
function insertBucket(buckets, index, value) {
    if (buckets[index] == null) {
        buckets[index] = new ListNode(value);
        return;
    }
    let newHead = new ListNode(value);
    newHead.next = buckets[index];
    buckets[index] = newHead;
}

// bucket_size的意思是每个桶有多少个元素
function bucketSort(head, bucket_size = 5) {
    if (head == null || head.next == null)
        return head;

    // 找出桶中的最大元素和最小元素
    let min_value = Number.MAX_SAFE_INTEGER;
    let max_value = Number.MIN_SAFE_INTEGER;
    let cur = head;
    
    while (cur != null) {
        min_value = Math.min(min_value, cur.val);
        max_value = Math.max(max_value, cur.val);
        cur = cur.next;
    }

    // 计算桶的数量并初始化桶
    let bucket_cnt = Math.ceil((max_value - min_value + 1) / bucket_size);
    let buckets = new Array(bucket_cnt).fill(null);

    // 给每个桶添加元素
    cur = head;
    while(cur != null) {
        let idx = Math.floor((cur.val - min_value + 1) / bucket_size);
        insertBucket(buckets, idx, cur.val);
        cur = cur.next;
    }

    // 对每个桶进行排序
    let dummy_head = new ListNode();
    cur = dummy_head;
    for (const bucket of buckets){
        if (bucket != null) {
            let sorted_bucket = mergeSort(bucket);
            while (sorted_bucket != null) {
                cur.next = sorted_bucket;
                cur = cur.next;
                sorted_bucket = sorted_bucket.next;                
            }
        }
    }
    
    return dummy_head.next;
}

function main() {
    const arr = [1, 5, 2, 4, 10 ,23 ,77 ,11 ,0 , 7, 2, 4, 4, 4, 0, 23];
    const head = arrayToList(arr);
    // printList(bubbleSort(head));
    // printList(selectionSort(head));
    // printList(mergeSort(head));
    // printList(quickSort(head));
    // printList(countingSort(head));
    printList(bucketSort(head));
    
}

main()