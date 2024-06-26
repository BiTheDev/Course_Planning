export const instructorColumns = [
    { key: "name", header: "Name" },
    // {
    //   key: "teachableCourses",
    //   header: "Teachable Courses",
    //   render: (item) =>
    //     item.teachableCourses.map((course) => course.identifyCode).join(", "),
    // },
    // { key: "maxCourse", header: "Max Courses" },
    // {
    //   key: "preferenceTime",
    //   header: "Preference Time",
    //   render: (item) => item.preferenceTime.join(", "),
    // },
    // { key: "instructorType", header: "Instructor Type" },
  ];

  export const courseColumns = [
    { key: "identifyCode", header: "Identify Code" },
    // Assuming teachableInstructors is an array of instructor names
    {
      key: "teachableInstructors",
      header: "Teachable Instructors",
      render: (item) =>
        item.teachableInstructors
          .map((instructor) => instructor.name)
          .join(", "),
    },
    // Assuming semesters is an array of semester terms
    {
      key: "semesters",
      header: "Available Semesters",
      render: (item) =>
        item.semesters.map((semester) => semester.term).join(", "),
    },
    {
      key: "actions", header: "Actions",
      deleteUrl: (courseId) => `/api/course/${courseId}/delete`
    }
  ];

  export const sectionColumns = [
    { key: "courseCode", header: "Course Code" },
    { key: "courseTitle", header: "Course Title" },
    { key: "professor", header: "Professor" },
    { key: "pref_time", header: "Preference Time" },
    { key: "pref_day", header: "Preference Day" },
    { key: "lab", header: "Lab", render: (item) => (item.lab ? "Yes" : "No") },
    {
      key: "duration",
      header: "Duration",
      render: (item) => `${item.duration} minutes`,
    },
    { key: "registrationCode", header: "CRN" },
    { key: "students", header: "Capacity" },
  ];