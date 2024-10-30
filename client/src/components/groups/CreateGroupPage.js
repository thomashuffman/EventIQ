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
  const [groupType, setGroupType] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [location, setLocation] = useState("");
  const [maxMembers, setMaxMembers] = useState(10);
  const [groupImage, setGroupImage] = useState(null);

  const handleCreateGroup = () => {
    if (!groupName) {
      alert("Please enter a group name!");
      return;
    }

    const newGroup = {
      groupId: Date.now().toString(),
      groupName,
      description,
      groupType,
      privacy,
      location,
      maxMembers,
      groupImage,
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

        <label>
          Group Type:
          <select value={groupType} onChange={(e) => setGroupType(e.target.value)}>
            <option value="">Select type</option>
            <option value="study">Study Group</option>
            <option value="project">Project Team</option>
            <option value="social">Social Club</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <label>
          Privacy:
          <select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="invite-only">Invite Only</option>
          </select>
        </label>

        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label>
          Max Members:
          <input
            type="number"
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            min="1"
          />
        </label>

        <button type="button" className="create-group-button" onClick={handleCreateGroup}>
  Create Group
</button>

      </form>
    </main>
  );
};
