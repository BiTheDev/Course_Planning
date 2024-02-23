
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMajor } from "../MajorProvider";
import Select from 'react-select';
import * as Yup from "yup";
const CreateCourseForm = () => {
  const { admin, fetchCourses } = useMajor();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    identifyCode: Yup.string().required("Required"),
    registrationCode: Yup.string(),
  });

  const handleSubmit = async (values, actions) => {
    const courseData = {
      ...values,
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
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Error creating course");
    }

    actions.setSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-6">Create Course</h1>
        <Formik
          initialValues={{ title: "", identifyCode: ""}}
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
