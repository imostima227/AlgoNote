package array;

public class ArrayHeap {
    int[] maxHeap;

    public ArrayHeap(int[] maxHeap) {
        this.maxHeap = maxHeap;
        int size =  maxHeap.length;

        // 从最后一个非叶子节点开始，自底向上构建堆
        for (int i = size / 2 - 1; i >= 0; i--) {
            this.shiftDown(i, size);
        }
    }

    public void maxHeapSort() {
        int size =  maxHeap.length;
        for (int i = size - 1; i >= 0; i--) {
            swap(0, i);
            this.shiftDown(0, i);
        }
    }

    public void shiftDown(int i, int n){
        while (2 * i+ 1 < n) {
            int left = 2 * i + 1, right = 2 * i + 2;
            int larger = i;
            if (right < n && this.maxHeap[left] < this.maxHeap[right]) {
                larger = right;
            }

            // 如果当前节点小于较大子节点，则交换
            if (this.maxHeap[i] < this.maxHeap[larger]) {
                swap(i, larger);
                i = larger;
            }
            else break;
        }
    }

    public void swap(int i, int j){
        int temp = this.maxHeap[i];
        this.maxHeap[i] = this.maxHeap[j];
        this.maxHeap[j] = temp;
    }
}
