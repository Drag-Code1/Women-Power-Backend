const { CartItem } = require('./src/models');
(async () => {
  try {
    const items = await CartItem.findAll();
    console.log('Cart Items:', JSON.stringify(items, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
