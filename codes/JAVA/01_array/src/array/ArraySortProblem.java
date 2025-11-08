package array;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.HashMap;
import java.util.Map;

public class ArraySortProblem {
    public static void main(String[] args) {
        int[] nums = {10};
//        quicksort(nums);
//        ArrayHeapSort arrayHeap = new ArrayHeapSort(nums);
//        arrayHeap.maxHeapSort();
//        System.out.println(maximumGap(nums));

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

    // 220.存在重复元素
    public static boolean containNearbyAlmostDuplicate(int[] nums, int indexDiff, int valueDiff) {
        if (indexDiff < 0 || valueDiff < 0) return false;
        Map<Long, Long> bucket = new HashMap<>();
        long w = (long) valueDiff + 1L;          // 桶宽

        for (int i = 0; i < nums.length; i++) {
            long val = nums[i];
            long id = val < 0 ? (val + 1) / w - 1 : val / w; // 修正负数桶

            if (bucket.containsKey(id)) return true;

            if (bucket.containsKey(id - 1) && Math.abs(bucket.get(id - 1) - val) <= valueDiff)
                return true;

            if (bucket.containsKey(id + 1) && Math.abs(bucket.get(id + 1) - val) <= valueDiff)
                return true;

            if (i >= indexDiff) {
                long oldId = nums[i - indexDiff] < 0
                        ? (nums[i - indexDiff] + 1) / w - 1
                        : nums[i - indexDiff] / w;
                bucket.remove(oldId);
            }
            bucket.put(id, val);
        }
        return false;
    }

    // 164.最大间距
    public static int maximumGap1(int[] nums) {
        // 内存爆了
        if (nums.length < 2) return 0;
        int ans = 0;
        int max = Arrays.stream(nums).max().getAsInt();
        int min = Arrays.stream(nums).min().getAsInt();
        int[] tmp = new int[max - min + 1];
        for (int i = 0; i < nums.length; i++) {
            tmp[nums[i] - min]++;
        }
        int last_idx = -1;
        for (int i = 0; i < tmp.length; i++) {
            if (tmp[i] > 0 && last_idx < 0) {
                last_idx = i;
                continue;
            }
            if (tmp[i] > 0) {
                ans = Math.max(ans, i - last_idx);
                last_idx = i;
            }
        }
        return ans;
    }

    public static int maximumGap2(int[] nums) {
        int n = nums.length;
        if (n < 2) return 0;

        // 1. 线性扫描找最值
        int min = Arrays.stream(nums).min().getAsInt();
        int max = Arrays.stream(nums).max().getAsInt();
        if (min == max) return 0;          // 所有数相同

        // 2. 计算桶宽和桶个数
        int gap = (int) Math.ceil((double) (max - min) / (n - 1)); // 桶宽
        int bucketCount = (max - min) / gap + 1; // 避免出现向下取整导致的边缘值没有桶装的情况
        int[] bucketMin = new int[bucketCount];
        int[] bucketMax = new int[bucketCount];
        boolean[] hasNum = new boolean[bucketCount];
        Arrays.fill(bucketMin, Integer.MAX_VALUE);
        Arrays.fill(bucketMax, Integer.MIN_VALUE);

        // 3. 把每个数塞进对应桶，只更新 min/max
        for (int x : nums) {
            int idx = (x - min) / gap;
            bucketMin[idx] = Math.min(bucketMin[idx], x);
            bucketMax[idx] = Math.max(bucketMax[idx], x);
            hasNum[idx] = true;
        }

        // 4. 相邻非空桶之间找最大间距
        int ans = 0;
        int prevMax = bucketMax[0];        // 第一个非空桶的 max
        for (int i = 1; i < bucketCount; i++) {
            if (hasNum[i]) {
                ans = Math.max(ans, bucketMin[i] - prevMax);
                prevMax = bucketMax[i];
            }
        }
        return ans;
    }
}
