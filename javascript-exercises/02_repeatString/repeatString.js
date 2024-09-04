const repeatString = function(word, times) {
    if (times < 0) {
        return 'ERROR';
    }
    let output = '';
    for (let i = 0; i < times; i++) {
        output += word;
    }
    return output;
};

// Do not edit below this line
module.exports = repeatString;
