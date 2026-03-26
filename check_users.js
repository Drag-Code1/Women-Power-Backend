const { User } = require('./src/models');
(async () => {
  try {
    const users = await User.findAll({ attributes: ['id', 'email'] });
    console.log('Users:', JSON.stringify(users, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
