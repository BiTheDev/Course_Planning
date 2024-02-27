import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import { Formik, Form } from "formik";
import { useMajor } from "../MajorProvider";
import Select from "react-select";

const AddCourseToSemesterForm = () => {
  const { semesters, fetchAllCourses, allCourses } = useMajor();
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      // Fetch the detailed semester data including its courses
      fetch(`/api/semester/${selectedSemester._id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // Filter out courses that are already in the semester
          const semesterCoursesIds = new Set(data.courses.map((c) => c._id));
          const filteredCourses = allCourses.filter(
            (course) => !semesterCoursesIds.has(course._id)
          );
          setAvailableCourses(filteredCourses);
        })
        .catch((error) =>
          console.error("Error fetching semester details:", error)
        );
    }
  }, [selectedSemester, allCourses]);

  const coursesOptions = availableCourses.map((course) => ({
    value: course._id,
    label: course.identifyCode,
  }));

  const handleSemesterChange = (semesterId) => {
    const semester = semesters.find((s) => s._id === semesterId);
    setSelectedSemester(semester);
    setSelectedCourses([]); // Reset selected courses when changing semester
  };

  const handleSubmit = async (values, actions) => {
    console.log(values.courses);
    try {
      const response = await fetch(
        `/api/semester/${selectedSemester._id}/addCourses`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courses: values.courses }),
        }
      );

      if (!response.ok)
        throw new Error("Failed to update semester with new courses");

      alert("Courses added successfully to the semester!");
      actions.resetForm();
      setSelectedCourses([]);
    } catch (error) {
      console.error("Error adding courses to semester:", error);
      alert("Error adding courses. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Dropdown
        data={semesters}
        selectedData={selectedSemester}
        onDataChange={handleSemesterChange}
        dropDownType="Semester"
        labelProperty="term"
      />
      {selectedSemester && (
        <Formik initialValues={{ courses: [] }} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <Select
                isMulti
                name="courses"
                options={coursesOptions}
                className="mb-4"
                value={selectedCourses}
                onChange={(options) => {
                  setSelectedCourses(options);
                  setFieldValue(
                    "courses",
                    options.map((option) => option.value)
                  );
                }}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddCourseToSemesterForm;
