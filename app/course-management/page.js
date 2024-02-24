"use client";
import MainLayout from "../MainLayout";
import CourseList from "@/components/CourseList";
const CourseManagementPage = () => {

  return (
    <MainLayout>
      <div>
        <CourseList/>
      </div>
    </MainLayout>
  );
};

export default CourseManagementPage;
