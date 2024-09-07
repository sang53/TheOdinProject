const add = function(...args) {
	return args.reduce((total, current) => total + current, 0);
};

const subtract = function() {
	return arguments[0] - arguments[1];
};

const sum = function(nums) {
	return nums.reduce((total, num) => total + num, 0);
};

const multiply = function(nums) {
  return nums.reduce((total, num) => total * num, 1);
};

const power = function(base, raisePower) {
	return Math.pow(base, raisePower);
};

const factorial = function(num) {
  if (num === 0) return 1;
  for (i = num - 1; i > 0; i--) {
    num *= i;
  }
  return num;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
