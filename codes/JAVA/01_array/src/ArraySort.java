import java.util.Arrays;

public class ArraySort {
    public static void main(String[] args) {
        int[] nums = {1,2,3,7,5,6,10,3};
        insertionSort(nums);
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
}
