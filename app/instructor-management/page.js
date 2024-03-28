"use client";
import React, { useState, useEffect } from "react";
import InstructorUpdateForm from "@/components/Forms/UpdateForms/InstructorUpdateForm";
import CreateInstructorForm from "@/components/Archived/CreateInstructorForm";
import MainLayout from "../MainLayout";
import DynamicCreateForm from "@/components/Forms/CreateForms/DynamicCreateForm";
import {addInstructorToCourseConfig, instructorFormConfig} from "@/app/config/formConfig";
import DynamicSemesterInfoList from "@/components/DynamicSemesterInfoList";
import UploadForm from "@/components/UploadForm";
import { instructorColumns } from "../config/columnConfig";
const InstructorManagementPage = () => {
  const [instructors, setInstructors] = useState([]);

  // Fetch instructors data from the server or database
  useEffect(() => {
    // Make an API call to fetch the instructors data
    // Update the state with the fetched instructors
    const fetchData = async () => {
      try {
        const response = await fetch("/api/instructor");
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchData();
  }, []);

  const handleInstructorUpdate = (updatedInstructor) => {
    // Send the updatedInstructor data to the server or database for updating
    // Update the state with the updated list of instructors
    const updatedInstructors = instructors.map((instructor) => {
      if (instructor.id === updatedInstructor.id) {
        return updatedInstructor;
      }
      return instructor;
    });
    setInstructors(updatedInstructors);
  };

  const handleInstructorAddition = (newInstructor) => {
    // Send the newInstructor data to the server or database for addition
    // Update the state with the updated list of instructors
    setInstructors([...instructors, newInstructor]);
  };

  return (
    <MainLayout>
      <div>
        {/* -----------------Create new Instructor------------- */}
        <div className="flex-1 mb-8 md:mb-0 flex flex-col">
          <DynamicCreateForm {...instructorFormConfig} />

          {/* ----------------upload Instructors from CSV------------- */}
          <UploadForm
              formText="Instructors"
              errorFormText="instructors"
              apiRoute="/api/instructor/import"
              HeaderFormat="(Please follow the header format xxx)"
          />
        </div>

        {/*---------------instructors list----------------*/}
        <DynamicSemesterInfoList
            ListType="instructors"
            ListColumns={instructorColumns}
          />

        {/*--------------- DELETE button and an UPDATE button for each instructor---------*/}
        {/*<InstructorUpdateForm onInstructorUpdate={handleInstructorUpdate}/>*/}
      </div>
    </MainLayout>
  );
};

export default InstructorManagementPage;
