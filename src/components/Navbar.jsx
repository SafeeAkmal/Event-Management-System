import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link className="text-xl font-bold tracking-tight" to="/events">
          EventHub
        </Link>

        <div className="flex items-center space-x-6">
          <Link className="hover:text-indigo-200 transition" to="/events">
            Explore Events
          </Link>

          {currentUser ? (
            <>
              <Link className="hover:text-indigo-200 transition" to="/my-events">
                My Events
              </Link>
              <div className="flex items-center space-x-3 border-l border-indigo-400 pl-4">
                <span className="text-sm font-medium">Hello, {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-700 hover:bg-indigo-800 text-xs px-3 py-1.5 rounded transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3 border-l border-indigo-400 pl-4">
              <Link className="text-sm hover:text-indigo-200 transition" to="/login">
                Log In
              </Link>
              <Link className="bg-white text-indigo-600 hover:bg-indigo-50 text-sm font-medium px-3 py-1.5 rounded shadow transition" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;