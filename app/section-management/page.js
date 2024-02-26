"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import SemesterCourseList from "@/components/SemesterCourseList";
import Dropdown from "@/components/Dropdown";
import CreateSemesterForm from "@/components/Forms/CreateSemesterForm";
import AddCourseToSemesterForm from "@/components/Forms/AddCourseToSemesterForm";
import { useMajor } from "@/components/MajorProvider";

const SectionManagement = () => {
  const { updateProgram, program, semesters, fetchSemesterOnProgram } =
    useMajor();
  const [programs, setPrograms] = useState([]);
  const [showCreateSemesterForm, setShowCreateSemesterForm] = useState(false);
  const [activeTab, setActiveTab] = useState("createSemester");

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await fetch("/api/program");
      const data = await response.json();
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  const handleProgramChange = (selectedProgramId) => {
    if (selectedProgramId != "") {
      const selectedProgram = programs.find((p) => p._id === selectedProgramId);
      console.log(selectedProgram);
      updateProgram(selectedProgram);
      fetchSemesterOnProgram(selectedProgram._id);
      // Reset CreateSemesterForm visibility when program changes
      setShowCreateSemesterForm(false);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "createSemester":
        return (
          <CreateSemesterForm
            programs={programs}
            selectedProgram={program}
            handleProgramChange={handleProgramChange}
          />
        );
      case "addCourseToSemester":
        return <AddCourseToSemesterForm semesters={semesters} />;
      case "courseList":
        return <p>course list</p>;
      case "sectionInfo":
        return <p>section info</p>;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4">
        <Dropdown
          data={programs}
          selectedData={program}
          onDataChange={handleProgramChange}
          dropDownType="Program"
          labelProperty="title"
        />
        {program && (
          <>
            <div className="flex justify-between">
              <button
                className="tab-button rounded-xl"
                onClick={() => setActiveTab("createSemester")}
              >
                Create Semester
              </button>
              <button
                className="tab-button rounded-xl"
                onClick={() => setActiveTab("addCourseToSemester")}
              >
                Add Courses To Semester
              </button>
              <button
                className="tab-button rounded-xl"
                onClick={() => setActiveTab("courseList")}
              >
                Course List
              </button>
              <button
                className="tab-button rounded-xl"
                onClick={() => setActiveTab("sectionInfo")}
              >
                Section Info
              </button>
            </div>
            <div className="tab-content">{renderActiveTab()}</div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default SectionManagement;
