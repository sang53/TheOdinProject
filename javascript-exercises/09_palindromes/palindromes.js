const palindromes = function (input) {
    let temp = input.replace(/\W/g, "").toLowerCase();
    let left = 0;
    let right = temp.length - 1;
    
    while (left < right) {
        if (temp[left] != temp[right]) return false;
        left += 1;
        right -= 1;
    }
    return true;
    
};

// Do not edit below this line
module.exports = palindromes;
