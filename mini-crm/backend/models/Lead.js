const mongoose = require('mongoose');

// Lead schema — represents a client lead from website contact forms.
const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    source: { type: String, default: 'Website', trim: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Converted'],
      default: 'New',
      index: true,
    },
    notes: { type: String, default: '' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Compound text-ish indexes to speed up search
leadSchema.index({ name: 'text', email: 'text', company: 'text' });

module.exports = mongoose.model('Lead', leadSchema);
