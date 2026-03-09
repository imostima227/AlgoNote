// 36. 写一个函数统计字符串中每个字符的出现次数
function countCharacters(str) {
    let count = {};
    for (const c of str) {
        count[c] = (count[c] || 0) + 1;
        // count[c] = count[c] ? count[c] + 1: 1;
    }

    return count;
}

// 37. 如何将字符串的首字母大写？
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// 38. 写一个函数检查字符串是否为回文
function isPalindrome(str) {
    let left = 0, right = str.length - 1;
    while (left < right) {
        if (!isAlphaNumberic(str[left])) {
            left ++
        } else if (!isAlphaNumberic(str[right])) {
            right --;
        } else {
            if (str[left].toLowerCase() !== str[right].toLowerCase()) {
                return false;
            }
            left ++;
            right --;
        }
    }
    return true;
}

function isAlphaNumberic(char) {
    return /[a-z0-9]/i.test(char);
}

function isPalindrome2(str) {
    const cleaned = str.toLowerCase().replace(/[a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}


// 39. 替换字符串中的所有空格为下划线
function replaceSpace(str) {
    // return str.replace(' ', '_'); 错误示范，因为只能替换第一个
    return str.replace(/[ ]/g, '_');
}

// 40. 提取字符串中的所有数字
function extractNumbers(str) {
    return str.match(/[\d+]/g) || [];
}

// 41. 如何截取字符串的前n个字符
function truncateString(str) {
    return str.slice(0, n);
    // return str.substring(0, n);
}