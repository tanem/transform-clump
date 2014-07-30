var expect = require('expect.js');
var stream = require('stream');
var transformClump = require('../lib/transform-clump');

describe('Transform clump', function(){

  var clump;

  beforeEach(function(){
    clump = transformClump(5);
  });

  it('should push an array of data', function(done){
    var source = stream.PassThrough({ objectMode: true });
    source.pipe(clump);
    clump.on('data', function(chunk){
      expect(chunk).to.eql([{ foo: 'bar' }]);
      done();
    });
    source.end({ foo: 'bar' });
  });

  it('should push an array of data with new items replacing the oldest items if the specified size is exceeded', function(done){
    var source = stream.PassThrough({ objectMode: true });
    source.pipe(clump);
    var res;
    clump.on('data', function(chunk){
      res = chunk;
    });
    clump.on('end', function(){
      expect(res).to.eql([
        { foo: 5 },
        { foo: 1 },
        { foo: 2 },
        { foo: 3 },
        { foo: 4 }
      ]);
      done();
    });
    for (var i = 0, j = 5; i < j; i++) source.push({ foo: i });
    source.end({ foo: i });
  });

});
