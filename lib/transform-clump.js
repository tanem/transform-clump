var stream = require('stream');

module.exports = function(size){
  return new TransformClump(size);
};

function TransformClump(size) {
  stream.Transform.call(this, { objectMode: true });
  this._buffer = [];
  this._size = size;
  this._ind = 0;
}

TransformClump.prototype = Object.create(stream.Transform.prototype);

TransformClump.prototype._transform = function(chunk, encoding, done){
  this._buffer.splice(this._ind, 1, chunk);
  this._ind = this._ind < this._size - 1 ? this._ind + 1 : 0;
  this.push(this._buffer);
  done();
};
