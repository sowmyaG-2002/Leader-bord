

// import React, { useEffect, useState, useRef } from 'react';

// const Leaderboard = ({ users }) => {
//   const [newTopThree, setNewTopThree] = useState([]);
//   const [showAll, setShowAll] = useState(false);
//   const prevTopThreeRef = useRef([]);

//   useEffect(() => {
//     const currentTopThreeIds = users.slice(0, 3).map((u) => u._id);
//     const prevTopThreeIds = prevTopThreeRef.current;

//     const newlyJoined = currentTopThreeIds.filter(id => !prevTopThreeIds.includes(id));
//     setNewTopThree(newlyJoined);

//     prevTopThreeRef.current = currentTopThreeIds;
//   }, [users]);

//   const topThree = users.slice(0, 3);
//   const restUsers = users.slice(3);
//   const visibleUsers = showAll ? restUsers : restUsers.slice(0, 1); // Only show 1 after top 3

//   const medalEmoji = ['🥇', '🥈', '🥉'];
//   const bgColors = ['bg-yellow-100', 'bg-gray-100', 'bg-orange-100'];

//   return (
//     <div className="my-6 bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
//       <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-600">
//         🏆 Weekly Top Performers
//       </h2>

//       {/* Top 3 Podium */}
//       <div className="flex justify-center gap-6 mb-6">
//         {topThree.map((user, index) => (
//           <div
//             key={user._id}
//             className={`flex flex-col items-center px-4 py-3 rounded-xl shadow-md w-28 transform transition-transform duration-300 hover:scale-105 ${bgColors[index]}`}
//           >
//             <span className="text-lg font-semibold text-gray-800 text-center">
//               {user.name}
//               {newTopThree.includes(user._id) && (
//                 <span className="ml-1 animate-pulse text-red-500">🔥</span>
//               )}
//             </span>
//             <span className="text-sm text-gray-600">{user.totalPoints} pts</span>
//             <span className="text-2xl mt-1">{medalEmoji[index]}</span>
//           </div>
//         ))}
//       </div>

//       {/* Other Users */}
//       <ul className="divide-y divide-gray-200">
//         {visibleUsers.map((user, index) => (
//           <li
//             key={user._id}
//             className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 transition-all duration-200"
//           >
//             <span className="text-gray-700 font-medium">
//               {index + 4}. {user.name}
//             </span>
//             <span className="text-sm text-blue-600 font-semibold">{user.totalPoints} pts</span>
//           </li>
//         ))}
//       </ul>

//       {/* Toggle Button */}
//       {restUsers.length > 1 && (
//         <div className="mt-4 text-center">
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="text-indigo-600 hover:underline font-medium"
//           >
//             {showAll ? '⬆️ Show Less' : '⬇️ Show More'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leaderboard;



import React, { useEffect, useState, useRef } from 'react';

const Leaderboard = ({ users }) => {
  const [newTopThree, setNewTopThree] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const prevTopThreeRef = useRef([]);

  useEffect(() => {
    const currentTopThreeIds = users.slice(0, 3).map((u) => u._id);
    const prevTopThreeIds = prevTopThreeRef.current;

    const newlyJoined = currentTopThreeIds.filter(id => !prevTopThreeIds.includes(id));
    setNewTopThree(newlyJoined);

    prevTopThreeRef.current = currentTopThreeIds;
  }, [users]);

  const topThree = users.slice(0, 3);
  const restUsers = users.slice(3);
  const initiallyVisible = restUsers.slice(0, 4); // 4th to 7th
  const hiddenUsers = restUsers.slice(4);         // 8th onward

  const medalEmoji = ['🥇', '🥈', '🥉'];
  const bgColors = ['bg-yellow-100', 'bg-gray-100', 'bg-orange-100'];

  return (
    <div className="my-6 bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-600">
        🏆 Weekly Top Performers
      </h2>

      {/* Top 3 Podium */}
      <div className="flex justify-center gap-6 mb-6">
        {topThree.map((user, index) => (
          <div
            key={user._id}
            className={`flex flex-col items-center px-4 py-3 rounded-xl shadow-md w-28 transform transition-transform duration-300 hover:scale-105 ${bgColors[index]}`}
          >
            <span className="text-lg font-semibold text-gray-800 text-center">
              {user.name}
              {newTopThree.includes(user._id) && (
                <span className="ml-1 animate-pulse text-red-500">🔥</span>
              )}
            </span>
            <span className="text-sm text-gray-600">{user.totalPoints} pts</span>
            <span className="text-2xl mt-1">{medalEmoji[index]}</span>
          </div>
        ))}
      </div>

      {/* Users 4 to 7 */}
      <ul className="divide-y divide-gray-200">
        {initiallyVisible.map((user, index) => (
          <li
            key={user._id}
            className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 transition-all duration-200"
          >
            <span className="text-gray-700 font-medium">
              {index + 4}. {user.name}
            </span>
            <span className="text-sm text-blue-600 font-semibold">{user.totalPoints} pts</span>
          </li>
        ))}

        {/* Hidden Users */}
        {showAll &&
          hiddenUsers.map((user, index) => (
            <li
              key={user._id}
              className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 transition-all duration-200"
            >
              <span className="text-gray-700 font-medium">
                {index + 8}. {user.name}
              </span>
              <span className="text-sm text-blue-600 font-semibold">{user.totalPoints} pts</span>
            </li>
          ))}
      </ul>

      {/* Toggle Button */}
      {hiddenUsers.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-indigo-600 hover:underline font-medium"
          >
            {showAll ? '⬆️ Show Less' : '⬇️ Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
