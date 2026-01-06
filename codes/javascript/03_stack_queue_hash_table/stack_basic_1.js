const validateStackSequences = function(pushed, popped) {
    const stack = [];
    let pop_i = 0;
    for (const n of pushed) {
        stack.push(n);
        while (stack.length && stack.at(-1) === popped[pop_i]) {
            stack.pop();
            pop_i++;
        }
    }

    return stack.length === 0;
};

const main = function(){
    const pushed = [1,2,3,4,5];
    const popped = [4,5,3,2,1];
    validateStackSequences(pushed, popped);
}

main();