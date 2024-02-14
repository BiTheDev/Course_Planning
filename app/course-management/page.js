import { useState, useEffect } from 'react';

const CourseManagementPage = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses data from the server or database
  useEffect(() => {
    // Make an API call to fetch the courses data
    // Update the state with the fetched courses
    const fetchData = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  const handleCourseScheduling = (newCourse) => {
    // Send the newCourse data to the server or database for scheduling
    // Update the state with the updated list of courses
    setCourses([...courses, newCourse]);
  };

  return (
    <div>
      <h1>Course Management</h1>
      {/* Display current course schedule */}
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>

      {/* Create Course Form */}
      <CreateCourseForm onCourseScheduling={handleCourseScheduling} />
    </div>
  );
};

export default CourseManagementPage;