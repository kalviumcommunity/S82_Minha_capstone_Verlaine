const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const routineRoutes = require('./routes/routineRoutes');
const journalRoutes = require('./routes/journalRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const otpRoutes = require('./routes/otpRoutes');
const productIngredientRoutes = require('./routes/productIngredientRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Add this

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Static upload dir
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/routine', routineRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', productIngredientRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/dashboard', dashboardRoutes); // Add this

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Welcome to Verlaine Backend!');
});
app.get('/api/ping', (req, res) => {
  res.json('Pong from Verlaine backend 🧖‍♀️✨');
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;