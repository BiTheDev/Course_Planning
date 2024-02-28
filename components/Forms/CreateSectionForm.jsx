"use client";
import React, { useState } from "react";
import { useMajor } from "../MajorProvider";
import Dropdown from "../Dropdown";
import { Formik, Form, Field, ErrorMessage } from "formik";
const CreateSectionForm = () => {
  const {
    fetchInstructorsOnCourse,
    courseInstructors,
    semesters,
    fetchCoursesOnSemester,
    semesterCourses,
    admin,
  } = useMajor();

  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedInstructor, setSelectedInstructors] = useState(null);

  const handleSemesterChange = (selectedSemesterId) => {
    if (selectedSemesterId) {
      const semester = semesters.find((s) => s._id === selectedSemesterId);
      setSelectedSemester(semester);
      fetchCoursesOnSemester(semester._id);
    }
    setSelectedCourse(null);
  };

  const handleCourseChange = (selectedCourseId) => {
    if (selectedCourseId) {
      const course = semesterCourses.find((s) => s._id === selectedCourseId);
      setSelectedCourse(course);
      fetchInstructorsOnCourse(course._id);
    }
    setSelectedInstructors(null);
  };

  const handleInstructorChange = (selectedInstructorId) => {
    if (selectedInstructorId) {
      const instructor = courseInstructors.find(
        (c) => c._id === selectedInstructorId
      );
      setSelectedInstructors(instructor);
    }
  };

  const handleSubmit = async (values, actions) => {
    const sectionData = {
      courseCode: selectedCourse.identifyCode,
      professor: selectedInstructor.name,
      preference: selectedInstructor.preferenceTime,
      ...values
    };
    console.log(selectedSemester._id);

    try {
        const response = await fetch(`/api/semester/${selectedSemester._id}/createSection`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({section: sectionData, adminName: admin.username,}),
        });
  
        if (!response.ok) throw new Error("Failed to create Section");
  
        actions.resetForm();
        setSelectedCourse(null);
        setSelectedInstructors(null);
        alert("Section created successfully to the semester!");
      } catch (error) {
        console.error("Error creating section to semester:", error);
        alert("Error creating section. Please try again.");
      }
  };

  return (
    <div className="container mx-auto p-4">
      <Formik
        initialValues={{
          lab: false,
          duration: 180,
          students: 30,
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            {/* First dropdown is for semester in program */}
            <Dropdown
              data={semesters}
              selectedData={selectedSemester}
              onDataChange={handleSemesterChange}
              dropDownType="Semester"
              labelProperty="term"
            />
            {/* Second dropdown is for courses in semester */}
            {selectedSemester && (
              <Dropdown
                data={semesterCourses}
                selectedData={selectedCourse}
                onDataChange={handleCourseChange}
                dropDownType="Course"
                labelProperty="identifyCode"
              />
            )}

            {selectedCourse && (
              <Dropdown
                data={courseInstructors}
                selectedData={selectedInstructor}
                onDataChange={handleInstructorChange}
                dropDownType="Instructor"
                labelProperty="name"
              />
            )}
            {/* third dropdown is for instructors in courses */}
            <FormField
              label="Is this a lab session?"
              name="lab"
              type="checkbox"
            />
            <FormField label="Course duration" name="duration" type="number" />
            <FormField label="Student Capacity" name="students" type="number" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const FormField = ({ label, name, type }) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      {label}
    </label>
    <Field
      name={name}
      type={type}
      className="py-2 px-4 border border-gray-300 rounded-md shadow-sm w-full"
    />
    <ErrorMessage name={name} component="div" className="text-red-500" />
  </div>
);

export default CreateSectionForm;
