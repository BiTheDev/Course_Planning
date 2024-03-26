import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Formik, Form } from "formik";
import Dropdown from "../General/Dropdown";
import { useMajor } from "../General/MajorProvider";

const AddInstructorToCourseForm = () => {
  const { allCourses, instructors, fetchAllCourses, fetchAllInstructors } =
    useMajor();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [availableInstructors, setAvailableInstructors] = useState([]);

  useEffect(() => {
    fetchAllCourses();
    fetchAllInstructors();
  }, []);

  useEffect(() =>{
    if (selectedCourse) {
      fetch(`/api/course/${selectedCourse._id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          const courseInstructorId = new Set(data.teachableInstructors.map((c) => c._id));
          const filerInstructors = instructors.filter(
            (instructor) => !courseInstructorId.has(instructor._id)
          );
          setAvailableInstructors(filerInstructors);
        })
        .catch((error) => console.error("Error fetching semester details:", error));
    }
  }, [selectedCourse, instructors])

  const handleCourseChange = (courseId) => {
    const course = allCourses.find((c) => c._id === courseId);
    setSelectedCourse(course);
    setSelectedInstructors([]);
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch(
        `/api/course/${selectedCourse._id}/addInstructors`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ instructors: values.instructors }),
        }
      );

      if (!response.ok)
        throw new Error("Failed to update course with new instructors");

      alert("Instructors added successfully to the course!");
      actions.resetForm();
      setSelectedInstructors([]);
    } catch (error) {
      console.error("Error adding instructors to course:", error);
      alert("Error adding instructors. Please try again.");
    }
  };


  const instructorOptions = availableInstructors.map((instructor) => ({
    value: instructor._id,
    label: instructor.name,
  }));

  return (
    <div className="container mx-auto p-4">
      <Dropdown
        data={allCourses}
        onDataChange={handleCourseChange}
        selectedData={selectedCourse}
        dropDownType="Course"
        labelProperty="identifyCode"
      />
      {selectedCourse && (
        <Formik initialValues={{ instructors: [] }} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <Select
                isMulti
                name="instructors"
                options={instructorOptions}
                className="mb-4"
                value={selectedInstructors}
                onChange={(options) => {
                  setSelectedInstructors(options);
                  setFieldValue(
                    "instructors",
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

export default AddInstructorToCourseForm;
