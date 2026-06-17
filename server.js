const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const sequelize = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
morgan.token('real-ip', (req) => req.headers['x-real-ip'] || req.ip);
const customFormat = ':real-ip :method :url :status :response-time ms';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(customFormat));
// app.use(morgan(MORGAN_FORMAT));
app.use(express.json());
app.use(cookieParser());

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', routes);



const viewRoutes = require('./routes/views');

// Daftarkan route untuk views
app.use('/', viewRoutes);

// Global error handler (harus di paling akhir)
app.use(errorHandler);
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});
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
