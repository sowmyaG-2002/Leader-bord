

import React, { useState } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';

const ClaimPoints = ({ users, onClaimSuccess }) => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleClaim = async () => {
    if (!selectedUserId) {
      setMessage('❌ Please select a user');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/claims`, {
        userId: selectedUserId,
      });

      const claimedPoints = res.data.points || 0;
      const user = users.find((u) => u._id === selectedUserId);

      setMessage(`✅ ${user.name} claimed ${claimedPoints} points!`);

      onClaimSuccess();

      const updatedUsers = await axios.get('http://localhost:5000/api/users');
      const sortedUsers = updatedUsers.data.sort((a, b) => b.totalPoints - a.totalPoints);
      const top3 = sortedUsers.slice(0, 3);

      if (top3.find((user) => user._id === selectedUserId)) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to claim points');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Select user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleClaim}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Claim
      </button>

      {message && (
        <p
          className={`text-center text-sm font-medium ${
            message.startsWith('✅') ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ClaimPoints;




