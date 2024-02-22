"use client";
import CreateCourseForm from "@/components/Forms/CreateCourseForm";
import MainLayout from "../MainLayout";
import CourseList from "@/components/CourseList";
const CourseManagementPage = () => {

  return (
    <MainLayout>
      <div>
        {/* Display current course schedule */}
        <CourseList/>

        {/* Create Course Form */}
        <CreateCourseForm  />
      </div>
    </MainLayout>
  );
};

export default CourseManagementPage;
