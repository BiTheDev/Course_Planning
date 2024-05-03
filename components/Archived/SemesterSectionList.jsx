import React, { useEffect } from "react";
import { useMajor } from "../General/MajorProvider";

const SemesterSectionList = () => {
  const { semesterSections, fetchAllSections, deleteSection } = useMajor();
  const [editingSection, setEditingSection] = useState(null);

  useEffect(() => {
    fetchAllSections();
  }, []);

  const handleEdit = (section) => {
    setEditingSection(section);
  };

  const handleDelete = async (sectionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this section?"
    );
    if (confirmed) {
      try {
        // Perform delete logic here
        const success = await deleteSection(sectionId);
        if (success) {
          console.log("Section deleted successfully!");
        } else {
          console.error("Failed to delete section!");
        }
      } catch (error) {
        console.error("Error deleting section:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Sections Information</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Course Code
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Professor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lab
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Duration
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Registration Code
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Number of Students
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {semesterSections &&
              semesterSections.map((section) => (
                <tr key={section._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {section.courseCode}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {section.professor}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {section.lab ? "Yes" : "No"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {section.duration} minutes
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {section.registrationCode}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {section.students}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleEdit(section)}>Edit</button>
                    <button onClick={() => handleDelete(section._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {!semesterSections && (
        <div className="text-center py-4">
          <p className="text-gray-500">Loading sections...</p>
        </div>
      )}
      {semesterSections && semesterSections.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No sections found.</p>
        </div>
      )}
    </div>
  );
};

export default SemesterSectionList;
