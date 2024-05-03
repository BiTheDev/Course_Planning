"use client";
import { useEffect } from "react";

import { useMajor } from "../General/MajorProvider";

const SemesterCourseList = () => {
  const { allCourses, fetchAllCourses, deleteCourse } = useMajor();
  const [editedCourse, setEditedCourse] = useState(null);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const handleEdit = (course) => {
    // Set the course to be edited in the state
    setEditedCourse(course);
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmed) {
      try {
        // Perform delete logic here
        const success = await deleteCourse(courseId);
        if (success) {
          console.log("Course deleted successfully!");
        } else {
          console.error("Failed to delete course!");
        }
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Courses Information</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Identify Code
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Course Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Associated Programs
              </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Teachable Instructors
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Available Semesters
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allCourses.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {course.identifyCode}
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {course.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {course.programs.map((program) => program.title).join(", ")}
                  </div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {course.teachableInstructors
                      ?.map((instructor) => instructor.name)
                      .join(", ")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {course.semesters
                      ?.map((semester) => semester.term)
                      .join(", ")}
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button onClick={() => handleEdit(course)} className="text-indigo-600 hover:text-indigo-900">
              Edit
            </button>
          </td> */}
                <td>
                  <button onClick={() => handleEdit(course)}>Edit</button>
                  <button onClick={() => handleDelete(course._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {allCourses.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No courses found.</p>
        </div>
      )}
    </div>
  );
};

export default SemesterCourseList;
