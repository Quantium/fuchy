# Cache Object Handler

## Usage

```js
var CacheHandler = require('cache-object-handler');

var cacheHandler = new CacheHandler({
  cacheables: {
    product_list: false,
    product: {
      product_name: true,
      price: false
    },
    user: true
  },
  engine: new CacheHandler.RedisStore(),
  ttl: 3600
});

// Verify if property is cacheable
// Usage: cacheHandler.verify(property);
cacheHandler.verify('product_list')
  .then(function (cacheable) {
    // Do something 
  });

// Set property to cache (previously verify if is cacheable)
// Usage: cacheHandler.set(property, key, value);
cacheHandler.set('product', 'product:1234567890', {
    product_name: 'Flowers',
    price: '10.00'
  })
  .then(function (value, cacheables) {
    // Do something with the value
  });

// Get property from cache if the property is cacheable
// Usage: cacheHandler.get(property, key);
cacheHandler.get('product', 'product:1234567890')
  .then(function (value, cacheables) {
    // Do something with the value
    
    if (!value) {
      // e.g. get from mongoose
    }
  });
```
