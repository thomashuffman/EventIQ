import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addGroup } from "../../features/groups/groupSlice";
import { useNavigate } from "react-router-dom";
import "./CreateGroupPage.css";

export const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateGroup = () => {
    if (!groupName) {
      alert("Please enter a group name!");
      return;
    }

    const newGroup = {
      groupId: Date.now().toString(),
      groupName,
      description,
    };

    dispatch(addGroup(newGroup));
    alert("Group added successfully!");
    navigate("/manage-groups"); // Redirect back to Manage Groups page
  };

  return (
    <main className="create-group-main">
      <h2 className="page-title">Create a New Group</h2>

      <form className="create-group-form">
        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </label>
        
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <button type="button" onClick={handleCreateGroup}>
          Create Group
        </button>
      </form>
    </main>
  );
};
