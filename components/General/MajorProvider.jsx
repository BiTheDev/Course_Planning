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
  const [allClassrooms, setAllClassrooms] = useState([]);
  const [semesters, setSemesters] = useState(null);
  const [semester, setSemester] = useState(null);
  const [semesterCourses, setSemesterCourses] = useState(null);
  const [courseInstructors, setCourseInstructors] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [setEditingCourse] = useState(null);
  const [semesterSections, setSemesterSections] = useState(null);
  const [allSections, setAllSections] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    fetchAllCourses();
    fetchAllInstructors(); // Fetch instructors when the component mounts
    fetchAllClassrooms();
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

  const fetchAllSections = async () => {
    // New function to fetch all sections
    const response = await fetch("/api/section");
    if (response.ok) {
      const data = await response.json();
      setAllSections(data.sections);
    } else {
      console.error("Failed to fetch sections");
    }
  };

  const fetchSectionsOnSemester = async (semesterId) =>{
    const response = await fetch(`/api/semester/${semesterId}/sections`);
    if (response.ok) {
      const data = await response.json();
      setSemesterSections(data.semesterSections.sections);
    } else {
      console.error("Failed to fetch sections");
    }
  }

  const fetchAllClassrooms = async () => {
    try {
      const response = await fetch("/api/classroom");
      if (response.ok) {
        const data = await response.json();
        setAllClassrooms(data);
      } else {
        console.error("Failed to fetch classrooms");
      }
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  const fetchSemesterOnProgram = async (programId) => {
    const response = await fetch(`/api/program/${programId}/semesters`);
    if (response.ok) {
      const data = await response.json();
      setSemesters(data.semesters);
    }
  };

  const fetchInstructorsOnCourse = async (courseId) => {
    const response = await fetch(`/api/course/${courseId}/instructors`);
    if (response.ok) {
      const data = await response.json();
      setCourseInstructors(data.teachableInstructors);
    }
  };

  const fetchCoursesOnSemester = async (semesterId) => {
    const response = await fetch(`/api/semester/${semesterId}/courses`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setSemesterCourses(data.courses);
    }
  };

  const updateProgram = (newProgram) => {
    setProgram(newProgram);
  };
  const updateSemester = (newSemester) => {
    setSemester(newSemester);
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
        allClassrooms,
        fetchAllClassrooms,
        clearEditingCourse,
        fetchSemesterOnProgram,
        fetchCoursesOnSemester,
        fetchInstructorsOnCourse,
        courseInstructors,
        allSections,
        semesterCourses,
        semesters,
        semesterSections,
        fetchSectionsOnSemester,
        updateSemester,
        semester,
        fetchAllSections, // Add fetchAllSections to the context
      }}
    >
      {children}
    </MajorContext.Provider>
  );
};
