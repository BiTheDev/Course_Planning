import * as Yup from 'yup';

export const programFormConfig = {
 formTitle: "Create Program",
  initialValues: {
    title: '',
  },
  validationSchema: Yup.object({
    title: Yup.string().required('Program title is required'),
  }),
  fields: [
    { name: 'title', type: 'text', label: 'Program Title' },
  ],
  apiEndpoint: '/api/program/create',
  successMessage: 'Program created successfully!',
  errorMessage: 'Error creating program. Please try again.'
};

export const courseFormConfig = {
    formTitle: "Create Course",
  initialValues: {
    identifyCode: '',
    maxSections: 1,
  },
  validationSchema: Yup.object({
    identifyCode: Yup.string().required('Identify code is required'),
    maxSections: Yup.number().required('Max sections are required').min(1),
  }),
  fields: [
    { name: 'identifyCode', type: 'text', label: 'Identify Code' },
    { name: 'maxSections', type: 'number', label: 'Max Sections' },
  ],
  apiEndpoint: '/api/course/create',
  successMessage: 'Course created successfully!',
  errorMessage: 'Error creating course. Please try again.'
};

export const instructorFormConfig = {
    formTitle: "Create Instructor",
  initialValues: {
    name: '',
    maxCourses: 1,
    preferredTime: [],
  },
  validationSchema: Yup.object({
    name: Yup.string().required('Instructor name is required'),
    maxCourses: Yup.number().required('Max courses are required').min(1),
  }),
  fields: [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'maxCourses', type: 'number', label: 'Max Courses' },
  ],
  apiEndpoint: '/api/instructor/create',
  successMessage: 'Instructor created successfully!',
  errorMessage: 'Error creating instructor. Please try again.'
};
