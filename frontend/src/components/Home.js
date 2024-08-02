import React, { useState } from "react";
import SideBar from "./SideBar";
import "./css/Home.css";
import NotesPage from "./NotesPage";
import { Toaster } from "react-hot-toast";
import CreateGroupPopUp from "./CreateGroupPopUp";
const Home = () => {
  const [selectedGroup, setselectedGroup] = useState();
  const [sidebarLeft, setSidebarLeft] = useState("0px");

  return (
    <div className="main-container">
      <SideBar  setselectedGroup={setselectedGroup}  setSidebarLeft={setSidebarLeft}  sidebarLeft={sidebarLeft}></SideBar>
   
      {selectedGroup ? (
        <NotesPage selectedGroup={selectedGroup}  setSidebarLeft={setSidebarLeft}></NotesPage>
      ) : (
        <>
          <div className="hero-container">
            <div>
              <div className="hero-img"></div>
              <h1>Pocket Notes</h1>
              <p className="hero-line">
                Send and receive messages without keeping your phone online. Use
                Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
            <div className="footer-line">
              <i className="lock-icon"></i>
              <p>end-to-end encrypted</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
