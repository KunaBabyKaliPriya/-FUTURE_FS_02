// Entry point: boots Express, connects MongoDB, mounts routes & middleware.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// --- Global middleware ---
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// --- Health check ---
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'mini-crm-api' }));

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// --- Error handlers (must be last) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
});
