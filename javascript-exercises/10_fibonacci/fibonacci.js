const fibonacci = function(num) {
    if (num < 0) return "OOPS";
    if (num == 0) return 0;
    if (num <= 2) return 1;
    let prev = 1;
    let curr = 1;

    for (i = 3; i <= num; i++) {
        [curr, prev] = [prev + curr, curr];
    }
    return curr;
};

// Do not edit below this line
module.exports = fibonacci;
