
// import React, { useState } from 'react';

// const History = ({ history }) => {
//   const [showAll, setShowAll] = useState(false);
//   const visibleHistory = showAll ? history : history.slice(0, 2);

//   return (
//     <div className="my-6">
//       <h2 className="text-xl font-bold mb-2">🕘 Claim History</h2>

//       {history.length === 0 ? (
//         <p>No claim history found.</p>
//       ) : (
//         <>
//           <ul className="list-disc pl-5 space-y-1">
//             {visibleHistory.map((entry, index) => (
//               <li key={index}>
//                 {entry.userName} claimed <strong>{entry.pointsClaimed}</strong> pts at{' '}
//                 {new Date(entry.timestamp).toLocaleTimeString()}
//               </li>
//             ))}
//           </ul>

//           {history.length > 2 && (
//             <button
//               className="mt-2 text-blue-600 hover:underline"
//               onClick={() => setShowAll(!showAll)}
//             >
//               {showAll ? '🔽 Hide History' : '🔼 Show Full History'}
//             </button>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default History;











import React, { useState } from 'react';

const History = ({ history }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleHistory = showAll ? history : history.slice(0, 2);

  return (
    <div className="my-6 bg-white p-4 rounded-2xl shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">🕘 Claim History</h2>

      {history.length === 0 ? (
        <p className="text-gray-500">No claim history found.</p>
      ) : (
        <>
          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            {visibleHistory.map((entry, index) => (
              <li key={index}>
                <span className="font-medium">{entry.userName}</span> claimed{' '}
                <span className="font-semibold text-green-600">{entry.pointsClaimed}</span> pts at{' '}
                <span className="text-sm text-gray-600">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>

          {history.length > 2 && (
            <button
              className="mt-3 text-sm text-blue-600 hover:underline focus:outline-none"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? '🔽 Hide History' : '🔼 Show Full History'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default History;
