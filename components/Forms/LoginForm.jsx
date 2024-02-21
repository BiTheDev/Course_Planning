"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import { useMajor } from "../MajorProvider";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const { updateAdmin } = useMajor();
  const router = useRouter();

  const onLogin = async (values) => {
    try {
      const response = await fetch("/api/admin/", {
        // Adjust the URL to match your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Login failed:", data.error);
        // Handle login failure (e.g., show an error message to the user)
        return false;
      }

      console.log("Login successful:", data.admin);
      // You can do something with the admin data here, like storing it in context or session
      return true;
    } catch (error) {
      console.error("Login error:", error);
      // Handle network or other unexpected errors
      return false;
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={{ username: "" }}
        onSubmit={async (values, actions) => {
            console.log(values);
          const loginSuccess = await onLogin(values); // Await the login logic
          if (loginSuccess) {
            updateAdmin(values); // Update admin state with username
            router.push("/program-selector"); // Redirect to major selector page
          } else {
            // Handle login failure (e.g., set error state, show message)
          }
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
