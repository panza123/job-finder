import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider.jsx';
import { axiosInstance } from '../lib/axiosInstance.js';
import toast from 'react-hot-toast';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa'; // Importing icons for the hamburger menu and user profile
import navBar from './index.js';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    axiosInstance.post('/logout')
      .then(res => {
        setUser(null);
        navigate('/login');
        toast.success('Logged out successfully');
        setProfileDropdown(false); // Close dropdown on logout
        console.log('User logged out');
      })
      .catch(err => {
        console.log('Error logging out:', err);
        toast.error('Logout failed. Please try again.');
      });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  return (
    <header className='bg-blue-700 p-4 shadow-lg'>
      <div className='flex justify-between items-center'>
        <Link className='text-3xl font-extrabold text-white' to={'/'}>Job Finder</Link>
        <div className='md:hidden'>
          <button onClick={toggleMobileMenu} className='text-white'>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className='hidden md:block'>
          <ul className='flex items-center space-x-6'>
            {navBar.map((nav, index) => (
              <li key={index}>
                <NavLink
                  to={nav.link}
                  className={({ isActive }) =>
                    isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                  }
                >
                  {nav.name}
                </NavLink>
              </li>
            ))}
            {/* Profile Section */}
            {user && ( // Check if user is logged in
              <li className='relative'>
                <button
                  onClick={toggleProfileDropdown}
                  className='flex items-center text-white focus:outline-none'
                >
                  <FaUserCircle size={24} className='mr-2' />
                  {user.name || "Profile"}
                </button>
                {profileDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-blue-800 rounded-lg shadow-lg p-2'>
                    <NavLink
                      to='/profile'
                      className='block px-4 py-2 text-white hover:bg-blue-700'
                      onClick={() => setProfileDropdown(false)} // Close dropdown on link click
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={(e) => {
                        handleLogout(e);
                        setProfileDropdown(false); // Close dropdown after logout
                      }}
                      className='block w-full text-left px-4 py-2 text-white hover:bg-blue-700'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
            {!user && ( // Show Login link if user is not logged in
              <li>
                <NavLink to='/login' className='text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition'>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile menu display */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-blue-800 p-4'>
          <ul className='flex flex-col space-y-2'>
            {navBar.map((nav, index) => (
              <li key={index}>
                <NavLink
                  to={nav.link}
                  className={({ isActive }) =>
                    isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'
                  }
                  onClick={toggleMobileMenu} // Close menu on link click
                >
                  {nav.name}
                </NavLink>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <NavLink to='/profile' className='text-white' onClick={toggleMobileMenu}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={(e) => {
                      handleLogout(e);
                      toggleMobileMenu(); // Close menu after logout
                    }}
                    className='w-full text-left px-4 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-500 transition'
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to='/login' className='w-full text-left bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition' onClick={toggleMobileMenu}>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
