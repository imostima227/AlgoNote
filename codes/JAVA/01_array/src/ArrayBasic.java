import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//  Java 中的数组同样用于存储相同类型的数据，并且在底层实现中也是连续存储的。
//  但在多维数组的情况下，Java 允许创建不规则数组（jagged array），即每个嵌套数组的长度可以不同。例如：
//  int[][] arr = new int[3][];
//  arr[0] = new int[]{1, 2, 3};
//  arr[1] = new int[]{4, 5};
//  arr[2] = new int[]{6, 7, 8, 9};
public class ArrayBasic {
    public static void main(String[] args) {
//        int[] arr = {1,2,3,4};
//        int ans = pivotIndex(arr);
//        rotate(arr, 3);
//        int[][] matrix = {{5,1,9,11},{2,4,8,10},{13,3,6,7},{15,14,12,16}};
//        rotateImage1(matrix);
//        int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};
        int[][] matrix = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
//        List<Integer> list = spiralOrder(matrix);
//        System.out.println(list);
        int[] list = findDiagonalOrder2(matrix);
        System.out.println(Arrays.toString(list));
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
    // 0189
    public static void rotate_self(int[] nums, int k) {
        // 解法不对，还是没想清楚
        // 一共需要移动nums.length次
        // 有两种情况：第一种是k < len, 第二种是k > len
        // 对于k < len : len能够整除k，需要统计；len不能整除k
        // 对于k > len : k能够整除len，直接返回即可；k不能整除len，令k = k % len
        int idx = 0, pre = nums[0];
        // 不能除0
        if (k == 0 || (k > nums.length && k % nums.length == 0))
            return;
        if (k > nums.length)
            k = k % nums.length;

        if (nums.length % k != 0) {
            for (int i = 0; i < nums.length; i++) {
                int nextIdx = (idx + k) % nums.length;
                int tmp = nums[nextIdx];
                nums[nextIdx] = pre;
                pre = tmp;
                idx = nextIdx;
            }
        }
        else {
            int cnt = nums.length / k;
            for (int i = 0; i < nums.length; i++) {
                if(cnt-- <= 0) {
                    idx += 1;
                    cnt = nums.length / k - 1;
                    pre = nums[idx];
                }
                int nextIdx = (idx + k) % nums.length;
                int tmp = nums[nextIdx];
                nums[nextIdx] = pre;
                pre = tmp;
                idx = nextIdx;
            }
        }
    }

    public static void rotate(int[] nums, int k) {
        // 解法1： 采用最小公倍数
        int cnt = gcd(k, nums.length);
        for (int start = 0; start < cnt; start++) {
            int cur = start, pre = nums[start];
            do {
                int next = (cur + k) % nums.length;
                int tmp = nums[next];
                nums[next] = pre;
                pre = tmp;
                cur = next;
            } while (start != cur);
        }


    }

    public static int gcd(int x, int y) {
        return y > 0 ? gcd(y, x % y) : x;
    }

    public static void rotate2(int[] nums, int k) {
        int start = 0, end = nums.length - 1;
        reverse(nums, start, end);
        reverse(nums, start, k - 1);
        reverse(nums, k, end);
    }

    public static void reverse(int[] nums, int start, int end) {
        while(start < end) {
            int tmp = nums[start];
            nums[start] = nums[end];
            nums[end] = tmp;
            start++;
            end--;
        }
    }

    // 0048
    public static void rotateImage(int[][] matrix) {
        // 自己写的，一遍过了。不过有些细节考虑的还是不到位，以后写题目要多思考细节
        int n = matrix.length;
        for (int layer = 0; layer < n / 2; layer++) {

            for (int k = 0; k < n - layer * 2 - 1; k++) {
                int i = layer;
                int j = layer + k;
                int pre = matrix[i][j];
                do {
                    int next_i = j;
                    int next_j = n - 1 - i;
                    int tmp = matrix[next_i][next_j];
                    matrix[next_i][next_j] = pre;
                    pre = tmp;
                    i = next_i;
                    j = next_j;
                } while ((i != layer) || (j != layer + k));
            }
        }
    }

    public static void rotateImage1(int[][] matrix) {
        // 事实上我还是写的复杂了，官方题解的做法要比我写的清楚很多
        // 研究完官方的感觉我写的也没毛病，某种程度上是更清晰的写法
        int n = matrix.length;
        for (int i = 0; i < n / 2; i ++) {
            for (int j = 0; j < (n + 1) / 2; j ++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[n - 1 - j][i];
                matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
                matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
                matrix[j][n - i - 1] = tmp;
            }
        }
    }

    // 0054
    public static List<Integer> spiralOrder(int[][] matrix) {
        // 这个题目我有点没想到怎么模拟，需要定期复习一下
        List<Integer> list = new ArrayList<>();
        int up = 0, down = matrix.length - 1, left = 0, right = matrix[0].length - 1;
        while (true) {
            for (int i = left; i <= right; i++) {
                list.add(matrix[up][i]);
            }
            up ++;
            if (up > down) break;
            for (int i = up; i <= down; i++) {
                list.add(matrix[i][right]);
            }
            right --;
            if (right < left) break;
            for (int i = right; i >= left; i--) {
                list.add(matrix[down][i]);
            }
            down --;
            if (down < up) break;
            for (int i = down; i >= up; i--) {
                list.add(matrix[i][left]);
            }
            left ++;
            if (left > right) break;
        }

        return list;
    }

    // 0498
    public static int[] findDiagonalOrder(int[][] mat) {
        int col = mat[0].length, row = mat.length;
        int[] res = new int[row * col];
        int[][] direction = {{-1, 1}, {1,-1}};
        int res_idx = 0;
        int i = 0, j = 0, dir_idx = 0;
        for (int cnt = 0; cnt < col * row; cnt++) {
            res[res_idx++] = mat[i][j];
            int next_i = i + direction[dir_idx][0];
            int next_j = j + direction[dir_idx][1];
            // 右移
            if ((dir_idx == 0 && next_i < 0 && next_j < col) ||
                    (dir_idx == 1 &&  next_i >= row && next_j >= 0) ||
                    (dir_idx == 1 && next_j < 0 && next_i >= row)) {
                j++;
                dir_idx = (dir_idx + 1) % 2;
            }
            // 下移
            else if (dir_idx == 1 && next_j < 0 || dir_idx == 0 && next_j >= col && next_i >= 0 || dir_idx == 0 && next_i < 0) {
                i++;
                dir_idx = (dir_idx + 1) % 2;
            }
            else {
                i = next_i;
                j = next_j;
            }

        }
        return res;
    }

    public static int[] findDiagonalOrder2(int[][] mat) {
        // 尝试遍历对角线
        int col = mat[0].length, row = mat.length;
        int [] res = new int[row * col];
        int idx = 0;
        for (int cnt = 0; cnt < row + col - 1; cnt++) {
            if (cnt % 2 == 0) { // 沿右上
                int i = cnt < row ? cnt : row - 1;
                int j = cnt < row ? 0 : cnt - row + 1;
                while (i >= 0 && j < col) {
                    res[idx++] = mat[i][j];
                    i--;
                    j++;
                }
            } else { // 沿左下
                int i =  cnt < col ? 0 : cnt - col + 1;
                int j = cnt < col ? cnt : col - 1;
                while (i < row && j >= 0) {
                    res[idx++] = mat[i][j];
                    i ++;
                    j --;
                }
            }
        }

        return res;
    }
}