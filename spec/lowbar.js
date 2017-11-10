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
describe('#first', () => {
  it('returns the first element in an array', () => {
    var input = [3,7,2];
    expect(_.first(input)).to.equal(3)
  })
  it('returns n elements of an array', function () {
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
})
  });
});