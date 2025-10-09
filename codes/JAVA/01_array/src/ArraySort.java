import java.util.Arrays;

public class ArraySort {
    public static void main(String[] args) {
        int[] nums = {1,2,3,7,5,6,10,3};
        mergeSort(nums);
        System.out.println(Arrays.toString(nums));
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

}
