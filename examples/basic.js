var Fuchy = require('../index');

var fuchy = new Fuchy('test', {
  ttl: 10,
  engine: 'redis',
});

var testCache = function () {
  fuchy.get('mykey', function (err, value) {
    if (!value) {
      fuchy.set('mykey', { foo: 'bar' }, function (err, value) {
        console.log('Flushed:', value);
      });
    } else {
      console.log('Cached:', value);
    }
  });
};

setInterval(testCache, 125);
testCache();
