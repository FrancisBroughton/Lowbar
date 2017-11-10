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
  });
});