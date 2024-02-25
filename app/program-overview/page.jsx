"use client";
import { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import { useMajor } from "@/components/MajorProvider";
import ProgramDropdown from "@/components/ProgramDropdown"; // Import the new component

const MajorOverview = () => {
  const { updateProgram, program } = useMajor();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await fetch('/api/program');
      const data = await response.json();
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  const handleProgramChange = (selectedProgramId) => {
    const selectedProgram = programs.find(p => p._id === selectedProgramId);
    updateProgram(selectedProgram); // Update the selected program in the context
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <ProgramDropdown
          programs={programs}
          selectedProgram={program}
          onProgramChange={handleProgramChange}
        />

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
