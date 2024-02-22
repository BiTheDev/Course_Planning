
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import { useMajor } from "../MajorProvider";
import * as Yup from "yup";

const CreateCourseForm = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const { admin, fetchCourses } = useMajor();

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await fetch("/api/program");
      const data = await response.json();
      setPrograms(
        data.map((program) => ({ value: program._id, label: program.title }))
      );
    };
    fetchPrograms();
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    identifyCode: Yup.string().required("Required"),
    registrationCode: Yup.string(),
    programs: Yup.array().min(1, "Select at least one program"),
  });

  const handleSubmit = async (values, actions) => {
    const courseData = {
      ...values,
      programs: selectedPrograms.map((p) => p.value),
      adminName: admin.username,
    };

    try {
      const response = await fetch("/api/course/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error("Failed to create course");
      alert("Course created successfully");
      actions.resetForm();
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error creating course");
    }
    fetchCourses();

    actions.setSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-6">Create Course</h1>
        <Formik
          initialValues={{ title: "", identifyCode: "", registrationCode: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, errors, touched }) => (
            <Form>
              <FormField label="Course Title" name="title" type="text" />
              <FormField
                label="Identify Code"
                name="identifyCode"
                type="text"
              />
              <FormField
                label="Registration Code"
                name="registrationCode"
                type="text"
              />
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Programs
                </label>
                <Select
                  options={programs}
                  isMulti
                  onChange={(options) => {
                    setSelectedPrograms(options);
                    setFieldValue(
                      "programs",
                      options.map((option) => option.value)
                    );
                  }}
                  value={selectedPrograms}
                />
                {errors.programs && touched.programs && (
                  <div className="text-red-500">{errors.programs}</div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 px-4 bg-blue-500 text-white rounded-md shadow mt-4"
              >
                Create Course
              </button>
            </Form>
          )}
        </Formik>
      </div>
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

export default CreateCourseForm;
