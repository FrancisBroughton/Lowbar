_.intersection = function () {
  let newArrays = [].slice.call(arguments);
  let resultArr = [];

  if (!Array.isArray(newArrays[0]) && typeof newArrays[0] !== 'string') return [];

  _.each(newArrays[0], function (item) {
    let isCommon = true;
    _.each(newArrays, function (arr) {
      if (!_.contains(arr, item)) isCommon = false;
    });
    if (isCommon && !_.contains(resultArr, item)) resultArr.push(item);
  });
  return resultArr;
};

module.exports = _;