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

        <CreateProgramForm onProgramCreated={afterCreateProgram} />
        <ProgramDropdown
          programs={programs}
          selectedProgram={program}
          onProgramChange={handleProgramChange}
        />
        <CreateSemesterForm selectedProgram={programs} />
      </div>
    </MainLayout>
  );
};

export default Settings;
