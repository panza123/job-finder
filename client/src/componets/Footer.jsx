import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import navBar from './index';

const Footer = () => {
  return (
    <footer className="w-full bg-blue-600 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-4 md:space-y-0">
        {/* Logo Section */}
        <Link className="text-3xl font-bold text-white" to="/">
          Job Finder
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {navBar.map((nav,index) => (
            <Link
              to={nav.link}
              key={index}
              className="text-white hover:underline"
            >
              {nav.name}
            </Link>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 text-white text-xl">
          <Link to="/facebook" aria-label="Facebook">
            <FaFacebook className="hover:text-blue-300 transition duration-200" />
          </Link>
          <Link to="/twitter" aria-label="Twitter">
            <FaTwitter className="hover:text-blue-300 transition duration-200" />
          </Link>
          <Link to="/instagram" aria-label="Instagram">
            <FaInstagram className="hover:text-pink-400 transition duration-200" />
          </Link>
          <Link to="/linkedin" aria-label="LinkedIn">
            <FaLinkedin className="hover:text-blue-300 transition duration-200" />
          </Link>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-white mt-4 text-sm">
        &copy; {new Date().getFullYear()} Job Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
