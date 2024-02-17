"use client";
import { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
const ClassroomAllocationPage = () => {
  const [classrooms, setClassrooms] = useState([]);

  // Fetch classroom data from the server or database
  useEffect(() => {
    // Make an API call to fetch the classroom data
    // Update the state with the fetched classrooms
    const fetchData = async () => {
      try {
        const response = await fetch("/api/classrooms");
        const data = await response.json();
        setClassrooms(data);
      } catch (error) {
        console.error("Error fetching classrooms:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div>
        <h1>Classroom Allocation</h1>
        {/* Display detailed information of classroom capacity, room number, and assigned courses */}
        <ul>
          {classrooms.map((classroom) => (
            <li key={classroom.id}>
              <strong>Room Number:</strong> {classroom.roomNumber}
              <br />
              <strong>Capacity:</strong> {classroom.capacity}
              <br />
              <strong>Assigned Courses:</strong>{" "}
              {classroom.assignedCourses.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default ClassroomAllocationPage;
