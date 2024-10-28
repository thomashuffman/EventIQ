import React, { useState, useEffect } from "react";
import axios from "axios";

export const Body = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [showGroups, setShowGroups] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/groups`
        );
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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/groups`,
        {
          groupId: Date.now().toString(),
          groupName: newGroupName,
        }
      );
      alert("Group added successfully!");
      setGroups((prevGroups) => [
        ...prevGroups,
        { groupId: Date.now().toString(), groupName: newGroupName },
      ]);
      setNewGroupName("");
    } catch (error) {
      console.error("There was an error adding the group!", error);
      alert("Failed to add group. Please try again.");
    }
  };

  return (
    <main className="app-main flex-grow bg-black text-white flex flex-col items-center justify-center p-5">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Join a Group, Stay Updated!
      </h2>
      <p className="mb-4 text-center">
        Sign up for groups, and get notifications about upcoming events.
      </p>

      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-md bg-gray-800 text-white text-center"
        placeholder="Enter group name"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
      />

      <button
        className="bg-yellow-300 text-black rounded-md px-4 py-2 mb-4 hover:bg-blue-600"
        onClick={handleCreateGroup}
      >
        Create Group
      </button>

      <button
        className="bg-gray-700 rounded-md px-4 py-2 hover:bg-gray-600"
        onClick={() => setShowGroups(!showGroups)}
      >
        {showGroups ? "Hide Groups" : "Show Groups"}
      </button>

      {showGroups && (
        <div className="groups-list mt-4">
          <h3 className="text-xl font-semibold">Existing Groups</h3>
          <ul className="list-disc pl-5 text-center">
            {groups.map((group) => (
              <li key={group.groupId} className="text-gray-300">
                {group.groupName} (ID: {group.groupId})
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};
