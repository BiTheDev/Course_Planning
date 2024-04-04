// DynamicSemesterInfoList.js
"use client";
import React, { useEffect } from "react";
import { useMajor } from "./General/MajorProvider";

const DynamicSemesterInfoList = ({
  ListType,
  ListColumns,
  deleteUrl,
  confirmationMessage,
  successMessage,
  errorMessage,
}) => {
  const {
    allCourses,
    instructors,
    allSections,
    semesterSections,
    fetchAllCourses,
    fetchAllSections,
    allClassrooms,
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
    data = allSections;
  } else if (ListType === "semesterSections") {
    data = semesterSections;
  }

  const handleDelete = async (deleteUrl) => {
    const confirmed = window.confirm(confirmationMessage);
    if (confirmed) {
      try {
        const response = await fetch(deleteUrl, {
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
  const handleGenerate = async () => {
    // Assuming `semesterSections` and `allClassrooms` contain the data in MongoDB format
    const sections = semesterSections.map((section) => ({
      course: section.courseCode,
      professor: section.professor,
      pref_time: section.pref_time,
      pref_day: section.pref_day,
      is_lab: section.lab,
      duration: section.duration,
      students: section.students,
    }));

    const rooms = allClassrooms.map((room) => ({
      name: `${room.building}-${room.roomNumber}`,
      size: room.capacity,
    }));

    const payload = [
      ...sections.map((section) => ({ section })),
      ...rooms.map((room) => ({ room })),
    ];

    console.log(payload);

    try {
      const postResponse = await fetch("/api/proxy", {
        // Replace 'API_ENDPOINT' with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!postResponse.ok) throw new Error(" POST Network response was not ok");

      // Optionally process the POST response
      const postResult = await postResponse.json();
      console.log(postResult); // You might want to do something with this result

      // GET request
      const getResponse = await fetch("api/proxy", {
        // Replace 'API_GET_ENDPOINT' with your actual API GET endpoint
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!getResponse.ok) throw new Error("GET Network response was not ok");

      const getResult = await getResponse.json();
      console.log(getResult); // Process the GET response

      // Here you can update your state or UI based on the getResult
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGetNewSchedule = async() =>{
    try {
      // GET request
      const getResponse = await fetch("api/proxy", {
        // Replace 'API_GET_ENDPOINT' with your actual API GET endpoint
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!getResponse.ok) throw new Error("GET Network response was not ok");

      const getResult = await getResponse.json();
      console.log(getResult); // Process the GET response

      // Here you can update your state or UI based on the getResult
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {ListType.charAt(0).toUpperCase() + ListType.slice(1)} Information
      </h2>
      {ListType === "semesterSections" && (
        <div>
          <button
            onClick={() => handleGenerate(data)}
            className="text-blue-600 hover:text-blue-900 mr-2"
          >
            First time Generate
          </button>
        </div>
      )}
      {ListType === "semesterSections" && (
        <div>
          <button
            onClick={() => handleGetNewSchedule()}
            className="text-blue-600 hover:text-blue-900 mr-2"
          >
            Get New Schedule
          </button>
        </div>
      )}
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
