// DynamicSemesterInfoList.js
"use client";
import React, { useEffect } from "react";
import { useMajor } from "./General/MajorProvider";
import { handleSubmit } from "./Forms/UpdateForms/DynamicUpdateListItem";
import { handleDelete } from "./Forms/DeleteForms/DynamicDeleteListItem";

const DynamicSemesterInfoList = ({ ListType, ListColumns }) => {
  const {
    allCourses,
    instructors,
    semesterSections,
    fetchAllCourses,
    fetchAllSections,
  } = useMajor();

  useEffect(() => {
    if (ListType === "courses") {
      fetchAllCourses();
    } else if (ListType === "sections") {
      fetchAllSections();
    }
  }, [ListType, fetchAllCourses, fetchAllSections]);

  let data;
  if (ListType === "courses") {
    data = allCourses;
  } else if (ListType === "instructors") {
    data = instructors;
  } else if (ListType === "sections") {
    data = semesterSections;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {ListType.charAt(0).toUpperCase() + ListType.slice(1)} Information
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {ListColumns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
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
            {data &&
              data.map((item) => (
                <tr key={item._id}>
                  {ListColumns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      <div className="text-sm text-gray-900">
                        {column.render ? column.render(item) : item[column.key]}
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleSubmit(item._id)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
      {(!data || data.length === 0) && (
        <div className="text-center py-4">
          <p className="text-gray-500">No {ListType} found.</p>
        </div>
      )}
    </div>
  );
};

export default DynamicSemesterInfoList;
