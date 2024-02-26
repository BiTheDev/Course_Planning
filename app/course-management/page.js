"use client";
import MainLayout from "../MainLayout";
import SemesterCourseList from "@/components/SemesterCourseList";
const CourseManagementPage = () => {

  return (
    <MainLayout>
      <div>
        <SemesterCourseList/>
      </div>
    </MainLayout>
  );
};

export default CourseManagementPage;
