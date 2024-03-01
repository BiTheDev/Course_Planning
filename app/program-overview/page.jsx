"use client";
import { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import { useMajor } from "@/components/General/MajorProvider";
import Dropdown from "@/components/General/Dropdown"; // Import the new component

const MajorOverview = () => {
  const { updateProgram, program, fetchSemesterOnProgram, semesters } =
    useMajor();
  const [programs, setPrograms] = useState([]);
  const [semester, setSemester] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await fetch("/api/program");
      const data = await response.json();
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  const handleProgramChange = (selectedProgramId) => {
    const selectedProgram = programs.find((p) => p._id === selectedProgramId);
    console.log(selectedProgram);
    updateProgram(selectedProgram);
    fetchSemesterOnProgram(selectedProgram._id);
  };

  const handleSemesterChange = (selectedSemesterId) => {
    console.log(selectedSemesterId);
  };


  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Dropdown
          data={programs}
          selectedData={program}
          onDataChange={handleProgramChange}
          dropDownType="Program"
          labelProperty="title"
        />

        {program && (
          <div>
            <p className="mb-4">
              You are currently viewing the program:{" "}
              <strong>{program.title}</strong>
            </p>
            <p className="mb-4">
              Please select a semester to view course details
            </p>
            <Dropdown
              data={semesters}
              selectedData={semester}
              onDataChange={handleSemesterChange}
              dropDownType="Semester"
              labelProperty="term"
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MajorOverview;
