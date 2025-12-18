// 奇偶链表
import { arrayToList } from "./definition.js";

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

const main = () => {
    const array = [1,2,3,4,5];
    const list = arrayToList(array);
    console.log(oddEvenList(list));
}

main();
