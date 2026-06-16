const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', routes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler (harus di paling akhir)
app.use(errorHandler);

// Sync database dan start server
sequelize
  .sync({ alter: process.env.NODE_ENV === 'development' })
  .then(() => {
    sequelize
      .authenticate()
      .then(() => {
        console.log('✓ Database connected successfully');
        app.listen(PORT, () => {
          console.log(`✓ Server running on http://localhost:${PORT}`);
          console.log(`✓ API Health Check: http://localhost:${PORT}/api/health`);
        });
      })
      .catch((err) => {
        console.error('✗ Unable to authenticate with database:', err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error('✗ Unable to sync database:', err);
    process.exit(1);
  });
