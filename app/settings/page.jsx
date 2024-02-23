"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import { useMajor } from "@/components/MajorProvider";
import ProgramDropdown from "@/components/ProgramDropdown"; // Import the ProgramDropdown component
import CreateProgramForm from "@/components/Forms/CreateProgramForm";
import CreateSemesterForm from "@/components/Forms/CreateSemesterForm";

const Settings = () => {
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

  const afterCreateProgram = async () => {
    // Fetch programs again to get the updated list including the newly created one
    const response = await fetch('/api/program');
    const data = await response.json();
    setPrograms(data);
  };

  const handleProgramChange = (selectedProgramId) => {
    const selectedProgram = programs.find(p => p._id === selectedProgramId);
    updateProgram(selectedProgram); // Update the selected program in the context
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex-1 mb-8 md:mb-0">
            <CreateProgramForm onProgramCreated={afterCreateProgram} />
          </div>
          {/* Group ProgramDropdown and CreateSemesterForm together in a flex column */}
          <div className="flex-1 mb-8 md:mb-0 flex flex-col">
            <ProgramDropdown
              programs={programs}
              selectedProgram={program}
              onProgramChange={handleProgramChange}
            />
            {/* Move CreateSemesterForm here, under ProgramDropdown */}
            <CreateSemesterForm programs={programs} selectedProgram={programs} handleProgramChange={handleProgramChange} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
