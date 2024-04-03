import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMajor } from "@/components/General/MajorProvider";
import Select from "react-select"; // Import React Select library
import { dayOptions, timeOptions } from "@/app/config/formConfig";

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
  const { admin, program, fetchSemesterOnProgram } = useMajor();

  let isSemesterForm = formTitle == "Create Semester";

  const handleSubmit = async (values, actions) => {
    let data = {};
    if (isSemesterForm && (!admin || !program)) {
      alert(
        "Admin or Program information is missing. Please ensure you are logged in and a program is selected."
      );
      actions.setSubmitting(false);
      return;
    }
    if (isSemesterForm) {
      data = { ...values, programId: program._id, adminName: admin.username };
    } else {
      data = {
        ...values,
        adminName: admin.username,
      };
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      if (onFormSubmitted) onFormSubmitted();
      if (isSemesterForm) fetchSemesterOnProgram(program._id);
      actions.resetForm();
      alert(successMessage);
    } catch (error) {
      console.error("Error:", error);
      alert(errorMessage);
    }

    actions.setSubmitting(false);
  };

  if (isSemesterForm && !program) {
    return <div>Please select a program to add a semester to.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-6">{formTitle}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              {fields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label
                    htmlFor={field.name}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    {field.label}
                  </label>
                  {field.name === "preferenceTime" ||
                  field.name === "preferenceDay" ? (
                    <Field name={field.name}>
                      {({ field }) => (
                        <Select
                          {...field}
                          options={
                            field.name === "preferenceTime"
                              ? timeOptions
                              : dayOptions
                          }
                          isMulti
                          onBlur={() => setFieldValue(field.name, field.value)}
                          onChange={(option) =>
                            setFieldValue(field.name, option)
                          }
                        />
                      )}
                    </Field>
                  ) : (
                    <Field
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field?.placeholder}
                      className="py-2 px-4 border border-gray-300 rounded-md shadow-sm w-full"
                    />
                  )}
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
