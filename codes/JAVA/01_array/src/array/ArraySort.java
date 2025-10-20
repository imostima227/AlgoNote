package array;

import java.util.Arrays;

public class ArraySort {
    public static void main(String[] args) {
        int[] nums = {34, 7, 23, 32, 5, 62};
//        quicksort(nums);
        ArrayHeapSort arrayHeap = new ArrayHeapSort(nums);
        arrayHeap.maxHeapSort();
        System.out.println(Arrays.toString(arrayHeap.maxHeap));
    }

    public static void bubbleSort(int[] nums){
        int len = nums.length;
        for (int i = 0; i < len; i++) {
            boolean swapped = false;
            for (int j = 0; j < len - i - 1; j++)  {
                if(nums[j] > nums[j+1]){
                    swapped = true;
                    int tmp = nums[j+1];
                    nums[j+1] = nums[j];
                    nums[j] = tmp;
                }
            }
            if (swapped){
                break;
            }
        }
    }

    public static void selectionSort(int[] nums){
        int len = nums.length;
        for (int i = 1; i < len; i++) {
            int minIndex = i - 1;
            for (int j = i; j < len; j++) {
                if (nums[j] < nums[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex != i - 1) {
                int tmp = nums[i - 1];
                nums[i - 1] = nums[minIndex];
                nums[minIndex] = tmp;
            }
        }
    }

    public static void insertionSort(int[] nums){
        int len = nums.length;
        for (int i = 1; i < len; i++) {
            int key = nums[i];
            int idx = i;
            for (int j = i - 1; j >= 0; j--) {
                if (key < nums[j]) {
                    nums[j + 1] = nums[j];
                    idx = j;
                }
                else break;
            }
            nums[idx] = key;
        }
    }

    // 其实不太会
    public static void shellSort(int[] nums){
        int len = nums.length;
        int gap = len / 2;
        while (gap > 0) {
            for (int i = gap; i < len; i++) {
                int tmp = nums[i], j;
                for (j = i; j >= gap && tmp < nums[j - gap]; j -= gap) {
                    nums[j] = nums[j - gap];
                }
                nums[j] = tmp;
            }
            gap /= 2;
        }
    }

    // 归并
    public static void mergeSort(int[] nums){
        if (nums == null || nums.length < 2) {
            return;
        }
        int[] ans = new int[nums.length];
        sort(nums, 0, nums.length - 1, ans);
    }

    public static void sort(int[] nums, int left, int right, int[] ans){
        if (left >= right) {
            return;
        }
        int mid = (left + right) / 2;
        sort(nums, left, mid, ans);
        sort(nums, mid + 1, right, ans);
        merge(nums, left, mid, right, ans);
    }

    public static void merge(int[] nums, int left, int mid, int right, int[] ans) {
        System.arraycopy(nums, left, ans, left, right - left + 1);
        int i = left;
        int j = mid + 1;
        int k =  left;
        while (i <= mid && j <= right) {
            nums[k++] = (ans[i] <= ans[j]) ? ans[i++] : ans[j++];
        }

        while (i <= mid) {
            nums[k++] = ans[i++];
        }
//        while (j <= right) {
//            nums[k++] = ans[j++];
//        }

    }

    // LCR 170
    // 该题目还有一个离散化树状数组的解法，暂时不细究
    public static int reversePairs(int[] records) {
        int[] tmp = new int[records.length];
        return reverse_sort(records, 0, records.length -1, tmp, 0);
    }

    public static int reverse_sort(int[] records, int left, int right, int[] tmp, int cnt) {
        // cnt 当前区间已统计的逆序对对数
        if(left >= right){
            return cnt;
        }
        int mid = (left + right) / 2;
        int left_cnt = reverse_sort(records, left, mid, tmp, cnt);
        int right_cnt = reverse_sort(records, mid+1, right, tmp, cnt);
        int merge_cnt = reverse_merge(records, left, mid, right, tmp);
        return left_cnt + right_cnt + merge_cnt;
    }

    public static int reverse_merge(int[] records, int left, int mid, int right, int[] tmp) {
        // 返回当前区间的逆序对对数
        System.arraycopy(records, left, tmp, left, right - left + 1);
        int i = left;
        int j = mid + 1;
        int k = left;
        int cnt = 0;
        while (i <= mid && j <= right) {
            if (tmp[i] > tmp[j]) {
                records[k++] = tmp[j++];
                cnt += mid - i + 1;
            }
            else
                records[k++] = tmp[i++];
        }
        while (i <= mid) {
            records[k++] = tmp[i++];
        }

        return cnt;
    }

    // 快排
    public static void quicksort(int[] nums) {
        sort(nums, 0, nums.length - 1);
    }

    public static void sort(int[] nums, int left, int right) {
        if (left < right) {
            int pivot = partition(nums, left, right);
            sort(nums, left, pivot - 1);
            sort(nums, pivot + 1, right);
        }
    }

    public static int partition(int[] nums, int left, int right) {
        int pivot = nums[left];
        int i = left, j = right;
        while (i < j){
            while (i < j && nums[j] >= pivot){
                j --;
            }
            while (i < j && nums[i] <= pivot){
                i ++;
            }
            swap(nums, i, j);
        }
        swap(nums, left, i);
        return i;
    }

    public static void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }


}





