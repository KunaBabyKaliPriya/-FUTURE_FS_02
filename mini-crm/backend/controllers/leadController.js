const Lead = require('../models/Lead');

// GET /api/leads?search=&status=&page=1&limit=10
exports.getLeads = async (req, res) => {
  const { search = '', status = '', page = 1, limit = 10 } = req.query;
  const query = {};
  if (status) query.status = status;
  if (search) {
    const rx = new RegExp(search, 'i');
    query.$or = [{ name: rx }, { email: rx }, { company: rx }];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Lead.countDocuments(query),
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

// GET /api/leads/stats
exports.getStats = async (_req, res) => {
  const [total, newLeads, contacted, converted] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'New' }),
    Lead.countDocuments({ status: 'Contacted' }),
    Lead.countDocuments({ status: 'Converted' }),
  ]);
  const recent = await Lead.find().sort({ createdAt: -1 }).limit(5);
  res.json({ total, new: newLeads, contacted, converted, recent });
};

// GET /api/leads/:id
exports.getLead = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};

// POST /api/leads
exports.createLead = async (req, res) => {
  const lead = await Lead.create({ ...req.body, owner: req.user?._id });
  res.status(201).json(lead);
};

// PUT /api/leads/:id
exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};

// DELETE /api/leads/:id
exports.deleteLead = async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json({ message: 'Lead removed' });
};
