"use client";
import { useSearchParams } from "next/navigation";
import { MajorProvider, useMajor } from "../../components/MajorProvider";
import majorData from "@/data/majordata";
import { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
const MajorOverview = () => {
  const { setMajor } = useMajor();
  const searchParams = useSearchParams();
  const majorName = searchParams.get("major");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [availableTerms, setAvailableTerms] = useState([]);

  // Find the major by name
  const selectedMajor = majorData.find((m) => m.name === majorName);

  useEffect(() => {
    if (majorName) {
      setMajor(majorName);
    }

    // Extract unique terms from the selected major's semester data
    const terms = selectedMajor?.semester.map((semester) => semester.term);
    setAvailableTerms(terms || []);

    // Optionally, pre-select the first term
    if (terms && terms.length > 0) {
      setSelectedTerm(terms[0]);
    }
  }, [majorName, setMajor, selectedMajor]);

  // Filter courses by the selected term
  const filteredCourses =
    selectedMajor?.semester.find((semester) => semester.term === selectedTerm)
      ?.courses || [];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {selectedMajor ? (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{`Major Overview for ${selectedMajor.name}`}</h1>
              <div>
                <label htmlFor="term-select" className="mr-2">
                  Select Term:
                </label>
                <select
                  id="term-select"
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm"
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                >
                  {availableTerms.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6">
              <h1 className="text-xl font-bold">Semester Planning</h1>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 border-b-2">Course ID</th>
                    <th className="p-4 border-b-2">Title</th>
                    <th className="p-4 border-b-2">Day</th>
                    <th className="p-4 border-b-2">Time</th>
                    <th className="p-4 border-b-2">Classroom</th>
                    <th className="p-4 border-b-2">Instructor</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="p-4 border-b">{course.id}</td>
                      <td className="p-4 border-b">{course.title}</td>
                      <td className="p-4 border-b">{course.day}</td>
                      <td className="p-4 border-b">{course.time}</td>
                      <td className="p-4 border-b">{course.classroom}</td>
                      <td className="p-4 border-b">{course.instructor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Major not found.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default MajorOverview;
