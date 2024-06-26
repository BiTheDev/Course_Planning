"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import Dropdown from "@/components/General/Dropdown";
// import AddCourseToSemesterForm from "@/components/Forms/UpdateForms/AddCourseToSemesterForm";
import { useMajor } from "@/components/General/MajorProvider";
// import AddInstructorToCourseForm from "@/components/Forms/UpdateForms/AddInstructorToCourseForm";
import UploadForm from "@/components/UploadForm";
import CreateSectionForm from "@/components/Forms/CreateForms/CreateSectionForm";
import DynamicCreateForm from "@/components/Forms/CreateForms/DynamicCreateForm";
import DynamicSemesterInfoList from "@/components/DynamicSemesterInfoList";
import DynamicAddToForm from "@/components/Forms/UpdateForms/DynamicAddToForm";
import {
  semesterFormConfig,
  addCourseToSemesterConfig,
  addInstructorToCourseConfig,
} from "../config/formConfig";
import {
  instructorColumns,
  courseColumns,
  sectionColumns,
} from "../config/columnConfig";
import "../custom.css";

const SectionManagement = () => {
  const {
    updateProgram,
    program,
    fetchSemesterOnProgram,
    fetchAllCourses,
    semesters,
    fetchSectionsOnSemester,
    updateSemester,
    semester,
  } = useMajor();
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

  const handleSemesterChange = (selectedSemesterId) => {
    console.log(selectedSemesterId);
    if (selectedSemesterId != "") {
      const selectedSemester = semesters.find(
        (p) => p._id === selectedSemesterId
      );
      console.log(selectedSemester);
      updateSemester(selectedSemester);
      fetchSectionsOnSemester(selectedSemesterId);
    }
  };

  // const renderActiveTab = () => {
  //   switch (activeTab) {
  //     case "createSemester":
  //       return <DynamicCreateForm {...semesterFormConfig} />;

  //     case "addCourseToSemester":
  //       return <DynamicAddToForm {...addCourseToSemesterConfig} />;
  //     case "addInstructorToCourse":
  //       return <DynamicAddToForm {...addInstructorToCourseConfig} />;
  //     case "courseList":
  //       return (
  //         <DynamicSemesterInfoList
  //           ListType="courses"
  //           ListColumns={courseColumns}
  //         />
  //       );
  //     case "instructorList":
  //       return (
  //         <DynamicSemesterInfoList
  //           ListType="instructors"
  //           ListColumns={instructorColumns}
  //         />
  //       );
  //     case "createSection":
  //       return <CreateSectionForm />;

  //     case "sectionInfo":
  //       return (
  //         <DynamicSemesterInfoList
  //           ListType="sections"
  //           ListColumns={sectionColumns}
  //         />
  //       );
  //     default:
  //       return null;
  //   }
  // };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4">
        {/*---------------upload sections from CSV button--------------*/}
        {/*---------------filters for sections----------------------*/}
        <Dropdown
          data={programs}
          selectedData={program}
          onDataChange={handleProgramChange}
          dropDownType="Program"
          labelProperty="title"
        />
        {/*---------------upload sections from CSV button--------------*/}
        {program && (
          <Dropdown
            data={semesters}
            selectedData={semester}
            onDataChange={handleSemesterChange}
            dropDownType="Semester"
            labelProperty="term"
          />
        )}
        {semester && (
          <>
            <UploadForm
              formText="Section"
              errorFormText="sections"
              apiRoute="/api/section/import"
              HeaderFormat="(Please follow the header format xxx)"
            />
            <DynamicSemesterInfoList
              ListType="semesterSections"
              ListColumns={sectionColumns}
            />
          </>
        )}

        {/*---------------create a section--------------*/}
        {/* <CreateSectionForm/> */}

        {/*---------------sections list----------------------*/}

        {/*---------------UPDATE and DELETE button for each item in the list--------------*/}

        {/*  {program && (*/}
        {/*    <>*/}
        {/*      <div className="tabs">*/}

        {/*        <button*/}
        {/*            className={tabClass("createSemester")}*/}
        {/*            onClick={() => setActiveTab("createSemester")}*/}
        {/*        >*/}
        {/*          Create Semester*/}
        {/*        </button>*/}

        {/*        <button*/}
        {/*            className={tabClass("addCourseToSemester")}*/}
        {/*            onClick={() => setActiveTab("addCourseToSemester")}*/}
        {/*        >*/}
        {/*          Add Courses To Semester*/}
        {/*        </button>*/}

        {/*        <button*/}
        {/*            className={tabClass("addInstructorToCourse")}*/}
        {/*            onClick={() => setActiveTab("addInstructorToCourse")}*/}
        {/*        >*/}
        {/*          Add Instructor To Courses*/}
        {/*        </button>*/}

        {/*        <button*/}
        {/*            className={tabClass("courseList")}*/}
        {/*            onClick={() => setActiveTab("courseList")}*/}
        {/*        >*/}
        {/*          Course List*/}

        {/*        </button>*/}
        {/*        <button*/}
        {/*            className={tabClass("instructorList")}*/}
        {/*            onClick={() => setActiveTab("instructorList")}*/}
        {/*        >*/}
        {/*          Instructor List*/}
        {/*        </button>*/}
        {/*        <button*/}
        {/*            className={tabClass("createSection")}*/}
        {/*            onClick={() => setActiveTab("createSection")}*/}
        {/*        >*/}
        {/*          Create Section*/}
        {/*        </button>*/}
        {/*        <button*/}
        {/*            className={tabClass("sectionInfo")}*/}
        {/*            onClick={() => setActiveTab("sectionInfo")}*/}
        {/*        >*/}
        {/*          Section Info*/}
        {/*        </button>*/}
        {/*      </div>*/}
        {/*      <div className="tab-content">{renderActiveTab()}</div>*/}
        {/*    </>*/}
        {/*)}*/}
      </div>
    </MainLayout>
  );
};

export default SectionManagement;
