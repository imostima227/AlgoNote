import java.util.Arrays;

//  Java 中的数组同样用于存储相同类型的数据，并且在底层实现中也是连续存储的。
//  但在多维数组的情况下，Java 允许创建不规则数组（jagged array），即每个嵌套数组的长度可以不同。例如：
//  int[][] arr = new int[3][];
//  arr[0] = new int[]{1, 2, 3};
//  arr[1] = new int[]{4, 5};
//  arr[2] = new int[]{6, 7, 8, 9};
public class ArrayBasic {
    public static void main(String[] args) {
        int[] arr = {-1,-100,3,99};
//        int ans = pivotIndex(arr);
        rotate(arr, 2);
        System.out.println(Arrays.toString(arr));
    }

    // 0066
    public static int[] plusOne(int[] digits) {
        int n = digits.length - 1;
        digits[n]++;
        int flag = digits[n] / 10;
        digits[n--] %= 10;
        while (flag != 0 && n >= 0) {
            digits[n] += flag;
            flag = digits[n] / 10;
            digits[n--] %= 10;
        }
        if (flag != 0) {
            int [] ans = new int[digits.length + 1];
            ans[0] = flag;
            System.arraycopy(digits, 0, ans, 1, digits.length);
            return ans;
        }

        return digits;
    }
    // 0724
    public static int pivotIndex(int[] nums) {
        int ans = -1;
        if (nums == null || nums.length == 0) {
            return -1;
        }
        if (nums.length == 1) {
            return 0;
        }
        int[] leftArr = new int[nums.length];
        int[] rightArr = new int[nums.length];
        leftArr[0] = 0;
        rightArr[nums.length - 1] = 0;
        for (int i = 1; i < nums.length; i++) {
            leftArr[i]  = leftArr[i - 1] + nums[i - 1];
        }
        for (int i = nums.length - 2; i >= 0; i--) {
            rightArr[i]  = rightArr[i + 1] + nums[i + 1];
        }
        for (int i = 0; i< nums.length; i++) {
            if (leftArr[i] == rightArr[i]) {
                ans = i;
                break;
            }
        }
        return ans;
    }

    public static int pivotIndexStandard(int[] nums) {
        // 同样是前缀和的思路，但是不需要额外用数组去存，int即可
        // 不需要去求后缀和，后缀和等于数组和减前缀和减当前数
        int total = Arrays.stream(nums).sum();
        // 发现这个地方导致时间变慢了。如果用for循环去计算total，将会快很多
        int left = 0; // 前缀和
        for (int i = 0; i < nums.length; i++) {
            if (total - left - nums[i] == left) {
                return i;
            }
            left = left + nums[i];
        }
        return -1;
        // 提交后发现，虽然之前的代码写的比较冗余且思路繁杂，但是速度比第二次提交的要快很多，而内存仅仅多了1mb（之前是45.2mb，之后是44.4mb）
        //
    }
    //189
    public static void rotate(int[] nums, int k) {
        // 一共需要移动nums.length次
        int idx = 0, pre = nums[0];
        for (int i = 0; i < nums.length; i++) {
            int nextIdx = (idx + k) % nums.length;
            int tmp = nums[nextIdx];
            nums[nextIdx] = pre;
            pre = tmp;
            idx = nextIdx;
        }
    }
}