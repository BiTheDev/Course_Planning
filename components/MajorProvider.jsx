// contexts/MajorContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MajorContext = createContext();

export const useMajor = () => useContext(MajorContext);

export const MajorProvider = ({ children }) => {
  const [program, setProgram] = useState(null); // This can be used to store the selected program object
  const [admin, setAdmin] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await fetch("/api/course");
    if (response.ok) {
      const data = await response.json();
      setCourses(data);
    } else {
      console.error("Failed to fetch courses");
    }
  };

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
        courses,
        fetchCourses,
        editingCourse,
        setEditingCourse,
        clearEditingCourse,
      }}
    >
      {children}
    </MajorContext.Provider>
  );
};
