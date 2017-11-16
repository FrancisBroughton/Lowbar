var _ = {};

_.identity = function(x) {
  return x;
};

_.first = function(arr, n = 1) {
  if (!Array.isArray(arr) && !arr === 'string' || arr === null) return undefined;
  if (n === 1) {
      return arr[0];
  } else {
      if (typeof arr === 'string') {
          return arr.slice(0, n).split('');
      } else {
          return arr.slice(0, n);
      }
    }
};

_.last = function(arr, n = 1) {
  if (!Array.isArray(arr) && arr === null || !arr === 'string') return undefined;
  if (n === 1) {
    return arr[arr.length - 1];
} else {
    if (typeof arr === 'string') {
        return arr.slice(-n).split('');
    } else {
        return arr.slice(-n);
    }
  }
};

_.each = function(list, iteratee, context = this) {
  if (Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      iteratee(list[i], i, list);
    }
    return list;
  } 
  else {
    for (var key in list) {
        iteratee(list[key], key, list);
    }
  }
  return list;
}

// _.indexOf = function (array, value, fromIndex) {
//   if (!array) {
//     return -1;
//   }
//   if (fromIndex === true) {
//   }
//   if (array.indexOf(value) > 0) {
//     return array.indexOf(value);
//     }
//   return -1
//   }

_.filter = function(arr, predicate, context = this) {
  if(!predicate) return arr;
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
      if (predicate.call(context, arr[i])) 
      newArr.push(arr[i]);
    }
    return newArr; 
};

_.reject = function (arr, predicate, context = this) {
  if(!predicate) return arr;
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!predicate(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

_.uniq = function (list, isSorted) {
  let listNew = [];
  if (Array.isArray(list) || typeof list === 'string') {
      for (var i = 0; i < list.length; i++) {
          if (listNew.indexOf(list[i]) === -1) 
          listNew.push(list[i]);
      }
      return listNew;
  }
  return listNew;
}

_.map = function (list,iteratee) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
   result.push(func(arr[i], i, arr));
  }
return result;
};

_.map = function(list, iteratee) {
  var result = [];
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      result.push(iteratee(list[i]));
    }
    return result;
   } 
   if(typeof list === 'object') {
   for (let key in list) {
   result.push(iteratee(list[key]));
  }
  return result;
}
else {
   return [];
 }
}



_.contains = function(collection, target) {
  return _.reduce(collection, function(wasFound, item) {
    if (wasFound) {
      return true;
    }
    return item === target;
  }, false);
};






module.exports = _;