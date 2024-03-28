// components/Navbar.js
"use client";
import Link from "next/link";
import { useMajor } from "@/components/General/MajorProvider";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { major, admin, updateAdmin } = useMajor();
  const router = useRouter();
  const handleLogout = () => {
    updateAdmin(null); // Clear the admin state
    localStorage.removeItem("admin"); // Clear admin info from localStorage if used for persistence
    router.push("/"); // Redirect to the login page or home page after logout
  };
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link key={major} href="/" className="hover:text-gray-300">
          NEU
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/schedule-management" className="hover:text-gray-300">
            Schedule Management
          </Link>
          {admin && (
            <Link href="/section-management" className="hover:text-gray-300">
              Section Management
            </Link>
          )}
          {admin && (
            <Link href="/instructor-management" className="hover:text-gray-300">
              Instructor Management
            </Link>
          )}

          {/*<Link href="/master-schedule" className="hover:text-gray-300">*/}
          {/*  Master Schedule*/}
          {/*</Link>*/}

          {admin && (
            <Link href="/course-management" className="hover:text-gray-300">
              Course Management
            </Link>
          )}

          {admin && (
            <Link href="/classroom-overview" className="hover:text-gray-300">
              Classroom Overview
            </Link>
          )}

          {admin && (
            <Link href="/settings" className="hover:text-gray-300">
              Settings
            </Link>
          )}
          {admin && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          )}
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden text-xl">
          {/* Icon or text to indicate menu expansion */}
          <span>&#9776;</span>{" "}
          {/* This is a simple text representation of a hamburger menu */}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
