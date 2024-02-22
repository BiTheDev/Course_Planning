// contexts/MajorContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const MajorContext = createContext();

export const useMajor = () => useContext(MajorContext);

export const MajorProvider = ({ children }) => {
  const [major, setMajor] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch major from URL query parameters
    const majorQueryParam = router.query?.major;
    if (majorQueryParam) {
      setMajor(majorQueryParam);
    }

    // Retrieve admin info from localStorage
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    fetchCourses();
  }, [router.query?.major]);

  const fetchCourses = async () => {
    const response = await fetch("/api/course");
    if (response.ok) {
      const data = await response.json();
      setCourses(data);
    } else {
      console.error("Failed to fetch courses");
    }
  };

  const updateMajor = (newMajor) => {
    setMajor(newMajor);
  };

  const updateAdmin = (newAdmin) => {
    setAdmin(newAdmin);
    // Store admin info in localStorage
    localStorage.setItem("admin", JSON.stringify(newAdmin));
  };

  const clearEditingCourse = () => {
    setEditingCourse(null);
  };

  return (
    <MajorContext.Provider
      value={{
        major,
        setMajor,
        updateMajor,
        admin,
        updateAdmin,
        courses,
        fetchCourses,
        editingCourse,
        setEditingCourse,
        clearEditingCourse
      }}
    >
      {children}
    </MajorContext.Provider>
  );
};
