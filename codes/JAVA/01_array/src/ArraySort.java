import java.util.Arrays;

public class ArraySort {
    public static void main(String[] args) {
        int[] nums = {1,2,3,7,5,6,10,3};
        bubbleSort(nums);
        System.out.println(Arrays.toString(nums));
    }

    public static void bubbleSort(int[] nums){
        int len = nums.length;
        for (int i = 0; i < len; i++) {
            for (int j = 0; j < len - i - 1; j++)  {
                if(nums[j] > nums[j+1]){
                    int tmp = nums[j+1];
                    nums[j+1] = nums[j];
                    nums[j] = tmp;
                }
            }
        }
    }
}
