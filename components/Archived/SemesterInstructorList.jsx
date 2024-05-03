import { useMajor } from "../General/MajorProvider";

const SemesterInstructorList = () => {
  const { instructors, deleteInstructor } = useMajor();
  const [editedInstructor, setEditedInstructor] = useState(null);

  const handleEdit = (instructor) => {
    setEditedInstructor(instructor);
  };

  const handleDelete = async (instructorId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this instructor?"
    );
    if (confirmed) {
      try {
        // Perform delete logic here
        const success = await deleteInstructor(instructorId);
        if (success) {
          console.log("Instructor deleted successfully!");
        } else {
          console.error("Failed to delete instructor!");
        }
      } catch (error) {
        console.error("Error deleting instructor:", error);
      }
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Instructors Information</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Teachable Courses
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Maximum Course
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Preference Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Instructor Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {instructors.map((instructor) => (
              <tr key={instructor._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {instructor.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {instructor.teachableCourses
                      .map((course) => course.identifyCode)
                      .join(", ")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {instructor.maxCourse}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {instructor.preferenceTime.join(", ")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {instructor.instructorType}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(instructor)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(instructor._id)}
                    className="text-red-600 hover:text-red-900 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {instructors.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No instructors found.</p>
        </div>
      )}
    </div>
  );
};

export default SemesterInstructorList;
