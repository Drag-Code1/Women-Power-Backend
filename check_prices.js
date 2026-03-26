const { Product } = require('./src/models');
(async () => {
  try {
    const products = await Product.findAll({ attributes: ['id', 'p_Name', 'price'] });
    console.log('Products:', JSON.stringify(products, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
