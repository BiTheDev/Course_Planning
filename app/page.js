import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
        <section className="text-center p-10">
          <h1 className="text-4xl font-bold">Northeastern University Course Scheduling System</h1>
        </section>
        <section className="p-10">
          <label htmlFor="college-select" className="block text-lg font-medium text-gray-700">Select a College:</label>
          <select id="college-select" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Please choose an option</option>
            {/* Dynamically generate <option> tags based on your data */}
          </select>
        </section>
        <section className="p-10">
          <h2 className="text-2xl font-semibold">User Manual & FAQ</h2>
          <div className="mt-4">
            <p><strong>How to use the app:</strong> Detailed user manual goes here.</p>
            <p><strong>FAQ:</strong> Frequently asked questions and answers.</p>
          </div>
        </section>
      </main>
  );
}
