import React, { useState } from "react";
import "./css/CreateGroupPopUp.css";
import axios from "axios";
import toast from "react-hot-toast";
const CreateGroupPopUp = ({ triggerReload, setAddGroupClicked }) => {
  const [groupData, setGroupData] = useState({
    description: "",
    color: "",
  });
  const handleInputChange = (e) => {
    setGroupData((prevData) => ({
      ...prevData,
      description: e.target.value,
    }));
  };

  const handleColorClick = (color) => {
    setGroupData((prevData) => ({
      ...prevData,
      color,
    }));
  };

  const handleSubmit = async () => {
    const group = {
      description: groupData.description,
      color: groupData.color,
    };
    try {
      let res = await axios.post("https://cuvettechallenge.onrender.com/api/group/", group);
      if (res) {
        console.log(res);
      }
      toast.success("added group success!");

      setAddGroupClicked(false);
      triggerReload();
    } catch (err) {
      console.log(err);
    }
  };
  let colors = ["green", "red", "blue", "purple", "black"];
  return (
    <div className="create-group-main-container">
      <div className="create-group-container">
        <p>Create New Group</p>
        <div className="create-group-input">
          <p>Group Name</p>
          <input
            onChange={handleInputChange}
            value={groupData.description}
            placeholder="Enter group name"
            type="text"
          />
        </div>
        <div className="create-group-input">
          <p>Choose Color</p>
          <div className="colors-options-container">
            {colors.map((data) => {
              return (
                <div
                  onClick={() => handleColorClick(data)}
                  className="colors-options"
                  style={{
                    backgroundColor: `${data}`,
                    border:
                      groupData.color === data ? "2px solid black" : "none",
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="create-new-group-button-container">
          <button onClick={handleSubmit} className="create-new-group-button">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPopUp;
