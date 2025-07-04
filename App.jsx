import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on mount
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setError("Failed to load user data.");
        setLoading(false);
      });
  }, []);

  // Live search as user types
  useEffect(() => {
    const user = users.find(user => user.id === Number(searchId));
    setSelectedUser(user || null);
  }, [searchId, users]);

  return (
    <div className="container">
      <h1> User details [Search by ID]</h1>

      <div className="search-section">
        <input
          type="number"
          placeholder="Enter user ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="not-found">{error}</p>}

      {!loading && !error && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>City</th><th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr
                  key={user.id}
                  className={selectedUser?.id === user.id ? 'highlighted' : ''}
                >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedUser && (
            <div className="detail-box">
              <h2>🔍 Details for ID: {selectedUser.id}</h2>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>City:</strong> {selectedUser.address.city}</p>
              <p><strong>Company:</strong> {selectedUser.company.name}</p>
            </div>
          )}

          {searchId && !selectedUser && (
            <p className="not-found">❌ No user found with ID {searchId}</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
