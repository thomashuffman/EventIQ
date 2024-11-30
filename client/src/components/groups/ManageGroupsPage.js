import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, addGroup } from "../../features/groups/groupSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ManageGroupsPage.css";

export const ManageGroupsPage = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const navigate = useNavigate(); // Initialize navigate
  const [newGroupName, setNewGroupName] = useState("");
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleCreateGroup = () => {
    navigate("/create-group"); // Navigate to the Create Group page
  };

  return (
    <main className="app-main">
      <h2 className="main-heading">Manage Your Groups</h2>

      <div className="grid-container">
        {/* Create Group Button as First Box in the Grid */}
        <div
          className="create-group-box"
          onClick={() => handleCreateGroup()}
        >
          {isCreatingGroup ? (
            <div className="w-full">
              <input
                type="text"
                className="create-group-input"
                placeholder="Enter new group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <button
                className="create-group-button"
                onClick={handleCreateGroup}
              >
                Create
              </button>
            </div>
          ) : (
            <h3 className="text-black font-semibold">Create Group +</h3>
          )}
        </div>

        {/* Display Existing Groups in Grid Format */}
        {groups.map((group) => (
          <div key={group.groupId} className="group-box">
            <h3 className="group-name-heading">Group Name:</h3>
            <p className="group-name">{group.groupName}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
