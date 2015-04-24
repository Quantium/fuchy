# Fuchy

This is a wrapper of [Cacheman](https://github.com/cayasso/cacheman) that implements fuzzy logic to flush data.

## Usage

Create a new instance with default TTL (*Time To Live*) and defining the engine:

```js
var fuchy = new Fuchy('app', {
  ttl: 3600,
  engine: 'redis'
});
```

You can filter the keys that you don't want store in cache:

```js
var fuchy = new Fuchy('app', {
  ttl: 3600,
  engine: 'redis',
  noCacheKeys: ['creditCard']
});

fuchy.set('creditCard', '123456789101112', function (err, value) {
  // Avoiding to cache a credit card
});
```

Take a look to Cacheman [readme](https://github.com/cayasso/cacheman) to read about all methods.


## License

The MIT License (MIT)

Copyright (c) 2015 Marco Godínez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
