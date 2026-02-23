import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ---------- DATA (JSON) ---------- */
const achievementsData = [
  {
    subject: "Industry-Oriented Training",
    content:
      "Our courses are designed to meet real-world industry requirements, helping students gain hands-on experience and job-ready skills.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  },
  {
    subject: "Experienced Trainers",
    content:
      "Learn from highly experienced trainers who bring deep industry knowledge and mentorship into every session.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978"
  },
  {
    subject: "Student Success Stories",
    content:
      "Hundreds of students have successfully started their IT careers through our structured training and placement guidance.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
  }
];

/* ---------- COMPONENT ---------- */
export default function Achievements() {
  const sectionRefs = useRef([]);
  const [visibleItems, setVisibleItems] = useState([]);

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
  }, []);

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
          Our Achievements
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Achievement Blocks */}
      <div className="max-w-6xl mx-auto px-6">
        {achievementsData.map((item, index) => {
          const reverse = index % 2 !== 0;
          const isVisible = visibleItems.includes(index);

          return (
            <div
              key={index}
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
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="md:w-1/2"
              >
                <h3 className="text-2xl font-semibold text-orange-600 mb-4">
                  {item.subject}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.content}
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
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="md:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={item.image}
                    alt={item.subject}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
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
