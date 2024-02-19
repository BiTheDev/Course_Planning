import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateInstructorForm = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-6">Create Instructor</h1>
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
            <FormField label="Name" name="name" type="text" />
            <FormField label="Email Address" name="email" type="email" />
            <FormField
              label="Teachable Course"
              name="teachableCourse"
              type="text"
            />
            <FormField
              label="Preferred Time"
              name="preferredTime"
              type="text"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md shadow mt-4"
            >
              Submit
            </button>
          </Form>
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

export default CreateInstructorForm;
