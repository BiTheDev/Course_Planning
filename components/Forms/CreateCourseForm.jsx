import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateCourseForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setIsSubmitted(true);
      setSubmitting(false);
    }, 400);
  };

  const validationSchema = Yup.object({
    courseName: Yup.string().required("Required"),
    courseCode: Yup.string().required("Required"),
    instructor: Yup.string().required("Required"),
    courseTime: Yup.string().required("Required"),
    classroom: Yup.string().required("Required"),
    maxCapacity: Yup.number()
      .required("Required")
      .positive("Must be a positive number")
      .integer("Must be an integer"),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {!isSubmitted ? (
          <>
            <h1 className="text-2xl mb-6">Create Course</h1>
            <Formik
              initialValues={{
                courseName: "",
                courseCode: "",
                instructor: "",
                courseTime: "",
                classroom: "",
                maxCapacity: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <FormField label="Course Name" name="courseName" type="text" />
                <FormField label="Course Code" name="courseCode" type="text" />
                <FormField label="Instructor" name="instructor" type="text" />
                <FormField label="Course Time" name="courseTime" type="text" />
                <FormField label="Classroom" name="classroom" type="text" />
                <FormField
                  label="Max Capacity"
                  name="maxCapacity"
                  type="number"
                />
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md shadow mt-4"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </>
        ) : (
          <p>Course submitted successfully!</p>
        )}
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
