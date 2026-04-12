import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import api from "../api/axios";

export default function Achievements() {
  const { t, i18n } = useTranslation();

  const sectionRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [achievementsData, setAchievementsData] = useState([]);

  //  Fetch data
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get("/api/admin/achievements");
        console.log("API DATA:", res.data);
        setAchievementsData(res.data);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      }
    };

    fetchAchievements();
  }, []);

  //  Observe animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleItems((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [achievementsData]);

  //  Marathi fix (IMPORTANT)
  const currentLang = i18n.resolvedLanguage;
  const isMarathi = currentLang?.startsWith("mar");

  // Debug (optional)
  useEffect(() => {
    console.log("LANG:", i18n.language);
    console.log("RESOLVED:", currentLang);
  }, [i18n.language, currentLang]);

  return (
    <section className="w-full py-20 bg-gray-50">
      {/* Heading */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-orange-600">
          {t("achievements.heading")}
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Achievements */}
      <div className="max-w-6xl mx-auto px-6">
        {achievementsData.map((item, index) => {
          const reverse = index % 2 !== 0;
          const isVisible = visibleItems.includes(index);

          // ✅ Language switching
          const title = isMarathi
            ? item.titleM || item.title
            : item.title;

          const content = isMarathi
            ? item.contentM || item.content
            : item.content;

          // ✅ Image fix
          const imageUrl = item.image?.startsWith("http")
            ? item.image
            : `http://localhost:8080${item.image}`;

          return (
            <div
              key={item.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              data-index={index}
              className={`flex flex-col md:flex-row ${
                reverse ? "md:flex-row-reverse" : ""
              } items-center gap-10 mb-20`}
            >
              {/* Text */}
              <motion.div
                initial={{ x: reverse ? 60 : -60, opacity: 0 }}
                animate={
                  isVisible
                    ? { x: 0, opacity: 1 }
                    : { x: reverse ? 60 : -60, opacity: 0 }
                }
                transition={{ duration: 0.7 }}
                className="md:w-1/2"
              >
                <h3 className="text-2xl font-semibold text-orange-600 mb-4">
                  {title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {content}
                </p>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ x: reverse ? -60 : 60, opacity: 0 }}
                animate={
                  isVisible
                    ? { x: 0, opacity: 1 }
                    : { x: reverse ? -60 : 60, opacity: 0 }
                }
                transition={{ duration: 0.7 }}
                className="md:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}