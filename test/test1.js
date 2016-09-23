var assert = require('chai').assert
var should = require('chai').should()
var Encoder = new require("../")
describe('code-39-encoder', function() {
  it('should encode Strings', function () {
    var encoder = new Encoder()
    var res = encoder.encode("TEST")
    assert.equal(res,"*TEST*")
  })
  it('turn lower case characters to uppercase', function () {
    var encoder = new Encoder()
    var res = encoder.encode("Test")
    assert.equal(res,"*TEST*")
  })
  it('ignore all other unsupported characters', function () {
    var encoder = new Encoder()
    var res = encoder.encode("Te?sÄt123Ö")
    assert.equal(res,"*TEST123*")
  })
  it('support ouput = "bars"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("1",{output:"bars"})
    assert.equal(res,"100010111011101011101000101011101000101110111010")
  })
  it('support ouput = "weights"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("1",{output:"weights"})
    assert.equal(res,"131131311131131111311311313111")
  })
  it('support ouput = "codes"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("1",{output:"codes"})
    assert.equal(res[0],43)
    assert.equal(res[1],1)
    assert.equal(res[2],43)
  })
  it('support ouput = "array"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("1",{output:"array"})
    assert.equal(res[0],42)
    assert.equal(res[1],49)
    assert.equal(res[2],42)
  })
  it('support ouput = "all"', function () {
    var encoder = new Encoder()
    var res = encoder.encode("1",{output:"all"})
    assert.equal(res[0].bars,"1000101110111010")
    assert.equal(res[1].weights,"3113111131")
    assert.equal(res[2].symbol,"*")
  })
});
