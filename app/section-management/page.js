"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import Dropdown from "@/components/General/Dropdown";
// import CreateSemesterForm from "@/components/Forms/CreateForms/CreateSemesterForm";
import AddCourseToSemesterForm from "@/components/Forms/UpdateForms/AddCourseToSemesterForm";
import { useMajor } from "@/components/General/MajorProvider";
import AddInstructorToCourseForm from "@/components/Forms/UpdateForms/AddInstructorToCourseForm";
import CreateSectionForm from "@/components/Forms/CreateForms/CreateSectionForm";
import DynamicCreateForm from "@/components/Forms/CreateForms/DynamicCreateForm";
// import SemesterSectionList from "@/components/SemesterComponents/SemesterSectionList";
// import SemesterCourseList from "@/components/SemesterComponents/SemesterCourseList";
// import SemesterInstructorList from "@/components/SemesterComponents/SemesterInstructorList";
import DynamicSemesterInfoList from "@/components/DynamicSemesterInfoList";
import { semesterFormConfig } from "../config/formConfig";
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

  const instructorColumns = [
    { key: 'name', header: 'Name' },
    { key: 'teachableCourses', header: 'Teachable Courses', render: (item) => item.teachableCourses.map((course) => course.identifyCode).join(", ") },
    { key: 'maxCourse', header: 'Max Courses' },
    { key: 'preferenceTime', header: 'Preference Time', render: (item) => item.preferenceTime.join(", ") },
    { key: 'instructorType', header: 'Instructor Type' },
  ];

  const courseColumns = [
    { key: 'identifyCode', header: 'Identify Code' },
    // Assuming teachableInstructors is an array of instructor names
    { key: 'teachableInstructors', header: 'Teachable Instructors', render: (item) => item.teachableInstructors.map(instructor => instructor.name).join(", ") },
    // Assuming semesters is an array of semester terms
    { key: 'semesters', header: 'Available Semesters', render: (item) => item.semesters.map(semester => semester.term).join(", ") },
  ];

  const sectionColumns = [
    { key: 'courseCode', header: 'Course Code' },
    { key: 'professor', header: 'Professor' },
    { key: 'lab', header: 'Lab', render: (item) => item.lab ? "Yes" : "No" },
    { key: 'duration', header: 'Duration', render: (item) => `${item.duration} minutes` },
    { key: 'registrationCode', header: 'Registration Code' },
    { key: 'students', header: 'Number of Students' },
  ];
  


  const renderActiveTab = () => {
    switch (activeTab) {
      case "createSemester":
        return <DynamicCreateForm {...semesterFormConfig} />;
      
      case "addCourseToSemester":
        return <AddCourseToSemesterForm />;
      case "addInstructorToCourses":
        return <AddInstructorToCourseForm/>;
      case "courseList":
        return <DynamicSemesterInfoList ListType="courses" ListColumns={courseColumns}/>;
      case "instructorList":
        return   <DynamicSemesterInfoList ListType="instructors" ListColumns={instructorColumns} />
        case "createSection":
          return <CreateSectionForm/>;
      case "sectionInfo":
        return <DynamicSemesterInfoList ListType="sections" ListColumns={sectionColumns}/>;
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
                className={tabClass("createSection")}
                onClick={() => setActiveTab("createSection")}
              >
                Create Section
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
