import { useRef, useEffect, useState } from "react";
import About from "../Components/About";
import Achievements from "../Components/Achievements";
import ContactUs from "../Components/ContactUs";
import Hero from "../Components/Hero";
import MiniHeroNav from "../Components/MiniHeroNav";

const Home = () => {
  const aboutRef = useRef(null);
  const achievementsRef = useRef(null);
  const contactRef = useRef(null);

  const [activeSection, setActiveSection] = useState("about");

  // Scroll functions
  const scrollToAbout = () =>
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });

  const scrollToAchievements = () =>
    achievementsRef.current?.scrollIntoView({ behavior: "smooth" });

  const scrollToContact = () =>
    contactRef.current?.scrollIntoView({ behavior: "smooth" });

  // 🔥 Scroll spy observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      {
        threshold: 0.4, // 40% visible = active
      }
    );

    const sections = [
      { ref: aboutRef, name: "about" },
      { ref: achievementsRef, name: "achievements" },
      { ref: contactRef, name: "contact" },
    ];

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <MiniHeroNav
          activeSection={activeSection}
          scrollToAbout={scrollToAbout}
          scrollToAchievements={scrollToAchievements}
          scrollToContact={scrollToContact}
        />
        <Hero />
      </section>

      {/* ABOUT */}
      <section ref={aboutRef} data-section="about">
        <About />
      </section>

      {/* ACHIEVEMENTS */}
      <section ref={achievementsRef} data-section="achievements">
        <Achievements />
      </section>

      {/* CONTACT */}
      <section ref={contactRef} data-section="contact">
        <ContactUs />
      </section>
    </>
  );
};

export default Home;
