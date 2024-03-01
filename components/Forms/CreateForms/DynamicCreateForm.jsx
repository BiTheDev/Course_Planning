import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMajor } from "@/components/General/MajorProvider";
const DynamicCreateForm = ({
    formTitle,
  initialValues,
  validationSchema,
  fields,
  apiEndpoint,
  successMessage,
  errorMessage,
  onFormSubmitted,
}) => {
    const {admin} = useMajor();

  const handleSubmit = async (values, actions) => {
    const data = {
        ...values,
        adminName: admin.username,
      };
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      alert(successMessage);
      if (onFormSubmitted) onFormSubmitted();
      actions.resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert(errorMessage);
    }

    actions.setSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl mb-6">{formTitle}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {fields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    {field.label}
                  </label>
                  <Field
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    className="py-2 px-4 border border-gray-300 rounded-md shadow-sm w-full"
                  />
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-500"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2 px-4 bg-blue-500 text-white rounded-md shadow mt-4"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DynamicCreateForm;
