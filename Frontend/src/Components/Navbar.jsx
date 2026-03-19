import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image.png";
import { useTranslation } from "react-i18next";
import { FaBookOpen, FaBlog } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { t, i18n } = useTranslation();

  // Close dropdown on outside click
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
    <nav className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400
                    bg-[length:200%_200%] animate-gradient
                    shadow-lg px-6 py-3 fixed top-0 left-0 w-full z-50">

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

        {/* 🔥 PREMIUM MENU */}
        <div className="hidden md:flex items-center gap-10 text-lg font-semibold">

          {/* Courses */}
          <div
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 cursor-pointer
                       text-gray-900 transition duration-300
                       hover:text-orange-600 hover:scale-105
                       relative group"
          >
            <FaBookOpen className="text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(255,115,0,0.8)] transition" />

            <span className="font-bold tracking-wide">
              {t("courses")}
            </span>

            <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-orange-500 
                             transition-all duration-300 group-hover:w-full
                             shadow-[0_0_10px_rgba(255,115,0,0.7)]"></span>
          </div>

          {/* Blogs */}
          <div
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 cursor-pointer
                       text-gray-900 transition duration-300
                       hover:text-orange-600 hover:scale-105
                       relative group"
          >
            <FaBlog className="text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(255,115,0,0.8)] transition" />

            <span className="font-bold tracking-wide">
              {t("blogs")}
            </span>

            <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-orange-500 
                             transition-all duration-300 group-hover:w-full
                             shadow-[0_0_10px_rgba(255,115,0,0.7)]"></span>
          </div>

        </div>

        {/* 🔥 RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">

          {/* Language */}
          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "mar" : "en")
            }
            className="bg-white text-gray-800 px-3 py-1 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            {i18n.language === "en" ? "🇮🇳 मराठी" : "🇬🇧 EN"}
          </button>

          {/* Auth */}
          {!token && (
            <div
              onClick={() => navigate("/login")}
              className="bg-orange-600 text-white px-5 py-2 rounded-full
                         cursor-pointer hover:bg-orange-700 transition shadow-md"
            >
              {t("login")}
            </div>
          )}

          {token && (
            <div className="relative" ref={profileRef}>
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

              {open && (
                <div className="absolute right-0 mt-3 w-44 bg-white shadow-xl
                                rounded-lg border overflow-hidden">
                  <div
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                  >
                    {t("profile")}
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-red-50 text-red-600
                               cursor-pointer transition"
                  >
                    {t("logout")}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
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
        <div className="md:hidden mt-4 flex flex-col gap-4
                        bg-amber-200/90 backdrop-blur
                        p-5 rounded-xl shadow-lg">

          <div onClick={() => navigate("/courses")} className="cursor-pointer">
            📚 {t("courses")}
          </div>

          <div onClick={() => navigate("/blogs")} className="cursor-pointer">
            📝 {t("blogs")}
          </div>

          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "mar" : "en")
            }
            className="bg-orange-600 text-white px-3 py-1 rounded-full w-fit"
          >
            {i18n.language === "en" ? "🇮🇳 मराठी" : "🇬🇧 EN"}
          </button>

          {!token ? (
            <div
              onClick={() => navigate("/login")}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              {t("login")}
            </div>
          ) : (
            <>
              <div onClick={() => navigate("/profile")} className="cursor-pointer">
                {t("profile")}
              </div>
              <div onClick={handleLogout} className="text-red-600 cursor-pointer">
                {t("logout")}
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;