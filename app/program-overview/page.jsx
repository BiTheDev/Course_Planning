"use client";
import { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import { useMajor } from "@/components/MajorProvider";

const MajorOverview = () => {
  const { updateProgram, program } = useMajor(); // Use updateProgram to set the selected program
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await fetch('/api/program'); // Adjust the API endpoint as necessary
      const data = await response.json();
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  const handleProgramChange = (selectedProgramId) => {
    console.log(selectedProgramId);
    const selectedProgram = programs.find(p => p._id === selectedProgramId);
    updateProgram(selectedProgram); // Update the selected program in the context
    console.log(program);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <label htmlFor="program-select" className="block mb-2 text-sm font-medium text-gray-900">Select a Program:</label>
          <select
            id="program-select"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={program?.id || ''}
            onChange={(e) => handleProgramChange(e.target.value)}
          >
            <option value="">Select a program</option>
            {programs.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {program && (
          <div>
            <p className="mb-4">You are currently viewing the program: <strong>{program.title}</strong></p>
            {/* Additional details and operations related to the selected program can be added here */}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MajorOverview;
