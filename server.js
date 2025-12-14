require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize, User } = require('./src/models');
const apiRoutes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Limit body sizes to avoid memory spikes from large payloads
app.use(express.json({ limit: '200kb' }));
app.use(express.urlencoded({ extended: true, limit: '200kb' }));
app.use(cors());

// Default route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// API routes
app.use('/v1', apiRoutes);

// Error handler (keep last)
app.use(errorHandler);

(async () => {
  try {
    // Connect to DB
    await sequelize.authenticate();
    console.log('Database connected...');

    // Avoid schema sync in production to reduce startup work and memory
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log('All models synced.');
    }

    // ---- CREATE DEFAULT ADMIN (ONLY ONCE) ----
    const adminEmail = 'rushilodhe002@gmail.com';

    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      await User.create({
        firstName: 'rushi',
        lastName: 'lodhe',
        gender: 'male',
        email: adminEmail,
        mobileNo: '9699702627',
        role: 'admin',
      });
      console.log('Admin user created successfully!');
    } else {
      console.log('Admin user already exists, skipping creation.');
    }

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

