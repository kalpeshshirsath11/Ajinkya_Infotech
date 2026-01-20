import { useState, useEffect } from "react";

const MiniHeroNav = ({
  scrollToAbout,
  scrollToAchievements,
  scrollToContact,
  activeSection,
}) => {
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // opacity on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBgColor = (key) => {
    if (activeSection === key) return "bg-orange-600/90";
    if (hovered === key) return "bg-orange-500/80";
    return "bg-orange-400/60";
  };

  return (
    <div
      className={`
        fixed top-20 left-1/2 -translate-x-1/2 z-50
        transition-all duration-500
        ${scrolled ? "opacity-80 scale-95" : "opacity-100 scale-100"}
      `}
    >
      <div
        className="
          flex gap-3 px-4 py-2 rounded-full
          bg-orange-400/30
          backdrop-blur-lg
          border border-white/30
          shadow-lg shadow-orange-400/30
        "
      >
        {/* ABOUT */}
        <button
          onMouseEnter={() => setHovered("about")}
          onMouseLeave={() => setHovered(null)}
          onClick={scrollToAbout}
          className={`px-5 py-1.5 rounded-full text-sm font-medium text-white transition-all duration-300 ${getBgColor("about")}`}
        >
          About Us
        </button>

        {/* ACHIEVEMENTS */}
        <button
          onMouseEnter={() => setHovered("achievements")}
          onMouseLeave={() => setHovered(null)}
          onClick={scrollToAchievements}
          className={`px-5 py-1.5 rounded-full text-sm font-medium text-white transition-all duration-300 ${getBgColor("achievements")}`}
        >
          Achievements
        </button>

        {/* CONTACT */}
        <button
          onMouseEnter={() => setHovered("contact")}
          onMouseLeave={() => setHovered(null)}
          onClick={scrollToContact}
          className={`px-5 py-1.5 rounded-full text-sm font-medium text-white transition-all duration-300 ${getBgColor("contact")}`}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default MiniHeroNav;
