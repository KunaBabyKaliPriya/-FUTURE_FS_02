// Run with: npm run seed
// Creates a default admin user if none exists.
require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

(async () => {
  await connectDB();
  const email = 'admin@crm.com';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }
  await User.create({ name: 'Admin', email, password: 'admin123' });
  console.log('✅ Admin created → email: admin@crm.com  password: admin123');
  process.exit(0);
})();
