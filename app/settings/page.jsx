"use client";
import React from "react";
import MainLayout from "../MainLayout";
import CreateProgramForm from "@/components/Forms/CreateProgramForm";
import CreateCourseForm from "@/components/Forms/CreateCourseForm";
import UploadCourseFileForm from "@/components/Forms/UploadCourseFileForm";
import UploadInstructorFileForm from "@/components/Forms/UploadInstructorFileForm";
import CreateInstructorForm from "@/components/Forms/CreateInstructorForm";

const Settings = () => {
  const afterCreateProgram = async () => {
    // Fetch programs again to get the updated list including the newly created one
    const response = await fetch("/api/program");
    const data = await response.json();
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex-1 mb-8 md:mb-0">
            <CreateProgramForm onProgramCreated={afterCreateProgram} />
            <CreateCourseForm />
            <UploadCourseFileForm />
          </div>
          {/* Group ProgramDropdown and CreateSemesterForm together in a flex column */}
          <div className="flex-1 mb-8 md:mb-0 flex flex-col">
          <CreateInstructorForm />
          <UploadInstructorFileForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
