// 找到字符串中所有的字母异位词
const findAnagrams = function(s, p) {
    const map = new Map();
    const ans = [];

    for (const ch of p) {
        map.set(ch, (map.get(ch) || 0) + 1);
    }

    let sum = 0;
    let slow = 0, fast = 0;
    while (slow < s.length && !map.has(s[slow])) {
        slow ++;
    }

    fast = slow;
    while (fast < s.length) {
        // 导入右字符
        const cFast = s[fast];
        if (map.has(cFast)) {
            if (map.get(cFast) > 0) sum ++;
            map.set(cFast, map.get(cFast) - 1);
        }
        if (fast - slow + 1 === p.length) {
            if (sum == p.length) ans.push(slow);
            // 导出左字符
            const cSlow = s[slow];
            if (map.has(cSlow)) {
                if (map.get(cSlow) >= 0) sum --;
                map.set(cSlow, map.get(cSlow) + 1);
            }
            slow ++;
        }
        fast ++;
    }
    return ans;
};

const merge = function(intervals) {
    if (!intervals || intervals.length < 1) return intervals;
    intervals.sort((a, b) => a[0] - b[0]);
    
    const ans = [intervals[0]];

    for (let i = 1; i < intervals.length; i ++) {
        const cur = intervals[i];
        const prev = ans.at(-1);
        if (cur[0] <= prev[1]) {
            prev[1] = Math.max(prev[1], cur[1]);
        } else {
            ans.push(cur);
        }
    }
}


function main() {
    const s = "abab";
    const p = "ab";

    console.log(findAnagrams(s,p));
}

main();