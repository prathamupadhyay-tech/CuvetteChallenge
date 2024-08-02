import React, { useEffect, useState } from "react";
import "./css/NotesPage.css";
import axios from "axios";

const NotesPage = ({ selectedGroup, setSidebarLeft }) => {
  const [newNote, setNewNote] = useState("");
  const [notesData, setNotesData] = useState();
  function formatDateTime(isoString) {
    const date = new Date(isoString);

    const dateOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
      date
    );

    const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      date
    );

    return { formattedDate, formattedTime };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(
          `https://cuvettechallenge.onrender.com/api/notes/groupNotes/${selectedGroup._id}`
        );
        if (!res) {
          console.log(res);
          return;
        }
        console.log(res.data.data);
        setNotesData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [selectedGroup]);

  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) {
      alert("Note description cannot be empty.");
      return;
    }
    try {
      const res = await axios.post(
        `https://cuvettechallenge.onrender.com/api/notes/${selectedGroup._id}`,
        {
          des: newNote,
        }
      );
      if (res.status === 200) {
        setNotesData((prevNotes) => [res.data.group, ...prevNotes]);
        setNewNote("");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="notes-main-container">
      <div className="notes-header">
        <i onClick={() => setSidebarLeft("0px")} className="left-arrow"></i>
        <div
          className="notes-start"
          style={{ backgroundColor: `${selectedGroup.color}` }}
        >
          {selectedGroup.start}
        </div>
        <p>{selectedGroup.description}</p>
      </div>
      <div className="notes-container">
        {notesData &&
          notesData.map((data) => {
            const { formattedDate, formattedTime } = formatDateTime(
              data.createdAt
            );
            return (
              <>
                <div className="notes">
                  {data.des}
                  <div className="notes-creation-time">
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>

      <div className="text-area">
        <textarea
          name=""
          value={newNote}
          onChange={handleInputChange}
          id=""
          placeholder="Enter text here ..."
        ></textarea>
        <button
          onClick={handleAddNote}
          disabled={!newNote.trim()}
          className="add-notes"
          style={{
            cursor: !newNote.trim() ? "not-allowed" : "pointer",
          }}
        >
          <svg
            width="35"
            height="29"
            viewBox="0 0 35 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 29V18.125L14.5 14.5L0 10.875V0L34.4375 14.5L0 29Z"
              fill={newNote ? "black" : "#ABABAB"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotesPage;
