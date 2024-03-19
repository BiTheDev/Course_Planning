import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const handleDelete = async (apiEndpoint) => {
  const confirmed = window.confirm(confirmationMessage);
  if (confirmed) {
    try {
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Network response was not ok");

      alert(successMessage);
    } catch (error) {
      console.error("Error:", error);
      alert(errorMessage);
    }
  }
};

const DynamicDeleteListItem = ({ formTitle, apiEndpoint }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleDelete(apiEndpoint);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-6">{formTitle}</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {fields.map((field) => (
                      <th
                        key={field.name}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {field.label}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      {fields.map((field) => (
                        <td
                          key={field.name}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          <div className="text-sm font-medium text-gray-900">
                            {item[field.name]}
                          </div>
                        </td>
                      ))}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleSubmit(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {items.length === 0 && (
              <div className="text-center py-4">
                <p className="text-gray-500">No items found.</p>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default DynamicDeleteListItem;
