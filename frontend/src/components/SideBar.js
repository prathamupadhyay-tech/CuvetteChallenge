import React from "react";
import "./css/SideBar.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";
import listenForOutsideClicks from "./ListenForOutsideClicks";
import CreateGroupPopUp from "./CreateGroupPopUp";
const SideBar = ({ sidebarLeft, setselectedGroup, setSidebarLeft }) => {
  const [addGroupClicked, setAddGroupClicked] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [groupData, setGroupData] = useState();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/group/all");
        setGroupData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [reloadData]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleGroupClick = (data) => {
    setselectedGroup({
      start:
        data.description.split(" ").length > 1
          ? data.description.split(" ")[0][0].toUpperCase() +
            data.description.split(" ")[1][0].toUpperCase()
          : data.description.split(" ")[0][0].toUpperCase(),
      ...data,
    });

    if (windowWidth <= 660) {
      setSidebarLeft("-100%"); // Adjust this value as needed
    }
  };
  const isMobileView = windowWidth <= 660;
  return (
    <>
      <div
        className="sidebar-container"
        style={{ left: isMobileView ? sidebarLeft : "0px" }}
      >
        <div className="side-bar-header">
          <h1>Pocket Notes</h1>
        </div>

        <div className="notes-groups-container">
          {groupData &&
            groupData.map((data) => {
              let start = "";
              let a = data.description.split(" ");
              if (a.length > 1) {
                start += a[0][0].toUpperCase();
                start += a[1][0].toUpperCase();
              } else {
                start += a[0][0].toUpperCase();
              }
              return (
                <div
                  onClick={() => handleGroupClick(data)}
                  className="notes-groups"
                >
                  <div
                    className="notes-group-start"
                    style={{ backgroundColor: `${data.color}` }}
                  >
                    {start}
                  </div>
                  <p>{data.description}</p>
                </div>
              );
            })}
        </div>

        <button
          onClick={() => {
            setAddGroupClicked(!addGroupClicked);
          }}
          className="add-group-btn"
        >
          +
        </button>
      </div>
      {addGroupClicked ? (
        <div>
          <CreateGroupPopUp
            triggerReload={() => {
              setReloadData(!reloadData);
              console.log("heelloo");
            }}
            setAddGroupClicked={setAddGroupClicked}
          ></CreateGroupPopUp>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SideBar;
