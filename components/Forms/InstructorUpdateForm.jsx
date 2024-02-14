import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const InstructorUpdateForm = () => {
  return (
    <div>
      <h1>Update Instructor Information</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          teachableCourse: "",
          preferredTime: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          teachableCourse: Yup.string().required("Required"),
          preferredTime: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="teachableCourse">Teachable Course</label>
          <Field name="teachableCourse" type="text" />
          <ErrorMessage name="teachableCourse" />

          <label htmlFor="preferredTime">Preferred Time</label>
          <Field name="preferredTime" type="text" />
          <ErrorMessage name="preferredTime" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default InstructorUpdateForm;
