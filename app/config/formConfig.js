import * as Yup from "yup";

export const programFormConfig = {
  formTitle: "Create Program",
  initialValues: {
    title: "",
  },
  validationSchema: Yup.object({
    title: Yup.string().required("Program title is required"),
  }),
  fields: [{ name: "title", type: "text", label: "Program Title" }],
  apiEndpoint: "/api/program/create",
  successMessage: "Program created successfully!",
  errorMessage: "Error creating program. Please try again.",
};

export const courseFormConfig = {
  formTitle: "Create Course",
  initialValues: {
    identifyCode: "",
    maxSections: 1,
  },
  validationSchema: Yup.object({
    identifyCode: Yup.string().required("Identify code is required"),
    maxSections: Yup.number().required("Max sections are required").min(1),
  }),
  fields: [
    { name: "identifyCode", type: "text", label: "Identify Code" },
    { name: "maxSections", type: "number", label: "Max Sections" },
  ],
  apiEndpoint: "/api/course/create",
  successMessage: "Course created successfully!",
  errorMessage: "Error creating course. Please try again.",
};

export const instructorFormConfig = {
  formTitle: "Create Instructor",
  initialValues: {
    name: "",
    maxCourses: 1,
    // preferredTime: [],
    preferenceTime:"",
    preferenceDay:"",
  },
  validationSchema: Yup.object({
    name: Yup.string().required("Instructor name is required"),
    maxCourses: Yup.number().required("Max courses are required").min(1),

  }),
  fields: [
    { name: "name", type: "text", label: "Name" },
    { name: "maxCourses", type: "number", label: "Max Courses" },
    { name: "preferenceTime", type: "text", label: "Preference Time" },
    { name: "preferenceDay", type: "text", label: "Preference Day" },
    // { name: "preferenceDayValue", type: "text", label: "Preference Day" },
  ],
  apiEndpoint: "/api/instructor/create",
  successMessage: "Instructor created successfully!",
  errorMessage: "Error creating instructor. Please try again.",
};

export const semesterFormConfig = {
  formTitle: "Create Semester",
  initialValues: {
    term: "",
  },
  validationSchema: Yup.object({
    term: Yup.string().required("Semester term is required"),
  }),
  fields: [{ name: "term", type: "text", label: "Semester Term", placeholder: "e.g., Fall 2024" }],
  apiEndpoint: "/api/semester/create",
  successMessage: "Semester created successfully!",
  errorMessage: "Error creating semester. Please try again.",
};


export const addCourseToSemesterConfig = {
  formType: "AddCourseToSemester",
  fetchRelatedDataUrl: (semesterId) => `/api/semester/${semesterId}/courses`, // Adjust the endpoint as needed
  submitUrl: (semesterId) => `/api/semester/${semesterId}/addCourses`,
  relatedAvailableIds: (data)=> new Set(data.courses.map((c) => c._id)),
  filteredRelatedIds :(allCourses, semesterCoursesIds) => allCourses.filter(
    (course) => !semesterCoursesIds.has(course._id)
  ),
  filteredOptions : (availableCourses) => availableCourses.map((course) => ({
    value: course._id,
    label: course.identifyCode,
  })),
  dropdownType: "Semester",
  dropdownLabelProperty: "term",
  successMessage: "Courses added successfully to the semester!",
  errorMessage: "Error adding courses to semester.",
};

export const addInstructorToCourseConfig = {
  formType: "AddInstructorToCourse",
  fetchRelatedDataUrl: (courseId) => `/api/course/${courseId}/instructors`, // Adjust the endpoint as needed
  submitUrl: (courseId) => `/api/course/${courseId}/addInstructors`,
  relatedAvailableIds: (data)=> new Set(data.teachableInstructors.map((c) => c._id)),
  filteredRelatedIds :(instructors, courseInstructorId) => instructors.filter(
    (instructor) => !courseInstructorId.has(instructor._id)
  ),
  filteredOptions : (availableInstructors) => availableInstructors.map((instructor) => ({
    value: instructor._id,
    label: instructor.name,
  })),
  dropdownType: "Course",
  dropdownLabelProperty: "identifyCode",
  successMessage: "Instructors added successfully to the course!",
  errorMessage: "Error adding instructors to course.",
};
