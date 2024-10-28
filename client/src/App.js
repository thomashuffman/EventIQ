import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [showGroups, setShowGroups] = useState(false); // State to toggle visibility

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups`);
        setGroups(response.data);
      } catch (error) {
        console.error("There was an error fetching the groups!", error);
      }
    };
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    if (!newGroupName) {
      alert("Please enter a group name!");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/groups`, {
        groupId: Date.now().toString(),
        groupName: newGroupName,
      });
      alert("Group added successfully!");
      setGroups(prevGroups => [...prevGroups, { groupId: Date.now().toString(), groupName: newGroupName }]);
      setNewGroupName('');
    } catch (error) {
      console.error("There was an error adding the group!", error);
      alert("Failed to add group. Please try again.");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to EventIQ</h1>
        <p>Stay in the loop with all your group events!</p>
      </header>
      <main className="app-main">
        <h2>Join a Group, Stay Updated!</h2>
        <p>Sign up for groups, and get notifications about upcoming events.</p>

        <input 
          type="text" 
          className="styled-input" 
          placeholder="Enter group name" 
          value={newGroupName} 
          onChange={(e) => setNewGroupName(e.target.value)} 
        />

        <button className="cta-button" onClick={handleCreateGroup}>Create Group</button>

        <button className="toggle-button" onClick={() => setShowGroups(!showGroups)}>
          {showGroups ? "Hide Groups" : "Show Groups"}
        </button>

        {showGroups && (
          <div className="groups-list">
            <h3>Existing Groups</h3>
            <ul>
              {groups.map((group) => (
                <li key={group.groupId}>
                  {group.groupName} (ID: {group.groupId})
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 EventIQ. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
