// components/Navbar.js
"use client";
import Link from "next/link";
import { useMajor } from "@/components/MajorProvider";

const Nav = () => {
  const { major } = useMajor();
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link key={major} href="/" className="hover:text-gray-300">
          NEU
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link
            href="/course-management"
            className="hover:text-gray-300"
          >
            Course Management
          </Link>
          <Link href="/" className="hover:text-gray-300">
            Classroom Allocation
          </Link>
          <Link href="/" className="hover:text-gray-300">
            Master Schedule
          </Link>
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
