"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { useMajor } from "@/components/MajorProvider"; // Ensure the path is correct

const CreateSemesterForm = () => {
  const { program, admin } = useMajor(); // Access the current program and admin from context

  const handleSubmit = async (values, actions) => {
    if (!admin || !program) {
      alert(
        "Admin or Program information is missing. Please ensure you are logged in and a program is selected."
      );
      actions.setSubmitting(false);
      return;
    }

    // Include the admin ID and the program ID in the submission data
    const submissionData = { ...values, programId: program._id, adminName: admin.username };
    console.log(submissionData);
    try {
      const response = await fetch("/api/semester/create", {
        // Adjust this URL to your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle success - clear form, show success message, etc.
      actions.resetForm();
      alert("Semester created successfully!");
    } catch (error) {
      console.error("Error creating semester:", error);
      alert("Error creating semester. Please try again.");
    }

    actions.setSubmitting(false);
  };

  if (!program) {
    return <div>Please select a program to add a semester to.</div>;
  }

  return (
    <div className="pt-5 max-w-md mx-auto">
      <p className="mb-4">
        You are currently adding terms to: <strong>{program.title}</strong>
      </p>
      <Formik initialValues={{ term: "" }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                htmlFor="term"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Semester Term
              </label>
              <Field
                id="term"
                name="term"
                type="text"
                placeholder="e.g., Fall 2024"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Semester
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateSemesterForm;
