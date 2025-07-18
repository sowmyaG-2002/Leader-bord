const express = require('express');
const router = express.Router();
const { claimPoints } = require('../controllers/claimController');

router.post('/', claimPoints);

module.exports = router;