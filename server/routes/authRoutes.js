const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/User');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.put('/donor/availability/:id', async (req, res) => {
  try {
    const { availability } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { availability }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get('/receiver/search', async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    const donors = await User.find({
      role: 'donor',
      bloodGroup,
      'location.city': city,
      availability: true
    }).select('-password');
    res.json(donors);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
