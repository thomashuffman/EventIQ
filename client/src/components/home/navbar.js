import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full fixed top-0 flex items-center justify-between p-5 bg-yellow-300 text-black z-10 shadow-lg">
      <div className="text-lg font-bold">EventIQ</div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </button>
      </div>
      <ul
        className={`md:flex md:space-x-6 absolute md:static left-0 w-full md:w-auto bg-yellow-300 md:bg-transparent transition-transform duration-300 ${
          isOpen ? "top-16" : "-top-48"
        }`}
      >
        <li className="text-center py-2 md:py-0">
          <Link to="/" className="block text-black">
            Home
          </Link>
        </li>
        <li className="text-center py-2 md:py-0">
          <Link to="/about" className="block text-black">
            About
          </Link>
        </li>
        <li className="text-center py-2 md:py-0">
          <Link to="/manage-groups" className="block text-black">
            Manage Groups
          </Link>
        </li>
        <li className="text-center py-2 md:py-0">
          <Link to="/contact" className="block text-black">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
