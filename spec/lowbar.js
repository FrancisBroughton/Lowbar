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
  
});

  });
});