"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import SemesterCourseList from "@/components/SemesterCourseList";
import Dropdown from "@/components/Dropdown";
import CreateSemesterForm from "@/components/Forms/CreateSemesterForm";
import AddCourseToSemesterForm from "@/components/Forms/AddCourseToSemesterForm";
import SemesterInstructorList from "@/components/SemesterInstructorList"; // Step 1
import { useMajor } from "@/components/MajorProvider";
import AddInstructorToCourseForm from "@/components/Forms/AddInstructorToCourseForm";
import '../custom.css';

const SectionManagement = () => {
  const { updateProgram, program, fetchSemesterOnProgram } =
    useMajor();
  const [programs, setPrograms] = useState([]);
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
        return <AddCourseToSemesterForm />;
        case "addInstructorToCourses":
        return <AddInstructorToCourseForm/>;
        case "createSection":
        return <p>Create section form goes here</p>;
      case "courseList":
        return <p>course list</p>;
      case "sectionInfo":
        return <p>section info</p>;
      case "instructorList": 
        return <SemesterInstructorList />; 

      default:
        return null;
    }
  };

  const tabClass = (tabName) => 
    `tab-button rounded-xl ${activeTab === tabName ? "active" : ""}`;

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
            <div className="tabs">
              <button
                className={tabClass("createSemester")}
                onClick={() => setActiveTab("createSemester")}
              >
                Create Semester
              </button>
              <button
                className={tabClass("addCourseToSemester")}
                onClick={() => setActiveTab("addCourseToSemester")}
              >
                Add Courses To Semester
              </button>
              <button
                className={tabClass("addInstructorToCourses")}
                onClick={() => setActiveTab("addInstructorToCourses")}
              >
                Add Instructor To Courses
              </button>
              <button
                className={tabClass("createSection")}
                onClick={() => setActiveTab("createSection")}
              >
                Create Section
              </button>
              <button
                className={tabClass("courseList")}
                onClick={() => setActiveTab("courseList")}
              >
                Course List
              </button>
              <button 
                className={tabClass("instructorList")} 
                onClick={() => setActiveTab("instructorList")} 
              >
                Instructor List
              </button>
              <button
                className={tabClass("sectionInfo")}
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
