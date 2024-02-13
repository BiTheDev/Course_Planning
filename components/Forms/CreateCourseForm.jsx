import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateCourseForm = () => {
  return (
    <div>
      <h1>Create Course</h1>
      <Formik
        initialValues={{
          courseName: "",
          courseCode: "",
          instructor: "",
          courseTime: "",
          classroom: "",
          maxCapacity: "",
        }}
        validationSchema={Yup.object({
          courseName: Yup.string().required("Required"),
          courseCode: Yup.string().required("Required"),
          instructor: Yup.string().required("Required"),
          courseTime: Yup.string().required("Required"),
          classroom: Yup.string().required("Required"),
          maxCapacity: Yup.number()
            .required("Required")
            .positive("Must be a positive number")
            .integer("Must be an integer"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <label htmlFor="courseName">Course Name</label>
          <Field name="courseName" type="text" />
          <ErrorMessage name="courseName" />

          <label htmlFor="courseCode">Course Code</label>
          <Field name="courseCode" type="text" />
          <ErrorMessage name="courseCode" />

          <label htmlFor="instructor">Instructor</label>
          <Field name="instructor" type="text" />
          <ErrorMessage name="instructor" />

          <label htmlFor="courseTime">Course Time</label>
          <Field name="courseTime" type="text" />
          <ErrorMessage name="courseTime" />

          <label htmlFor="classroom">Classroom</label>
          <Field name="classroom" type="text" />
          <ErrorMessage name="classroom" />

          <label htmlFor="maxCapacity">Max Capacity</label>
          <Field name="maxCapacity" type="number" />
          <ErrorMessage name="maxCapacity" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateCourseForm;
