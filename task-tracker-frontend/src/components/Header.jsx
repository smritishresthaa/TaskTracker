import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowConfirm(false);
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Tracker</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'underline text-blue-300' : 'hover:underline'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'underline text-blue-300' : 'hover:underline'
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setShowConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center w-80">
            <p className="text-lg font-semibold mb-4 text-gray-800">
              Do you really want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
