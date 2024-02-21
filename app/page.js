import LoginForm from "@/components/Forms/LoginForm";
export default function Home() {
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
  );
}
