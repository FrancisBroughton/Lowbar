var path = require('path');
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require(path.join(__dirname, '..', './lowbar.js'));

describe('_', () => {
  'use strict';

  it('is an object', () => {
    expect(_).to.be.an('object');
  });
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
});


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


describe('#filter', () => {
  it('returns the values that equal true for numbers from the list', () => {
    let arr = [1, 2, 3, 4, 5, 6];
    let func = ((num) => { return num % 2 === 0; });
    expect(_.filter(arr, func)).to.eql([2, 4, 6]);
  }); 

  it('returns the values that equal true for letters from the list', () => {
    let arr = ['a','b','c','d','c'];
    let func = ((char) => { return char === 'c'; });
    expect(_.filter(arr, func)).to.eql(['c', 'c']);
  });

  it('returns an empty array if an invalid format is given or no item returns true',  () => {
    expect(_.filter([1,3,5,7], (num) => {
        return num % 2 === 0;
    })).to.eql([]);
    expect(_.filter('hi', (letter) =>{
        return letter === 'n';
    })).to.eql([]);
    expect(_.filter([1, 2, 3, 4, 5, 6], (letter) => {
        return letter === 'n';
    })).to.eql([]);
  });

  it('returns the array if there is no predicate', () => {
    expect(_.filter(['f', 'r', 'a', 'n'])).to.eql(['f', 'r', 'a', 'n']);
});


describe('#reject', () => {
  it('returns the values that are equal to false for numbers in the list', () => {
    expect(_.reject([1, 2, 3, 4, 5, 6], (num) => {
      return num % 2 === 0;
    })).to.eql([1, 3, 5]);

    expect(_.reject('francis',(letter) => {
      return letter === 'n';
      })).to.eql(['f','r','a','c','i','s']);
  }); 

  it('returns the values that equal false for letters from the list', () => {
    let arr = ['a','b','c','d','c'];
    let func = ((char) => { return char === 'c'; });
    expect(_.reject(arr, func)).to.eql(['a','b','d']);
  }); 

  it('returns an empty array if an invalid format is given or no item returns true', () => {
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
});


describe('#uniq', () => {
  it('returns an empty array if arguemnet passed is not a valid format', () => {
    expect(_.uniq(665)).to.eql([]);
    expect(_.uniq({})).to.eql([]);
    expect(_.uniq(true)).to.eql([]);
    expect(_.uniq('')).to.eql([]);
  });

  it('returns a new array of unique items from a passed array or string', () => {
    expect(_.uniq([1,3,4,1,2,2,4,3,5])).to.eql([1,3,4,2,5]);
    expect(_.uniq('ffrraanncciiss')).to.eql(['f','r','a','n','c','i','s']);
  });
  });

describe('#map', () => {
  it('returns an empty object if first argument it not a valid input', () => {
    expect(_.map(false)).to.eql([]);
    expect(_.map(135465)).to.eql([]);
  })

  it('returns a modified array', () => {
    let list = [1,2,3];
    let func = ((num) => {return num * 3; });
    let expected = [3,6,9];
    expect(_.map(list, func)).to.eql(expected);
  });

  it('returns a modified object', () => {
    let obj = {one: 1, two: 2, three: 3} 
    let func = ((num) => { return num * 3; })
    let expected = [3,6,9]
    expect(_.map(obj, func)).to.eql(expected);
  })
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
  it('Checks if function works on numeric array', () => {
    var input = [1, 2, 3];
    var actual = _.reduce(input, (memo, num) => { return memo + num; }, 0);
    var expected = 6;
    expect(actual).to.equal(expected);
  });

  it('Checks if function works on numeric array with non-zero memo', () => {
    let input = [1, 2, 3];
    let actual = _.reduce(input, (memo, num) => { return memo + num; }, -3);
    let expected = 3;
    expect(actual).to.equal(expected);
  });

  it('Checks if function works on numeric array with another iteratee', () => {
    let input = [1, 2, 3];
    let actual = _.reduce(input, (memo, num) => { return memo * num * num; }, 1);
    let expected = 36;
    expect(actual).to.equal(expected);
  });

  it('returns a single numerical value for an object', () => { 
    let input = {a: 5, b: 10, c: 15};
    let actual = _.reduce(input, (memo, num) => { return memo + num
    let expected = 30
    expect(_.reduce(actual).to.equal(expected));
  })

  it('returns a single character value for an object', () => { 
    let input = { 1: 'f', 2: 'r', 3: 'a', 4:'n'};
    let actual = _.reduce(input, (memo, num) => { return memo + num
    let expected = 'fran'
    expect(_.reduce(actual).to.equal(expected));
  });
});

describe('#every', () => {
  it('returns true if not given a valid list', () => {
    expect(_.every()).to.equal(true);
    expect(_.every(2)).to.equal(true);
    expect(_.every('francis')).to.equal(true);
    expect(_.every(['francis'])).to.equal(true);
    expect(_.every({0:'francis'})).to.equal(true);
  });

  it('returns true if all items in array passes the predicate', () => {
    let list = [ 2, 4, 6, 8 ];
    let predicate = (item) => item % 2 === 0;
    let expected = true
    expect(_.every(list, predicate)).to.equal(expected);
  });

  it('returns false if one item in array passes the predicate', () => {
    let list = [ 1,2, 4, 6, 8 ];
    let predicate = (item) => item % 2 === 0;
    let expected = false
    expect(_.every(list, predicate)).to.equal(expected);
  });

  it('returns true if all characters in a string passes the predicate', () => {
    let list = 'francis';
    let predicate = ((character) => character === character.toLowerCase());
    let expected = true
    expect(_.every(list, predicate)).to.equal(expected);
  });

  it('returns false if one characters in a string fails the predicate', () => {
    let list = 'FrAnCis';
    let predicate = ((character) => character === character.toLowerCase());
    let expected = false
    expect(_.every(list, predicate)).to.equal(false);
  });

  it('returns true if every item in an object passes the predicate', () => {
    let list = { 1: 2, 2: 4, 3: 6, 4: 8 };
    let predicate = (item) => item % 2 === 0;
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

describe('#some', () => {
  it('returns true if an item in array passes the predicate', () => {
    let list = [ 1, 2, 5, 7, 9];
    let predicate = (item) => item % 2 === 0;
    let expected = true
    expect(_.some(list, predicate)).to.equal(expected);
  });

  it('returns false if all items in array passes the predicate', () => {
    let list = [1,3, 5, 7 ];
    let predicate = (item) => item % 2 === 0;
    let expected = false
    expect(_.some(list, predicate)).to.equal(expected);
  });

  it('returns true if any characters in a string passes the predicate', () => {
    let list = 'FRANCIs';
    let predicate = ((character) => character === character.toLowerCase());
    let expected = true
    expect(_.some(list, predicate)).to.equal(expected);
  });

  it('returns false if no characters in a string fails the predicate', () => {
    let list = 'FRANCIS';
    let predicate = ((character) => character === character.toLowerCase());
    let expected = false
    expect(_.every(list, predicate)).to.equal(false);
  });

  it('returns true if an item in an object passes the predicate', () => {
    let list = { a: 1, b: 3, c: 6, d: 7};
    let predicate = (item) => item % 2 === 0;
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

describe('#extend', () => {
  it('returns an object when passed additional object arguement', () => {
    let inputObj = {};
    let additionalObj = { a: 1, b: 2, c: 3};
    let expected = { a: 1, b: 2, c: 3 };
    expect(_.extend(inputObj, additionalObj)).to.eql(expected); 
  })

  it('returns one object when pass an extra object', () => {
    let inputObj = {firsName:'francis'}
    let additionalObj = {surname: 'broughton', age: 28}
    let expected = {firsName:'francis', surname: 'broughton', age: 28}
    expect(_.extend(inputObj, additionalObj)).to.eql(expected);
  })

  it('returns one object with no duplicates when passed another object', () => {
    let inputObj = {a:'F', b:'R', c:'A'};
    let additionalObj = {c:'N', d:'C', e:'I', f:'S'};
    let expected = {a:'F', b:'R', c:'N', d:'C', e:'I', f:'S'};
    expect(_.extend(inputObj, additionalObj)).to.eql(expected);
  })

  it('doesnt add a non object to the destination', () => {
    expect(_.extend({name: 'Francis'},{surname: 'broughton'}, 23)).to.eql({name: 'Francis',surname: 'broughton'});
    expect(_.extend({name: 'Francis'},{surname: 'broughton'}, 'how old??')).to.eql({name: 'Francis',surname: 'broughton'}); 
    expect(_.extend({name: 'Francis'},{surname: 'broughton'}, [11])).to.eql({name: 'Francis',surname: 'broughton'}); 
  });
});

describe('#default', () => {
  it('returns an object when passed additional object arguement', () => {
    let inputObj = {};
    let additionalObj = { a: 1, b: 2, c: 3};
    let expected = { a: 1, b: 2, c: 3 };
    expect(_.default(inputObj, additionalObj)).to.eql(expected); 
  });

  it('returns one object when pass an extra object', () => {
    let inputObj = {firsName:'francis'}
    let additionalObj = {surname: 'broughton', age: 28}
    let expected = {firsName:'francis', surname: 'broughton', age: 28}
    expect(_.default(inputObj, additionalObj)).to.eql(expected);
  })

  it('returns one object with no duplicates when passed another object', () => {
    let inputObj = {a:'F', b:'R', c:'A'};
    let additionalObj = {c:'N', d:'C', e:'I', f:'S'};
    let expected = {a:'F', b:'R', c:'A', d:'C', e:'I', f:'S'};
    expect(_.default(inputObj, additionalObj)).to.eql(expected)
  })

  it('returns an object with an undefined properties filled in with the first value in the following default objects', () => {
    let iceCream = {flavor: 'chocolate'};
    expect(_.default(iceCream, {flavor: 'vanilla', sprinkles: 'lots'})).to.eql({flavor: 'chocolate', sprinkles: 'lots'});
  });

  it('doesnt add a non object to the destination', () => {
    expect(_.extend({name: 'Francis'},{surname: 'broughton'}, 23)).to.eql({name: 'Francis',surname: 'broughton'});
    expect(_.extend({name: 'Francis'},{surname: 'broughton'}, 'how old??')).to.eql({name: 'Francis',surname: 'broughton'}); 
    expect(_.extend({name: 'Francis'},{surname: 'broughton'}, [11])).to.eql({name: 'Francis',surname: 'broughton'}); 
  });
});

describe('#once', () => {
  it('is a function', () => {
    expect(_.once).to.be.a('function');
  });

  it('only calls the function once', () => {
    let spy = sinon.spy();
    var hi = _.once(spy);
    hi;
    hi;
    expect(spy.callCount).to.equal(1);
  });
});

describe('#negate', () => {
  it('is a function', () => {
    expect(_.negate).to.be.a('function');
  });

  it('swaps true to false and false to true',() => {
    function truthy(){
      return true;
    }
    expect(_.negate(truthy)).to.equal(false); // truthy is fn
    function falsey(){
      return false;
    }
    expect(_.negate(falsey)).to.equal(true);  // falsey is fn
  });

  it('returns a undefined', () => {
    expect(_.negate(2)).to.equal(undefined); // 2 is fn
  })
});

describe('#shuffle', () => {
  it('should return an array the same length as the input array', () => {
    expect(_.shuffle([1,2,3]).length).to.equal(3);
  });

  it('should return an array the same length as the input object', () => {
    expect(_.shuffle({a: 1, b: 2}).length).to.equal(2);
  }); 

  it('is returning the same type when only one type is passed', () => {
    expect(typeof _.shuffle(['ab','cd','ef'])[0]).to.equal('string');
  });

  it('it returns an empty array when not given a valid list', () => {
    expect(_.shuffle()).to.eql([]);
    expect(_.shuffle([])).to.eql([]);
    expect(_.shuffle({})).to.eql([]);
    expect(_.shuffle(1234)).to.eql([]);
  });

  it('returns a shuffled copy of the original list', () => {
    expect(_.shuffle('francis')).to.not.eql('francis');
    expect(_.shuffle({0:1, 1:2, 2:3})).to.not.eql({0:1, 1:2, 2:3});
  });
});
  

describe('#shuffle', () => {
  it('it returns an empty array if not given a valid list', () => {
    expect(_.invoke()).to.eql([]);
    expect(_.invoke([])).to.eql([]);
    expect(_.invoke({})).to.eql([]);
    expect(_.invoke(222)).to.eql([]);
  })

  it('it calls the method on objects, arrays and strings', () => {
    expect(_.invoke([[2, 8, 6, 4], [3, 2, 1]], 'sort')).to.eql([[2, 4, 6, 8], [1, 2, 3]]);
    expect(_.invoke({a: [2, 8, 6, 4], b: [3, 2, 1]}, 'sort')).to.eql([[2, 4, 6, 8], [1, 2, 3]]);
    expect(_.invoke(['abc'],'toUpperCase')).to.eql(['ABC']);
    expect(_.invoke(['FRANCIS'],'concat', ['BROUGHTON'])).to.eql(['FRANCISBROUGHTON']);
  })
})

describe('#zip', () => {
  it('should merge arrays together based on index position of equal length', () => {
    let actual = _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
    let expected = [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]];
    expect(actual).to.eql(expected);
  });

  it('returns an array with elements that are undefined when number and dimension of arrays do not match', () => {
    expect(_.zip([1,2,3], ['a', 'b'])).to.eql([[1,'a'], [2, 'b'], [3, undefined]]);
  });
});

describe('#flatten', () => {
  it('returns an empty array when not given a string or array', () => {
    expect(_.flatten(1)).to.eql([]);
    expect(_.flatten(false)).to.eql([]);
    expect(_.flatten(undefined)).to.eql([]);    
    expect(_.flatten()).to.eql([]);
    expect(_.flatten({a:[2,2,2]})).to.eql([]);
  });

  it('returns a flattened array', () => {
    expect(_.flatten([2, [4], [6, [[8]]]])).to.eql([2,4,6,8]);
  })

  it('returns a flattened array with objects, strings & arrays', () => {
    expect(_.flatten([{name: 'Francis'}, 'Broughton', ['became a developer', [{b: 2017}]]])).to.eql([{name: 'Francis'}, 'Broughton', 'became a developer', {b: 2017}]);
  })

  it('returns an array flattened to one level if given true for shallow argument', () => {
      expect(_.flatten([1, [2], [3, [[4]]]], true)).to.eql([1, 2, 3, [[4]]]);
      expect(_.flatten([1,2,3,[4,[5,[6]]]],true)).to.eql([1,2,3,4,[5,[6]]])
  });
});

describe('#intersection',() => {
  it('returns an array of intersection results', () => {
    expect(_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1])).to.eqls([1,2]);
    expect(_.intersection([[1], 2, 3], [101, 2, 1, 10], [2, 1])).to.eqls([2]);
  })
  
  it('returns an array of intersection results for characters', () => {
    expect(_.intersection('a', 'ab', 'abc')).to.eql(['a'])
    expect(_.intersection('fran', 'franke', 'franny', 'francis')).to.eqls(['f','r','a','n']);
  })

  it('returns an array of interected results for when there are objects/array', () => {
  expect(_.intersection(['fran', 'b', {a:22222}], ['b',2989,4,'fran'], ['fran',2,9, 'b'])).to.eql(['fran', 'b']); 
  })

  it('return [] for invalid input', function () {
    expect(_.intersection(234)).to.eqls([]);
    expect(_.intersection({})).to.eqls([]);
    expect(_.intersection([])).to.eqls([]);
    expect(_.intersection(null)).to.eqls([]);
  });
});

describe('#difference', () => {
  it('will return the difference between two arrays', () => {
    expect(_.difference([1, 2, 3], [2, 15, 20])).to.eql([1, 3, 15, 20]);
  });

  it('should return the difference between arrays containing strings', () => {
    expect(_.difference(['francis', 'Damian', 'Broughton'], ['francis', 'Damian', 'Oakley'])).to.eql(['Broughton', 'Oakley']);
  });

  it('should return the difference between arrays containing different data types', () => {
    let difference = _.difference(['Francis', 'Damian', '2/2/1989'], ['Damian', '2/2/1989', 2, 2, 1989]);
    expect(difference).to.eql(['Francis', 2,2,1989]);
  });
});


describe('#memoize', () => {
  it('returns a function', () => {
      expect(_.memoize()).to.be.a('function');
  });

  it('returns a function that behaves the same way as the function passed', () => {
    const name = () => 'francis';
    const memName = _.memoize(name);
    expect(memName()).to.equal('francis');
  });

  it('it will only run the function once if ', () => {
    const spy = sinon.spy();
    var memoizedSpy = _.memoize(spy);
    memoizedSpy();
    memoizedSpy();
    expect(spy.callCount).to.equal(1);
  });

  it('calls the function multiple times if passed different arguments', () => {
    let counter = 0;
    const updateCounter = (num) => counter += num;
    const memoizeUpdateCounter = _.memoize(updateCounter);
    memoizeUpdateCounter(1);
    memoizeUpdateCounter(2);
    memoizeUpdateCounter(3);
    expect(counter).to.equal(6);
  });
})

describe('#delay', () => {
  it('exists', () => {      
    expect(_.delay).to.be.a('function');
  });
  
  it('executes the function after the set delay', () => {
    const spy = sinon.spy();
    _.delay(spy, 1000);
    expect(spy.called).to.equal(false);
    setTimeout(() => {
      expect(spy.called).to.equal(true);
      }, 1001);
  });

  it('passes the optional arguments to the function if provided', () => {
    const spy = sinon.spy();
    _.delay(spy, 1000, 'Francis', 'Broughton');
    setTimeout(() => {
    expect(spy.calledWith('Francis', 'Broughton')).to.equal(true);
    }, 1001);
  });
});

describe('#where', () => {
  it('returns empty array if invalid argument is passed', () => {
    expect(_.where(5)).to.eql([]);
    expect(_.where([])).to.eql([]);
    expect(_.where({})).to.eql([]);
  });
    
  it('returns an array when given a string', () => {
    expect(_.where('f')).to.eql(['f']);
    expect(_.where('fran')).to.eql(['f','r','a','n']);
  });

  it('returns an array from the string containing the properties passed', () => {
    expect(_.where('abc', {0: 'a'})).to.eql(['a']);
    expect(_.where('abc', {0: 'b'})).to.eql(['b']);
    expect(_.where('abc', {0: 'c'})).to.eql(['c']);
  });

  it('returns array of objects which have the properties passed as second argument', () => {
    let input = [
      {a:2, b:3, c:4}, 
      {a:'francis', b:'broughton'}, 
      {a:2, b:3, d:4}, 
      {c:2, d:8},
      {a: 'francis', b: 'broughton'}
    ];
    let expectedOne = [
      {a:2, b:3, c:4},
      {a:2, b:3, d:4}
    ];
    expect(_.where(input, {a:2, b:3})).to.eql(expectedOne);
  });
   
  it('returns an array from the array containing the properties passed', () => {
    const list = [
      {
        name: 'Claude',
        age: 3,
        gender: 'male',
        animal: 'rabbit'
      },
      {
        name: 'Marcelle',
        age: 3,
        gender: 'male',
        animal: 'rabbit'
      },
      {
        name: 'Tallulah',
        age: 1,
        gender: 'female',
        animal: 'cat'
      },
      {
        name: 'Finn',
        age: 1,
        gender: 'male',
        animal: 'cat'
      }
    ];
    expect(_.where(list, {gender: 'female'})).to.eql([
      {
        name: 'Tallulah',
        age: 1,
        gender: 'female',
        animal: 'cat'
      }
    ]);
    expect(_.where(list, {age: 3})).to.eql([{
        name: 'Claude',
        age: 3,
        gender: 'male',
        animal: 'rabbit'
      },
      {
        name: 'Marcelle',
        age: 3,
        gender: 'male',
        animal: 'rabbit'
      }]);
  });
  
  it('returns empty array if invalid argument is passed', () => {
    expect(_.where(5)).to.eql([]);
    expect(_.where([])).to.eql([]);
    expect(_.where({})).to.eql([]);
  });
});

  
       
      
      
})
})
})



