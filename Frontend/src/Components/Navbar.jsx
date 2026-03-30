import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image.png";
import { useTranslation } from "react-i18next";
import { FaBookOpen, FaBlog, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400
                    bg-[length:200%_200%] animate-gradient
                    shadow-lg px-6 py-3 fixed top-0 left-0 w-full z-51">

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

        {/* MENU */}
        <div className="hidden md:flex items-center gap-10 text-lg font-semibold">

          <div
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 cursor-pointer
                       text-gray-900 transition duration-300
                       hover:text-orange-600 hover:scale-105"
          >
            <FaBookOpen className="text-orange-500" />
            {t("courses")}
          </div>

          <div
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 cursor-pointer
                       text-gray-900 transition duration-300
                       hover:text-orange-600 hover:scale-105"
          >
            <FaBlog className="text-orange-500" />
            {t("blogs")}
          </div>
        </div>

        {/* RIGHT SIDE */}
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
          {!token ? (
            <div
              onClick={() => navigate("/login")}
              className="bg-orange-600 text-white px-5 py-2 rounded-full
                         cursor-pointer hover:bg-orange-700 transition shadow-md"
            >
              {t("login")}
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-full
                         bg-gradient-to-r from-red-500 to-red-600
                         text-white font-semibold shadow-md
                         hover:from-red-600 hover:to-red-700
                         hover:scale-105 transition duration-200"
            >
              <FaSignOutAlt />
              {t("logout")}
            </button>
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-red-500 text-white
                         hover:bg-red-600 transition"
            >
              <FaSignOutAlt />
              {t("logout")}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;