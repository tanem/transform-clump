# transform-clump

[![Build Status](https://travis-ci.org/tanem/transform-clump.png?branch=master)](https://travis-ci.org/tanem/transform-clump)
[![Coverage Status](https://coveralls.io/repos/tanem/transform-clump/badge.png)](https://coveralls.io/r/tanem/transform-clump)
[![NPM version](https://badge.fury.io/js/transform-clump.svg)](http://badge.fury.io/js/transform-clump)

A transform stream that clumps data into an array of a specified size. The oldest items in the array are replaced by the newer items as they stream in.

## Installation

```sh
$ npm install transform-clump --save
```

## Example

```js
var stream = require('stream');
var clump = require('transform-clump');
var source = stream.PassThrough({ objectMode: true });
var dest = stream.PassThrough({ objectMode: true });
var result;

source.pipe(clump(5)).pipe(dest);

dest.on('data', function(chunk){
  result = chunk;
});
dest.on('end', function(){
  // => [ { foo: 5 }, { foo: 1 }, { foo: 2 }, { foo: 3 }, { foo: 4 } ]
  console.log(result);
});

for (var i = 0, j = 5; i < j; i++) source.push({ foo: i });
source.end({ foo: i });
```

## API

### var clump = transformClump(size)

Initialise a new `TransformClump` with the given `size`.

## Testing

```sh
$ make test
```

To generate a coverage report:

```sh
$ make test-cov
```

## Credits

 * [urlgrey](https://github.com/cainus/urlgrey) for the Makefile inspiration.
