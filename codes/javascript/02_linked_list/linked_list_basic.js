import { arrayToList } from "./definition.js";

// 奇偶链表
var oddEvenList = function(head) {
    let evenHead = null;
    let even_ptr = null;
    let cur = head;
    while (cur && cur.next) {
        let next = cur.next;
        cur.next = next.next;
        if(evenHead == null) {
            evenHead = next;
            even_ptr = next;
        } else {
            even_ptr.next = next;
            even_ptr = next;
        }
        if (cur.next != null)
            cur = cur.next;
    }
    if (even_ptr)
        even_ptr.next = null;
    cur.next = evenHead;
    return head;
    
};

// 回文列表
var isPalindrome = function(head) {
    // 快慢指针找中点
    let slow = head, fast = head;
    while(fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    // 反转后半部分链表
    let rightHead = new ListNode();
    let cur = slow.next;
    let pre = null;
    slow.next = null;
    while(cur != null) {
        let tmp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = tmp;
    }
    rightHead.next = pre;
    // 比较前后半部分链表
    let left_ptr = head, right_ptr = rightHead.next;
    while (left_ptr != null && right_ptr != null) {
        if (left_ptr.val != right_ptr.val) 
            return false;
        left_ptr = left_ptr.next;
        right_ptr = right_ptr.next;
    }
    return true;
};

const main = () => {
    const array = [1,2,3,4,5];
    const list = arrayToList(array);
    console.log(oddEvenList(list));
}

main();
