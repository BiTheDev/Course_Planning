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
  const [editingSection, setEditingSection] = useState(null);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [semesterSections, setSemesterSections] = useState(null); // New state for semester sections
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

  const fetchAllSections = async () => {
    // New function to fetch all sections
    const response = await fetch("/api/section");
    if (response.ok) {
      const data = await response.json();
      setSemesterSections(data.sections);
    } else {
      console.error("Failed to fetch sections");
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

  const updateAdmin = (newAdmin) => {
    setAdmin(newAdmin);
    localStorage.setItem("admin", JSON.stringify(newAdmin));
  };

  const updateCourse = async (courseId, updatedCourse) => {
    try {
      const response = await fetch(`/api/course/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourse),
      });
      if (response.ok) {
        await fetchAllCourses();
        return true;
      } else {
        console.error("Failed to update course:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error updating course:", error);
      return false;
    }
  };
  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`/api/course/${courseId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchAllCourses();
        return true;
      } else {
        console.error("Failed to delete course:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      return false;
    }
  };
  const clearEditingCourse = () => {
    setEditingCourse(null);
  };

  const updateInstructor = async (instructorId, updatedInstructor) => {
    try {
      const response = await fetch(`/api/instructor/${instructorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInstructor),
      });
      if (response.ok) {
        // Update the local state with the updated instructor
        setInstructors((prevInstructors) =>
          prevInstructors.map((instructor) =>
            instructor._id === instructorId ? updatedInstructor : instructor
          )
        );
        return true;
      } else {
        console.error("Failed to update instructor");
        return false;
      }
    } catch (error) {
      console.error("Error updating instructor:", error);
      return false;
    }
  };

  const deleteInstructor = async (instructorId) => {
    try {
      const response = await fetch(`/api/instructor/${instructorId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove the instructor from the local state
        setInstructors((prevInstructors) =>
          prevInstructors.filter(
            (instructor) => instructor._id !== instructorId
          )
        );
        return true;
      } else {
        console.error("Failed to delete instructor");
        return false;
      }
    } catch (error) {
      console.error("Error deleting instructor:", error);
      return false;
    }
  };
  const clearEditingInstructor = () => {
    setEditingInstructor(null);
  };

  const updateSection = async (sectionId, updatedSection) => {
    try {
      const response = await fetch(`/api/section/${sectionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSection),
      });
      if (response.ok) {
        await fetchAllSections();
        return true;
      } else {
        console.error("Failed to update section:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error updating section:", error);
      return false;
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      const response = await fetch(`/api/section/${sectionId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchAllSections();
        return true;
      } else {
        console.error("Failed to delete section:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error deleting section:", error);
      return false;
    }
  };

  const clearEditingSection = () => {
    setEditingSection(null);
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
        updateInstructor,
        deleteInstructor,
        clearEditingInstructor,
        editingCourse,
        updateCourse,
        deleteCourse,
        setEditingCourse,
        clearEditingCourse,
        fetchSemesterOnProgram,
        fetchCoursesOnSemester,
        fetchInstructorsOnCourse,
        courseInstructors,
        semesterCourses,
        semesters,
        semesterSections, // Add semesterSections to the context
        fetchAllSections, // Add fetchAllSections to the context
        updateSection,
        deleteSection,
        clearEditingSection,
      }}
    >
      {children}
    </MajorContext.Provider>
  );
};
