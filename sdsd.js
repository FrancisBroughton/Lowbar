var path = require('path');
var expect = require('chai').expect;
var sinon = require('sinon');
var _ = require(path.join(__dirname, '..', './hi.js'));

describe('#intersection', () => {
  it('is a function', () => {
    expect(_.intersection).to.be.a('function');
  });

  it('should return all items common to each array given',  () => {
    expect(_.intersection([1, 2, 3], [1, 2, 4], [1, 2])).to.eql([1, 2]);
    expect(_.intersection([1, 2, 3], [1, 2, 3, 4], [1, 2])).to.eql([1, 2]);
  });

  it('should return an empty array if there is no common value', () => {
    expect(_.intersection([1, 2, 3], [4, 5, 6], [7, 8, 9])).to.eql([]);
    expect(_.intersection(['a', 'b'], ['c', 'd', 'e'], ['f'])).to.eql([]);
  });

  it('should return an array of matching characters in a string', () => {
    expect(_.intersection('world')).to.eql(['w', 'o', 'r', 'l', 'd']);
    expect(_.intersection('hello', 'world')).to.eql(['l', 'o']);
  });

  it('will only return repeated values once in an array or string', () => {
    expect(_.intersection([1, 2, 1, 2])).to.eql([1, 2]);
    expect(_.intersection('hello')).to.eql(['h','e','l','o']);
  });

  it('returns an empty array if an array or string is not passed as an argument', () => {
    expect(_.intersection()).to.eql([]);
    expect(_.intersection(123)).to.eql([]);
    expect(_.intersection({ a: 1, b: 2 })).to.eql([]);
    expect(_.intersection(true)).to.eql([]);
    expect(_.intersection(123, 123)).to.eql([]);
    expect(_.intersection({ a: 1, b: 2 }, { a: 1 })).to.eql([]);
    expect(_.intersection(true, true)).to.eql([]);
  });
});