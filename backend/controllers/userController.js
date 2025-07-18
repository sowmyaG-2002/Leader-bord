const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get users', error: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = new User({ name, totalPoints: 0 });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add user', error: err.message });
  }
};