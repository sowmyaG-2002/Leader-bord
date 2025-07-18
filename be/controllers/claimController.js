// const User = require('../models/User');
// const History = require('../models/History');

// exports.claimPoints = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const points = Math.floor(Math.random() * 10) + 1;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     user.totalPoints += points;
//     await user.save();

//     const history = new History({ userId, pointsClaimed: points });
//     await history.save();

//     res.json({ points, user });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error during claim' });
//   }
// };

const User = require('../models/User');
const History = require('../models/History');

exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.totalPoints += points;
    await user.save();

    const history = new History({ userId, pointsClaimed: points });
    await history.save();

    // ✅ Fixed response:
   res.status(200).json({ message: `${user.name} claimed ${points} points!`, points });
  } catch (error) {
    res.status(500).json({ error: 'Server error during claim' });
  }
};

