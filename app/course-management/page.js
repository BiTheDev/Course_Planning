"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../MainLayout";
import {courseColumns} from "@/app/config/columnConfig";
import DynamicSemesterInfoList from "@/components/DynamicSemesterInfoList";
import {addCourseToSemesterConfig, courseFormConfig} from "@/app/config/formConfig";
import DynamicAddToForm from "@/components/Forms/UpdateForms/DynamicAddToForm";
import DynamicCreateForm from "@/components/Forms/CreateForms/DynamicCreateForm";
import UploadForm from "@/components/UploadForm";
const CourseManagementPage = () => {
  const [instructors, setInstructors] = useState([]);

  // Fetch instructors data from the server or database
  useEffect(() => {
    // Make an API call to fetch the instructors data
    // Update the state with the fetched instructors
    const fetchData = async () => {
      try {
        const response = await fetch("/api/instructors");
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
        {/*------------------create a course----------------*/}
        <DynamicCreateForm {...courseFormConfig} />
        {/*<DynamicAddToForm {...addCourseToSemesterConfig} />*/}

        {/*------------------upload courses from CSV----------------*/}
        <UploadForm
            formText="Courses"
            errorFormText="courses"
            apiRoute="/api/course/import"
            HeaderFormat="(Please follow the header format xxx)"
        />
        {/*------------------Add course to semester form----------------*/}
        <div className="container px-20 text-2xl font-semibold mb-4">
          Add Course to Semester
        </div>
        <DynamicAddToForm {...addCourseToSemesterConfig} />;

        {/*------------------courses list----------------*/}
        <DynamicSemesterInfoList
            ListType="courses"
            ListColumns={courseColumns}
        />
        {/*------------------delete and update button for each course----------------*/}

      </div>
    </MainLayout>
  );
};

export default CourseManagementPage;
