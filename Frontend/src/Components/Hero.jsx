import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";



function Hero() {
  
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  //  Get user role
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role) {
        setRole(user.role);
      }
    } catch {
      setRole(null);
    }
  }, []);

  //  Fallback slides
  const fallbackSlides = [
    {
      title: t("hero.slide1.title"),
      desc: t("hero.slide1.description"),
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlNt7J5MMNQ4N5JPnd37yQAYEGdrqCcd9CVw&s",
    },
    {
      title: t("hero.slide2.title"),
      desc: t("hero.slide2.description"),
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyujvSqfbywxCBFmpHTsD8Ei1hxOfqmp9yVQ&s",
    },
    {
      title: t("hero.slide3.title"),
      desc: t("hero.slide3.description"),
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ54t6rExzKBfJlLLAL5_PAjE4A2RtvBfzaA&s",
    },
  ];

  //  Fetch slides
  const fetchSlides = async () => {
    try {
      const res = await api.get("/api/hero/active");

      if (res.data && res.data.length > 0) {
        const sorted = res.data.sort(
          (a, b) => a.displayOrder - b.displayOrder
        );

        setSlides(
          sorted.map((s) => ({
            title: s.title,
            desc: s.description,
            image: s.imageUrl,
          }))
        );
      } else {
        setSlides(fallbackSlides);
      }
    } catch (err) {
      console.error(err);
      setSlides(fallbackSlides);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  //  Auto slide
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <p className="text-gray-500">Loading Hero...</p>
      </div>
    );
  }

  //  Role-based button
  const getButton = () => {
    if (role === "ADMIN") {
      return {
        text: "Admin Dashboard",
        action: () => navigate("/admindashboard"),
      };
    }
    if (role === "STUDENT") {
      return {
        text: "Check Courses",
        action: () => navigate("/checkcourses"),
      };
    }
    if (role === "TEACHER") {
      return {
        text: "My Blogs",
        action: () => navigate("/myblogs"),
      };
    }
    return null;
  };

  const button = getButton();

  return (
    <div className="relative w-full h-[600px] overflow-hidden">

      {/*  LOGGED IN → CLEAN UI */}
      {role ? (
        <div className="flex flex-col items-center justify-center h-full 
                        bg-gradient-to-r from-orange-100 to-amber-100 text-center px-4">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome back 👋
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Continue your journey with Ajinkya Infotech
          </p>

          {button && (
            <button
              onClick={button.action}
              className="bg-orange-500 hover:bg-orange-600 text-white 
                         px-6 py-3 rounded-full text-lg font-semibold 
                         shadow-md transition hover:scale-105"
            >
              {button.text}
            </button>
          )}
        </div>
      ) : (
        <>
          {/*  SLIDER (ONLY FOR GUEST) */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100 z-20" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 z-30"></div>

          {/* CONTENT */}
          <div className="relative z-40 flex h-full items-center justify-center text-center px-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {slides[current]?.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-6">
                {slides[current]?.desc}
              </p>
            </div>
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={() =>
              setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/40 px-3 py-2 rounded-full text-white hover:bg-black/60"
          >
            ‹
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() =>
              setCurrent((prev) => (prev + 1) % slides.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/40 px-3 py-2 rounded-full text-white hover:bg-black/60"
          >
            ›
          </button>

          {/* DOTS */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2 z-50">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  i === current ? "bg-orange-500" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Hero;