"use client";
import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ReactModal from "react-modal"; // For clickable events

const Calendar = () => {
  const events = [
    { title: "Event 1", date: "2024-01-01" },
    { title: "Event 2", date: "2024-01-05" },
    // Add more events here
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target)
      ) {
        setModalIsOpen(false);
      }
    };

    if (modalIsOpen) {
      // Add event listener when the modal is open
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalIsOpen]);

  const handleEventMouseEnter = (mouseEnterInfo) => {
    // Get the bounding rectangle of the event element
    const rect = mouseEnterInfo.el.getBoundingClientRect();

    // Set modal position to appear near the event element
    // Adjust the offsets as needed
    setModalPosition({
      top: rect.top + window.scrollY + 10,
      left: rect.left + window.scrollX + 10,
    });
    setSelectedEvent(mouseEnterInfo.event);
    setModalIsOpen(true);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "transparent",
      zIndex: "50", // Ensure the modal is above other elements
    },
    content: {
      position: "absolute", // Use absolute positioning
      top: `${modalPosition.top}px`, // Use state for dynamic positioning
      left: `${modalPosition.left}px`, // Use state for dynamic positioning
      border: "none", // Remove default border
      background: "none", // Remove default background
      padding: 0, // Remove default padding
      overflow: "visible", // Show content outside the modal box
    },
  };

  return (
    <div className="container mx-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventMouseEnter={handleEventMouseEnter}
      />
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div
          className="bg-white shadow-lg rounded-lg p-4 max-w-xs"
          ref={modalContentRef}
        >
          <h2 className="text-lg font-semibold">{selectedEvent?.title}</h2>
          <p className="text-gray-500">
            Date: {selectedEvent?.start?.toLocaleString()}
          </p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default Calendar;
