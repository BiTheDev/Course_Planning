"use client"
import React, { useEffect } from "react";
import MainLayout from "../MainLayout";
import { useMajor } from "@/components/General/MajorProvider";

const ClassroomManagementPage = () => {
  const { allClassrooms, fetchAllClassrooms } = useMajor();

  useEffect(() => {
    // Fetch all classrooms when the component mounts
    fetchAllClassrooms();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Classroom Information</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Building
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Room Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Capacity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allClassrooms.map((classroom) => (
                <tr key={classroom._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{classroom.building}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{classroom.roomNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{classroom.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {allClassrooms.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No classrooms found.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ClassroomManagementPage;
