import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔹 Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav
      className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400
                 bg-[length:200%_200%] animate-gradient
                 shadow-lg px-6 py-3 fixed top-0 left-0 w-full z-51"
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto object-contain drop-shadow-sm"
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 font-medium">
          <span
            onClick={() => navigate("/courses")}
            className="text-gray-800 hover:text-orange-700 cursor-pointer transition"
          >
            Courses
          </span>

          <span
            onClick={() => navigate("/blogs")}
            className="text-gray-800 hover:text-orange-700 cursor-pointer transition"
          >
            Blogs
          </span>
        </div>

        {/* DESKTOP AUTH */}
        <div className="hidden md:flex items-center">
          {!token && (
            <div
              onClick={() => navigate("/login")}
              className="bg-orange-600 text-white px-5 py-2 rounded-full
                         cursor-pointer hover:bg-orange-700 transition shadow-md"
            >
              Login
            </div>
          )}

          {token && (
            <div className="relative" ref={profileRef}>
              {/* Avatar */}
              <div
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-orange-600 overflow-hidden
                           cursor-pointer ring-2 ring-white shadow"
              >
                <img
                  src={user.Image}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dropdown */}
              {open && (
                <div
                  className="absolute right-0 mt-3 w-44 bg-white shadow-xl
                             rounded-lg border overflow-hidden"
                >
                  <div
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                  >
                    Profile
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-red-50 text-red-600
                               cursor-pointer transition"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* HAMBURGER */}
        <div
          className="md:hidden text-3xl cursor-pointer text-gray-800"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setOpen(false);
          }}
        >
          ☰
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="md:hidden mt-4 flex flex-col gap-4
                     bg-amber-200/90 backdrop-blur
                     p-5 rounded-xl shadow-lg"
        >
          <span
            onClick={() => {
              navigate("/courses");
              setMenuOpen(false);
            }}
            className="text-gray-800 hover:text-orange-700 cursor-pointer transition"
          >
            Courses
          </span>

          <span
            onClick={() => {
              navigate("/blogs");
              setMenuOpen(false);
            }}
            className="text-gray-800 hover:text-orange-700 cursor-pointer transition"
          >
            Blogs
          </span>

          {!token && (
            <div
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="bg-orange-600 text-white px-5 py-2 rounded-full
                         cursor-pointer hover:bg-orange-700 transition
                         w-fit shadow"
            >
              Login
            </div>
          )}

          {token && (
            <>
              <div
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="px-4 py-2 bg-white rounded-lg cursor-pointer shadow-sm"
              >
                Profile
              </div>
              <div
                onClick={handleLogout}
                className="px-4 py-2 bg-white rounded-lg
                           text-red-600 cursor-pointer shadow-sm"
              >
                Logout
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
