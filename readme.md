# Cache Object Handler

## Usage

```js
var CacheHandler = require('cache-object-handler');

var cacheHandler = new CacheHandler({
  cacheables: {
    product: true,
    categories: true,
    user: {
      email: true,
      creditCard: false
    }
  },
  engine: new CacheHandler.RedisStore(),
  ttl: 3600
});

// Verify if property is cacheable
// Usage: cacheHandler.verify(property);
cacheHandler.verify('product')
  .then(function (cacheable) {
    if (cacheable) {
      // Do something
    }
  });

// Set property to cache (previously verify if is cacheable)
// Usage: cacheHandler.set(property, key, value);
cacheHandler.set('user', 'user:1234567890', {
    email: 'johndoe@4yopping.com',
    creditCard: '5232448220306708'
  })
  .then(function (value, cached) {
    // e.g. Send to mongoose
    if (cached) {
      User.
    }
  });

// Get property from cache if the property is cacheable
// Usage: cacheHandler.get(property, key);
cacheHandler.get('user', 'user:1234567890')
  .then(function (value) {
    // do something with the value
  });
  

  
  
/**
 * Example
 */
 

```
