
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import UserForm from './components/UserForm';
// import Leaderboard from './components/Leaderboard';
// import ClaimPoints from './components/ClaimPoints';
// import History from './components/History';

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/users');
//       setUsers(res.data);
//     } catch (err) {
//       console.error('❌ Failed to fetch users:', err);
//     }
//   };

//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/history/all');
//       setHistory(res.data);
//     } catch (err) {
//       console.error('❌ Failed to fetch history:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchHistory();
//   }, []);

//   const handleClaimSuccess = () => {
//     fetchUsers();
//     fetchHistory();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 font-sans">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">🏆 Leaderboard System</h1>

//         <div className="space-y-6">
//           <UserForm onUserAdded={fetchUsers} />
//           <ClaimPoints
//             users={users}
//             selectedUser={selectedUser}
//             onUserSelect={setSelectedUser}
//             onClaimSuccess={handleClaimSuccess}
//           />
//           <Leaderboard users={users} />
//           <History history={history} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;










import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import Leaderboard from './components/Leaderboard';
import ClaimPoints from './components/ClaimPoints';
import History from './components/History';

const App = () => {
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const leaderboardRef = useRef(null); // For auto-scroll

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      const sortedUsers = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sortedUsers);
    } catch (err) {
      console.error('❌ Failed to fetch users:', err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/history/all');
      setHistory(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch history:', err);
    }
  };

  const handleClaimSuccess = () => {
    fetchUsers();
    fetchHistory();
    if (leaderboardRef.current) {
      leaderboardRef.current.scrollIntoView({ behavior: 'smooth' }); // ⏬ Auto-scroll to leaderboard
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchHistory();
    const interval = setInterval(() => {
      fetchUsers();
      fetchHistory();
    }, 10000); // 🔁 Auto-refresh every 10s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">🏆 Leaderboard System</h1>

        <div className="space-y-6">
          <UserForm onUserAdded={fetchUsers} />
          <ClaimPoints
            users={users}
            selectedUser={selectedUser}
            onUserSelect={setSelectedUser}
            onClaimSuccess={handleClaimSuccess}
          />
          <div ref={leaderboardRef}>
            <Leaderboard users={users} />
          </div>
          <History history={history} />
        </div>
      </div>
    </div>
  );
};

export default App;
