import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className='flex justify-between items-center bg-black text-white p-4'>
      <h1 className='text-xl font-bold'>VoxIndia - AI Content Creator</h1>
      <ul className='flex items-center'>
        {Cookies.get("token") ? (
          <li>
            <button
              onClick={handleLogout}
              className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300'
            >
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
