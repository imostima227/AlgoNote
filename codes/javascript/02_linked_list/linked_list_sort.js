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

// 基数排序

// 把节点插入桶
function insertToBucket(bucket, node) {
    node.next = null; // 非常值得学习
    if (!bucket.head) {
        bucket.head = node;
        bucket.tail = node;
        return;
    }
    bucket.tail.next= node;
    bucket.tail = node;
}

//
function joinBuckets(buckets) {
    let head = null, tail = null;
    for(let bucket of buckets) {
        if (!bucket.head) 
            continue;
        if (!head) 
            head = bucket.head;
        if (tail) {
            tail.next = bucket.head;
        }
        tail = bucket.tail
    }
    if (tail) tail.next = null;
    return head;
}

function radixSort(head) {
    if (head == null || head.next == null)
        return head;

    // 找到最大值
    let max_value = Number.MIN_SAFE_INTEGER;
    for (let cur = head; cur; cur = cur.next) {
        if (cur.val > max_value) {
            max_value = cur.val;
        }
    }

    // 初始化桶
    let buckets = Array.from({length: 10}, () => ({}));

    // 遍历基数
    for(let exp = 1; exp <= max_value ; exp *= 10 ) {
        buckets.forEach( b => {
            b.head = null;
            b.tail = null;
        });

        // 按照当前位分桶
        for (let cur = head; cur; ){
            const next = cur.next;
            const idx = Math.floor(cur.val / exp) % 10;
            insertToBucket(buckets[idx], cur); // TODO:待实现
            cur = next;
        }
        head = joinBuckets(buckets);
    }
    return head;
}

// 删除链表的倒数第n个节点
var removeNthFromEnd = function(head, n) {
    // 创建虚拟节点
    let dummy = new ListNode(0, head);
    let fast = dummy, slow = dummy;

    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;

    return dummy.next;
};

// 链表的中间节点
var middleNode = function(head) {
  if (head == null || head.next == null)
    return head;

  let fast = head, slow = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

// 合并两个升序链表
var mergeTwoLists = function(list1, list2) {
    let dummy_head = new ListNode();
    let cur = dummy_head;
    let node_i = list1, node_j = list2;
    while(node_i && node_j) {
        if (node_i.val <= node_j.val) {
            cur.next = node_i;
            node_i = node_i.next;
        } else {
            cur.next = node_j;
            node_j = node_j.next;
        }
        cur = cur.next;
    }
    if (node_i) {
        cur.next = node_i;
    }
    if (node_j) {
        cur.next = node_j;
    }
    return dummy_head.next;
};

// 递归写法
var mergeTwoLists1 = function(l1, l2) {
    // 1. Base Case: 只要有一个为空，就返回另一个
    if (!l1) return l2;
    if (!l2) return l1;

    // 2. Recursive Step: 谁小，谁就是当前的头，
    //    然后它的 next 指向 "剩下那些节点合并后的结果"
    if (l1.val <= l2.val) {
        l1.next = mergeTwoLists1(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists1(l1, l2.next);
        return l2;
    }
};

function main() {
    // const arr = [1, 5, 2, 4, 10 ,23 ,77 ,11 ,0 , 7, 2, 4, 4, 4, 0, 23, 105, 997];
    const arr = [1, 5, 2, 4, 10, 11];
    const head = arrayToList(arr);
    // printList(bubbleSort(head));
    // printList(selectionSort(head));
    // printList(mergeSort(head));
    // printList(quickSort(head));
    // printList(countingSort(head));
    // printList(bucketSort(head));
    // printList(radixSort(head));
    console.log(middleNode(head).val);
    
}

main()