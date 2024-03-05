"use client";
import React from "react";
import MainLayout from "../MainLayout";
// import CreateProgramForm from "@/components/Forms/CreateForms/CreateProgramForm";
// import CreateCourseForm from "@/components/Forms/CreateForms/CreateCourseForm";
// import CreateInstructorForm from "@/components/Forms/CreateForms/CreateInstructorForm";
import UploadForm from "@/components/UploadForm";
import DynamicCreateForm from "@/components/Forms/CreateForms/DynamicCreateForm";
import {
  programFormConfig,
  courseFormConfig,
  instructorFormConfig,
} from "../config/formConfig";
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
            <DynamicCreateForm
              {...programFormConfig}
              onFormSubmitted={afterCreateProgram}
            />

            <DynamicCreateForm {...courseFormConfig} />
            <UploadForm
              formText="Courses"
              errorFormText="courses"
              apiRoute="/api/course/import"
              HeaderFormat="(Please follow the header format xxx)"
            />
          </div>
          <div className="flex-1 mb-8 md:mb-0 flex flex-col">
            <DynamicCreateForm {...instructorFormConfig} />
            <UploadForm
              formText="Instructors"
              errorFormText="instructors"
              apiRoute="/api/instructor/import"
              HeaderFormat="(Please follow the header format xxx)"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
