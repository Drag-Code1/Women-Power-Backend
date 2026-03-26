const { Cart } = require('./src/models');
(async () => {
  try {
    const carts = await Cart.findAll();
    console.log('Carts:', JSON.stringify(carts, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
