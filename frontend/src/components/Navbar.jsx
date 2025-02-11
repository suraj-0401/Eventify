import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from '../assets/logo.png'
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const navigate = useNavigate();
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isQuizzesDropdownOpen, setIsQuizzesDropdownOpen] = useState(false);

  useEffect(() => {
    setCourseId(localStorage.getItem("courseId"));
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleCoursesDropdown = () => {
    setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
    // Close the quizzes dropdown if it's open
    if (isQuizzesDropdownOpen) {
      setIsQuizzesDropdownOpen(false);
    }
  };

  const toggleQuizzesDropdown = () => {
    setIsQuizzesDropdownOpen(!isQuizzesDropdownOpen);
    // Close the courses dropdown if it's open
    if (isCoursesDropdownOpen) {
      setIsCoursesDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const storedUser = localStorage.getItem("user");
  const user1 = storedUser ? JSON.parse(storedUser) : null;
  const userId = user1 ? user1._id : null;

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      <Link
  to="/"
  className="hidden lg:flex items-center text-2xl font-bold hover:text-gray-300 transition duration-300"
>
  <img src={logo} alt="logo" />
</Link>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Home Link */}
          <Link
            to="/"
            className="hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>

          {/* Courses Menu */}
          <div className="relative">
            <button
              onClick={toggleCoursesDropdown}
              className="hover:text-gray-300 transition duration-300"
            >
              Events
            </button>
            {isCoursesDropdownOpen && (
              <div className="absolute bg-blue-700 text-white shadow-lg mt-2 p-4 rounded">
                <Link
                  to="/events"
                  className="block py-2 hover:text-gray-300 transition duration-300"
                >
                  All Events
                </Link>
                {user && user.isAdmin && (
                  <>
                    <Link
                      to="/events/create"
                      className="block py-2 hover:text-blue-200"
                    >
                      Create Events
                    </Link>
                    <Link
                      to="/events/myevents"
                      className="block py-2 hover:text-blue-200"
                    >
                      Manage Events
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

         

          {/* User Authentication (Login/Logout) */}
          {user ? (
            <>
              <span className="text-gray-200">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700 p-4">
          <Link to="/" className="block py-2 hover:text-gray-300">
            Home
          </Link>
          <Link to="/courses" className="block py-2 hover:text-gray-300">
            Events
          </Link>


          {user ? (
            <>
              <span className="block py-2 text-gray-200">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 hover:text-gray-300">
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
