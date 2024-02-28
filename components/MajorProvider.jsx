// contexts/MajorContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MajorContext = createContext();

export const useMajor = () => useContext(MajorContext);

export const MajorProvider = ({ children }) => {
  const [program, setProgram] = useState(null); // This can be used to store the selected program object
  const [admin, setAdmin] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [semesters, setSemesters] = useState(null);
  const [semesterCourses, setSemesterCourses] = useState(null);
  const [courseInstructors, setCourseInstructors] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    fetchAllCourses();
    fetchAllInstructors(); // Fetch instructors when the component mounts
  }, []);

  const fetchAllCourses = async () => {
    const response = await fetch("/api/course");
    if (response.ok) {
      const data = await response.json();
      setAllCourses(data);
    } else {
      console.error("Failed to fetch courses");
    }
  };

  const fetchAllInstructors = async () => {
    const response = await fetch("/api/instructor");
    if (response.ok) {
      const data = await response.json();
      setInstructors(data);
    } else {
      console.error("Failed to fetch instructors");
    }
  };

  const fetchSemesterOnProgram = async (programId) => {
    const response = await fetch(`/api/program/${programId}/semester`);
    if (response.ok) {
      const data = await response.json();
      setSemesters(data.semesters);
    }
  };

  const fetchCoursesOnSemester = async (semesterId) =>{
    const response = await fetch(`/api/semester/${semesterId}/course`);
    if(response.ok) {
      const data = await response.json();
      console.log(data);
      setSemesterCourses(data.courses);
    }
  }

  const fetchInstructorsOnCourse = async (courseId) =>{
    const response = await fetch(`/api/course/${courseId}/instructor`);
    if(response.ok) {
      const data = await response.json();
      setCourseInstructors(data.teachableInstructors);
    }
  }

  const updateProgram = (newProgram) => {
    setProgram(newProgram);
  };

  const updateAdmin = (newAdmin) => {
    setAdmin(newAdmin);
    localStorage.setItem("admin", JSON.stringify(newAdmin));
  };

  const clearEditingCourse = () => {
    setEditingCourse(null);
  };

  return (
    <MajorContext.Provider
      value={{
        program,
        updateProgram,
        admin,
        updateAdmin,
        allCourses,
        fetchAllCourses,
        instructors,
        fetchAllInstructors,
        editingCourse,
        setEditingCourse,
        clearEditingCourse,
        fetchSemesterOnProgram,
        fetchCoursesOnSemester,
        fetchInstructorsOnCourse,
        courseInstructors,
        semesterCourses,
        semesters,
      }}
    >
      {children}
    </MajorContext.Provider>
  );
};
