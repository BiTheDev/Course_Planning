"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMajor } from "@/components/MajorProvider";
import majorData from "@/data/majordata";
import MainLayout from "../MainLayout";
const ProgramSelector = () => {
  const [selectedMajor, setSelectedMajor] = useState("");
  const { updateMajor, admin } = useMajor();
  const router = useRouter();

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  const goToMajorOverview = () => {
    updateMajor(selectedMajor);
    router.push("/major-overview");
  };
  return (
    <MainLayout>
      {admin && (
        <div className="my-4">
          <p>Welcome, {admin.username}!</p>{" "}
          {/* Assuming 'admin' is a string like the username. Adjust if 'admin' is an object. */}
        </div>
      )}
      <section className="p-10">
        <label
          htmlFor="major-select"
          className="block text-lg font-medium text-gray-700"
        >
          Select a Major:
        </label>
        <select
          id="major-select"
          value={selectedMajor}
          onChange={handleMajorChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Please choose an option</option>
          {majorData.map((major) => (
            <option key={major.id} value={major.name}>
              {major.name}
            </option>
          ))}
        </select>
        <button
          onClick={goToMajorOverview}
          disabled={!selectedMajor}
          className={`mt-4 px-4 py-2 rounded ${
            selectedMajor
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-gray-300"
          }`} // Conditional styling based on whether a major is selected
        >
          View Major Overview
        </button>
      </section>
    </MainLayout>
  );
};

export default ProgramSelector;
