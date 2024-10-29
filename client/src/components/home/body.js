import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, addGroup } from "../../features/groups/groupSlice";

export const Body = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const [newGroupName, setNewGroupName] = React.useState("");
  const [showGroups, setShowGroups] = React.useState(false);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);
  
  useEffect(() => {
    console.log("Updated Groups:", groups);
  }, [groups]);

  const handleCreateGroup = () => {
    if (!newGroupName) {
      alert("Please enter a group name!");
      return;
    }
    const newGroup = {
      groupId: Date.now().toString(),
      groupName: newGroupName,
    };
    dispatch(addGroup(newGroup));
    alert("Group added successfully!");
    setNewGroupName("");
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

      {showGroups && groups.length > 0 && (
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
