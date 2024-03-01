import React, { useRef } from "react";
import { Formik, Form } from "formik";
import { useMajor } from "@/components/General/MajorProvider";

const UploadInstructorForm = () => {
  const { admin, fetchInstructors } = useMajor();
  const fileInputRef = useRef();

  const handleSubmit = async (values, actions) => {
    if (!admin) {
      alert("No admin information found. Please log in.");
      actions.setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", values.file);
      const response = await fetch("/api/instructor/import", {
        method: "POST",
        headers: {
          "X-Admin-Name": admin.username,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      actions.resetForm();
      fetchInstructors();
      alert("Instructor file uploaded successfully!");

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading instructor file:", error);
      alert("Error uploading instructor file. Please try again.");
    }

    actions.setSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-6">Upload Instructors (CSV file only)</h1>

        <Formik initialValues={{ file: null }} onSubmit={handleSubmit}>
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Upload CSV
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  ref={fileInputRef} // Attach the ref to the file input
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Upload Instructors
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UploadInstructorForm;
