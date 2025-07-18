// const express = require('express');
// const router = express.Router();
// const { getUsers, addUser } = require('../controllers/userController');

// router.get('/', getUsers);
// router.post('/', addUser);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getUsers, addUser } = require('../controllers/userController');
const User = require('../models/User');

// GET all users
router.get('/', getUsers);

// POST a new user
router.post('/', addUser);

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during delete' });
  }
});

module.exports = router;
