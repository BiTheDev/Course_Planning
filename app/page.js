import LoginForm from "@/components/Forms/LoginForm";
export default function Home() {
  // const [selectedMajor, setSelectedMajor] = useState("");
  // const { updateMajor } = useMajor();
  // const router = useRouter();

  // const handleMajorChange = (e) => {
  //   setSelectedMajor(e.target.value);
  // };

  // const goToMajorOverview = () => {
  //   updateMajor(selectedMajor);
  //   router.push("/major-overview");
  // };
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <section className="text-center p-10">
        <h1 className="text-4xl font-bold">
          Northeastern University Course Scheduling System
        </h1>
      </section>
      <section>
        <LoginForm />
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
    // <main className="min-h-screen flex flex-col justify-center items-center">
    //   <section className="text-center p-10">
    //     <h1 className="text-4xl font-bold">
    //       Northeastern University Course Scheduling System
    //     </h1>
    //   </section>
    //   <section className="p-10">
    //     <label
    //       htmlFor="major-select"
    //       className="block text-lg font-medium text-gray-700"
    //     >
    //       Select a Major:
    //     </label>
    //     <select
    //       id="major-select"
    //       value={selectedMajor}
    //       onChange={handleMajorChange}
    //       className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //     >
    //       <option value="">Please choose an option</option>
    //       {majorData.map((major) => (
    //         <option key={major.id} value={major.name}>
    //           {major.name}
    //         </option>
    //       ))}
    //     </select>
    //     <button
    //       onClick={goToMajorOverview}
    //       disabled={!selectedMajor}
    //       className={`mt-4 px-4 py-2 rounded ${
    //         selectedMajor
    //           ? "bg-blue-500 text-white"
    //           : "bg-gray-500 text-gray-300"
    //       }`} // Conditional styling based on whether a major is selected
    //     >
    //       View Major Overview
    //     </button>
    //   </section>
    //   <section className="p-10">
    //     <h2 className="text-2xl font-semibold">User Manual & FAQ</h2>
    //     <div className="mt-4">
    //       <p>
    //         <strong>How to use the app:</strong> Detailed user manual goes here.
    //       </p>
    //       <p>
    //         <strong>FAQ:</strong> Frequently asked questions and answers.
    //       </p>
    //     </div>
    //   </section>
    // </main>
  );
}
