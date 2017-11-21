var path = require('path');
var expect = require('chai').expect;
var _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });

describe('#identity', () => {
    it('returns the argument passed to the function', () => {
      expect(_.identity()).to.equal(undefined);
      expect(_.identity(1)).to.equal(1);
      expect(_.identity('a')).to.equal('a');
      expect(_.identity(true)).to.equal(true);
      expect(_.identity(null)).to.equal(null);
    });
    it('returns the same reference as the passed argument', () => {
      var input = [1, 2, 3];
      expect(_.identity(input) === input).to.equal(true);
      
      var input1 = {name: 'Francis'};
      expect(_.identity(input1)).to.equal(input1);
    });
    //////////////////////////////////////////////////////
describe('#first', () => {
  it('returns the first element in an array', () => {
    var input = [3,7,2];
    expect(_.first(input)).to.equal(3)
  })
  it('returns n elements of an array',() => {
    var input = [3, 7, 2, 5, 1];
    var n = 4;
    expect(_.first(input, n)).to.eql([3,7,2,5]);

    var input1 = [3, 7, 2, 5, 1];
    var n1 = 2;
    expect(_.first(input1, n1)).to.eql([3,7]);

    var input2 = [3, 7, 2, 5, 1];
    var n2 = 5;
    expect(_.first(input2, n2)).to.eql([3,7,2,5,1]);
  });
  it('returns the first element of a string', () => {
    let input = "hello";
    expect(_.first(input)).to.eql("h");
  })
});
/////////////////////////////////////////////////////////////////////

describe('#last',() => {
      it('returns undefined if array or string is not passed in', () => {
        expect(_.last({ name: 'Francis' })).to.equal(undefined);
        expect(_.last(0)).to.equal(undefined);
        expect(_.last(NaN)).to.equal(undefined);
        expect(_.last(null)).to.equal(undefined);
        expect(_.last(3)).to.equal(undefined);
      })

      it('returns the last element of an array', () => {
        let input = [1, 2, 3, 4, 5];
        let n = 1
        expect(_.last(input)).to.equal(5);
        console.log(input)
      });
      it('returns the nth element from the end of an array', () => {
        let input = [1, 2, 3, 4, 5];
        let n = 3;
        expect(_.last(input, n)).to.eql([3,4,5]);
        let input1 = [3, 7, 2, 5, 1];
        let n1 = 2;
        expect(_.last(input1, n1)).to.eql([5, 1]);
      });
      it('returns the last character in a string', () => {
        let input = 'francis';
        expect(_.last(input)).to.eql('s')
      })
      it('returns the last n characters in a string when a n arguement is given', () => {
        let input = 'francis';
        let n = 2
        expect(_.last(input, n)).to.eql(['i','s']);
      })
    });
    /////////////////////////////////////////////////////////////////////////////

describe('#each', () => {
  it('knows how many iteratees have been passed into the array',() => {
      let count = 0;
      function counter () {
        count++;
      }
      _.each(['a','b','c','d','e'], counter);
      expect(count).to.equal(5);
    });
  it('calls the iteratee passing each element of the array as the first argument', () => {
      let bucket = [];
      function argsBucket () {
        bucket.push(arguments[0]);
      }
      _.each(['a','b','c','d','e'], argsBucket);
      expect(bucket).to.eql(['a','b','c','d','e']);
      });

  it('iteratee calls with each character in a string to equal length', ()  => {
      let count = 0;
      function counter () {
        count++
      }
      _.each('francis', counter)
      expect(count).to.equal(7)
      })

  it('counts the iteratee passed into an object', () => {
      let count = 0;
      function counter () {
        count++
      }
      _.each({1:1, 2:2, 3:3}, counter)
      expect(count).to.equal(3)
      })
    });

    /////////////////////////////////////////////////////

// describe('#indexOf', () => {
//   it('returns -1 if value cannot be found in the array', function () {
//     let arr = ['a','b','c','d','e'];
//     let n = 'f';
//     let expected = -1;
//     expect(_.indexOf(arr, n)).to.equal(expected);
//   });
//   it('returns the index of which the value can be found in the array', function () {
//     let arr = ['a','b','c','d','e'];
//     let n = 'b';
//     let expected = 1;
//     expect(_.indexOf(arr, n)).to.equal(expected);
//   });
//   it('searches for the index position of the passed value from the specified number if passed as a third arg', function () {
//     expect(_.indexOf([7, 8, 9, 10, 11, 12, 13, 14, 15], 11, 2)).to.equal(4);
//     expect(_.indexOf([4, 2, 9, 7, 1, 5, 6, 3, 8], 7, 5)).to.equal(-1);
//     expect(_.indexOf('string', 'n', 2)).to.equal(4);
//     expect(_.indexOf('string', 'g', 3)).to.equal(5);
// });
// });

describe('#filter', () => {
  it('returns the values that equal true for numbers from the list', () => {
    let arr = [1, 2, 3, 4, 5, 6];
    let func = (function(num) { return num % 2 === 0; });
    expect(_.filter(arr, func)).to.eql([2, 4, 6]);
  }); 
  it('returns the values that equal true for letters from the list', () => {
    let arr = ['a','b','c','d','c'];
    let func = (function(char) { return char === 'c'; });
    expect(_.filter(arr, func)).to.eql(['c', 'c']);
});
  it('returns an empty array if an invalid format is given or no item returns true', function () {
    expect(_.filter([1,3,5,7], function (num) {
        return num % 2 === 0;
    })).to.eql([]);
    expect(_.filter('hi', function (letter) {
        return letter === 'n';
    })).to.eql([]);
    expect(_.filter([1, 2, 3, 4, 5, 6], function (letter) {
        return letter === 'n';
    })).to.eql([]);
});
it('returns the array if there is no predicate', () => {
  expect(_.filter(['f', 'r', 'a', 'n'])).to.eql(['f', 'r', 'a', 'n']);
});


describe('#reject', () => {
it('returns the values that are equal to false for numbers in the list', function () {
  expect(_.reject([1, 2, 3, 4, 5, 6], (num) => {
    return num % 2 === 0;
  })).to.eql([1, 3, 5]);
  expect(_.reject('francis', function (letter) {
    return letter === 'n';
})).to.eql(['f','r','a','c','i','s']);
}); 
it('returns the values that equal false for letters from the list', function () {
  let arr = ['a','b','c','d','c'];
  let func = (function(char) { return char === 'c'; });
  expect(_.reject(arr, func)).to.eql(['a','b','d']);
}); 
it('returns an empty array if an invalid format is given or no item returns true', function () {
  expect(_.reject([1,2,3,4,5,6], (num) => {
      return num % 2 === 0;
  })).to.eql([1,3,5]);
  expect(_.reject('hi', (letter) => {
      return letter === 'f';
  })).to.eql(['h','i']);
  expect(_.reject([1, 2, 3, 4, 5, 6], (letter) => {
      return letter === 'f';
  })).to.eql([1, 2, 3, 4, 5, 6]);
});
it('returns the array if there is no predicate', () => {
  expect(_.reject(['f', 'r', 'a', 'n'])).to.eql(['f', 'r', 'a', 'n']);
});


describe('#uniq', () => {
  it('returns an empty array if arguemnet passed is not a valid format', () => {
    expect(_.uniq(665)).to.eql([]);
    expect(_.uniq({})).to.eql([]);
    expect(_.uniq(true)).to.eql([]);
    expect(_.uniq('')).to.eql([]);
  });
  it('returns a new array of unique items from a passed array or string', function () {
    expect(_.uniq([1,3,4,1,2,2,4,3,5])).to.eql([1,3,4,2,5]);
    expect(_.uniq('ffrraanncciiss')).to.eql(['f','r','a','n','c','i','s']);
  });
  });

describe('_.map', () => {
  it('returns an empty object if first argument it not a valid input', () => {
    expect(_.map(false)).to.eql([]);
    expect(_.map(135465)).to.eql([]);
  })
  it('returns a modified array', () => {
    let list = [1,2,3];
    let func = (function(num) {return num * 3; });
    let expected = [3,6,9];
    expect(_.map(list, func)).to.eql(expected);
  });
  it('returns a modified object', () => {
    let obj = {one: 1, two: 2, three: 3} 
    let func = (function(num) { return num * 3; })
    let expected = [3,6,9]
    expect(_.map(obj, func)).to.eql(expected);
  })
//   it('returns a modified string', () => {
//     let input = ['cat', 'dog','fish'];
//     let func = (function(add) {return 'a ' + input })
//     let expected = ['a cat', 'a dog', 'a fish'];
//     expect(_.map(input, func)).to.eql(expected)
// });
});

describe('#pluck', () => {
  it('For an array of objects, a array of object key values will be returned', function () {
    expect(_.pluck([{a:1}, {a:3}, {a:4}], 'a')).to.eql([1,3,4]);
    expect(_.pluck([[1,2,3], [1,2,3], [1,2,3]], 2)).to.eql([3,3,3]);    
    expect(_.pluck([{a:1, b:3}, {a:3, c:4}, {a:4, d:6}], 'a')).to.eql([1,3,4]);      
  });
  it('returns false for invalid inputs', function () {
    expect(_.pluck([{a:1}, {a:3}, {a:4}], 'b')).to.eql([undefined, undefined, undefined]);
    expect(_.pluck('hello',5)).to.eql([undefined, undefined, undefined, undefined, undefined]);
    expect(_.pluck(NaN, 0)).to.eql([]);
    expect(_.pluck(undefined,undefined)).to.eql([]);
  });
});

describe('#contains', () => {
  it('returns true if the value present in the array',() => {
      let input = [1,2,3,4,5];
      let value = 3;
      let fromIndex = 1;
      expect(_.contains(input, value, fromIndex)).to.equal(true);
  });

  it('returns false if the value is not present in the array',() => {
    let arr = [1,2,3,4,5];
    let value = 7;
    let fromIndex = 1
    expect(_.contains(arr, value, fromIndex)).to.equal(false);
});

  it('returns true if the value is present in a string', () => {
    let str = "francis"
    let value = 'a'
    let fromIndex = 1
    expect(_.contains(str, value,fromIndex)).to.equal(true)
  })
  it('returns false if the value is not present in a string', () => {
    let str = "francis"
    let value = 'x'
    let fromIndex = 1
   expect(_.contains(str, value, fromIndex)).to.equal(false)
  })
  it('returns true of the value is present in an object', () => {
    let obj ={1:"f", 2:"r", 3:'a', 4:'n'}
    let value = "f"
    let fromIndex = 1
    expect(_.contains(obj, value, fromIndex)).to.equal(true)
  })
  it('returns true of the value is present in an object', () => {
    let obj ={1:"f", 2:"r", 3:'a', 4:'n'}
    let value = "c"
    let fromIndex = 1
    expect(_.contains(obj, value, fromIndex)).to.equal(false)
});
it('starts the search fromIndex and returns either true of false for string, object and array', () => {
  expect(_.contains([1,2,3,4,5],1, 1)).to.equal(false)
  expect(_.contains([1,2,3,4,5],5, 3)).to.equal(true)
})
it('returns false if not given a target value', () => {
  expect(_.contains('abc')).to.equal(false);
  expect(_.contains([1,2,3])).to.equal(false)
});
});

describe('#reduce', () => {
  it('Checks if function works on numeric array', function () {
    var input = [1, 2, 3];
    var actual = _.reduce(input, function (memo, num) { return memo + num; }, 0);
    var expected = 6;
    expect(actual).to.equal(expected);
  });
  it('Checks if function works on numeric array with non-zero memo', function () {
    let input = [1, 2, 3];
    let actual = _.reduce(input, function (memo, num) { return memo + num; }, -3);
    let expected = 3;
    expect(actual).to.equal(expected);
  });
  it('Checks if function works on numeric array with another iteratee', function () {
    let input = [1, 2, 3];
    let actual = _.reduce(input, function (memo, num) { return memo * num * num; }, 1);
    let expected = 36;
    expect(actual).to.equal(expected);
  });
  it('returns a single numerical value for an object', function () { 
    let input = {a: 5, b: 10, c: 15};
    let actual = _.reduce(input, function (memo, num) { return memo + num
    let expected = 30
    expect(_.reduce(actual).to.equal(expected));
  })
  it('returns a single character value for an object', function () { 
    let input = { 1: 'f', 2: 'r', 3: 'a', 4:'n'};
    let actual = _.reduce(input, function (memo, num) { return memo + num
    let expected = 'fran'
    expect(_.reduce(actual).to.equal(expected));
  });
});
//////////////////
describe('#every', () => {
  it('returns true if not given a valid list', () => {
    expect(_.every()).to.equal(true);
    expect(_.every(2)).to.equal(true);
    expect(_.every('francis')).to.equal(true);
    expect(_.every(['francis'])).to.equal(true);
    expect(_.every({0:'francis'})).to.equal(true);
});
it('returns true if all items in array passes the predicate', () => {
  const list = [ 2, 4, 6, 8 ];
  const predicate = (item) => item % 2 === 0;
  let expected = true
  expect(_.every(list, predicate)).to.equal(expected);
});
it('returns false if one item in array passes the predicate', () => {
  const list = [ 1,2, 4, 6, 8 ];
  const predicate = (item) => item % 2 === 0;
  let expected = false
  expect(_.every(list, predicate)).to.equal(expected);
});
it('returns true if all characters in a string passes the predicate', () => {
  const list = 'francis';
  const predicate = ((character) => character === character.toLowerCase());
  let expected = true
  expect(_.every(list, predicate)).to.equal(expected);
});
it('returns false if one characters in a string fails the predicate', () => {
  const list = 'FrAnCis';
  const predicate = ((character) => character === character.toLowerCase());
  let expected = false
  expect(_.every(list, predicate)).to.equal(false);
});
it('returns true if every item in an object passes the predicate', () => {
  const list = { 1: 2, 2: 4, 3: 6, 4: 8 };
  const predicate = (item) => item % 2 === 0;
  let expected = true
  expect(_.every(list, predicate)).to.equal(expected);
});
it('returns false if empty predicate', () => {
  expect(_.every([1, 2, 3], () => { })).to.be.false;
});
it('returns true if no predicate argument',() => {
  expect(_.every([1, 2, 3])).to.be.true;
});
});

});
});
});

});
});
});

