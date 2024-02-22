'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import { useMajor } from '../MajorProvider';// Adjust the path as needed

const UpdateCourseForm = () => {
  const { editingCourse, fetchCourses,clearEditingCourse } = useMajor(); // Use editingCourse from context
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await fetch("/api/program");
      const data = await response.json();
      setPrograms(data.map(program => ({ value: program._id, label: program.title })));
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (editingCourse) {
      setSelectedPrograms(editingCourse.programs.map(program => ({ value: program._id, label: program.title })));
    }
  }, [editingCourse]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const updatedCourseData = {
      ...values,
      programs: selectedPrograms.map(p => p.value),
    };

    try {
      const response = await fetch(`/api/course/${editingCourse._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCourseData),
      });

      if (!response.ok) throw new Error('Failed to update course');
      alert('Course updated successfully');
      fetchCourses(); // Refresh the course list
      clearEditingCourse();
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Error updating course');
    }

    setSubmitting(false);
  };

  if (!editingCourse) return null; // Don't render the form if there's no course selected for editing

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-6">Update Course</h1>
        <Formik
          initialValues={{
            title: editingCourse.title,
            identifyCode: editingCourse.identifyCode,
            registrationCode: editingCourse.registrationCode || '',
          }}
          onSubmit={handleSubmit}
          enableReinitialize // Important for resetting form when editingCourse changes
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Course Title</label>
                <Field name="title" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
              </div>

              <div className="mb-4">
                <label htmlFor="identifyCode" className="block text-gray-700 text-sm font-bold mb-2">Identify Code</label>
                <Field name="identifyCode" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
              </div>

              <div className="mb-4">
                <label htmlFor="registrationCode" className="block text-gray-700 text-sm font-bold mb-2">Registration Code</label>
                <Field name="registrationCode" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
              </div>


              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Programs</label>
                <Select
                  options={programs}
                  isMulti
                  onChange={options => {
                    setSelectedPrograms(options);
                    setFieldValue('programs', options.map(option => option.value));
                  }}
                  value={selectedPrograms}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="py-2 px-4 bg-blue-500 text-white rounded-md shadow mt-4">
                Update Course
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateCourseForm;
