"use client";

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useMajor } from '@/components/General/MajorProvider'; // Adjust the path as necessary

const CreateProgramForm = ( { onProgramCreated }) => {
  const { admin } = useMajor(); // Access the admin object from the context

  const handleSubmit = async (values, actions) => {
    if (!admin) {
      alert('No admin information found. Please log in.');
      actions.setSubmitting(false);
      return;
    }

    // Include the admin ID in the submission data
    const submissionData = { ...values, adminName: admin.username };

    try {
      const response = await fetch('/api/program/create', { // Adjust this URL to your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle success - clear form, show success message, etc.
      actions.resetForm();
      onProgramCreated();
      alert('Program created successfully!');
    } catch (error) {
      console.error('Error creating program:', error);
      alert('Error creating program. Please try again.');
    }

    actions.setSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl mb-6">Create Program</h1>

      <Formik
        initialValues={{ title: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Program Title
              </label>
              <Field
                id="title"
                name="title"
                type="text"
                placeholder="Enter Program Title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Program
            </button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};

export default CreateProgramForm;
