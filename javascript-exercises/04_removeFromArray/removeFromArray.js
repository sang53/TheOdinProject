const removeFromArray = function() {
    let output = [];
    let hs = new Set();
    for (let i = 1; i < arguments.length; i++) {
        hs.add(arguments[i]);
    }
    for (let i = 0; i < arguments[0].length; i++) {
        if (!hs.has(arguments[0][i])) {
            output.push(arguments[0][i]);
        }
    }
    return output;
};

// Do not edit below this line
module.exports = removeFromArray;
