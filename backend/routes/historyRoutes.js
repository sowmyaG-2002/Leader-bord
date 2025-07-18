const express = require('express');
const router = express.Router();
const History = require('../models/History');

router.get('/all', async (req, res) => {
  try {
    const history = await History.find()
      .sort({ timestamp: -1 })
      .populate('userId', 'name');

    const formatted = history.map(entry => ({
      userName: entry.userId?.name || 'Unknown User',  // ✅ safely access userId
      pointsClaimed: entry.pointsClaimed,
      timestamp: entry.timestamp,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('❌ History fetch error:', err);  // ✅ Add this for backend logs
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;