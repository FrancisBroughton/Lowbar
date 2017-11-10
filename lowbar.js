var _ = {};

_.identity = function(x) {
  return x;
};

_.first = function(arr, n = 1) {
  if (n === 1) return arr[0];
  return arr.slice(0, n);
};

module.exports = _;