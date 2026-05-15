const router = require('express').Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const {
  getLeads,
  getStats,
  getLead,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');

// All lead routes require authentication
router.use(protect);

router.get('/', getLeads);
router.get('/stats', getStats);
router.get('/:id', getLead);

router.post(
  '/',
  [body('name').notEmpty(), body('email').isEmail()],
  validate,
  createLead
);

router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
