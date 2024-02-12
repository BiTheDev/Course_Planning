"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import majorData from "@/data/majordata";

export default function Home() {
const [selectedMajor, setSelectedMajor] = useState('');
  const router = useRouter();

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  const goToMajorOverview = () => {
    router.push(`/major-overview?major=${selectedMajor}`);
  };
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <section className="text-center p-10">
        <h1 className="text-4xl font-bold">
          Northeastern University Course Scheduling System
        </h1>
      </section>
      <section className="p-10">
        <label htmlFor="major-select" className="block text-lg font-medium text-gray-700">Select a Major:</label>
        <select id="major-select" value={selectedMajor} onChange={handleMajorChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black">
          <option value="">Please choose an option</option>
          {majorData.map((major) => (
            <option key={major.id} value={major.name}>{major.name}</option>
          ))}
        </select>
        <button onClick={goToMajorOverview} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">View Major Overview</button>
      </section>
      <section className="p-10">
        <h2 className="text-2xl font-semibold">User Manual & FAQ</h2>
        <div className="mt-4">
          <p>
            <strong>How to use the app:</strong> Detailed user manual goes here.
          </p>
          <p>
            <strong>FAQ:</strong> Frequently asked questions and answers.
          </p>
        </div>
      </section>
    </main>
  );
}
