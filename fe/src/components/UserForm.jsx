
// import React, { useState } from 'react';
// import axios from 'axios';

// const UserForm = ({ onUserAdded }) => {
//   const [name, setName] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) return;
//     try {
//       await axios.post('http://localhost:5000/api/users', { name });
//       setName('');
//       onUserAdded();
//     } catch (err) {
//       console.error('❌ Failed to add user:', err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter user name"
//         className="border px-3 py-1 rounded"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
//         ➕ Add User
//       </button>
//     </form>
//   );
// };

// export default UserForm;

import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/users', { name });
      setName('');
      onUserAdded();
    } catch (err) {
      console.error('❌ Failed to add user:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-md w-full max-w-md mx-auto"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
      >
        ➕ Add User
      </button>
    </form>
  );
};

export default UserForm;
