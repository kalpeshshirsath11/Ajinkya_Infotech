import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "Write. Share. Inspire.",
    desc: "Publish your thoughts and reach readers worldwide.",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipN5qFrr1A5hItfNc3Wqs7G0k2TQC7C4ztxfD6sq=s1360-w1360-h1020-rw",
  },
  {
    title: "Tech, Stories & Ideas",
    desc: "A platform built for developers and creators.",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMguVdU0JhQYHgLXu_r1tIv5pHRPeF5Kj8y6DJO=s1360-w1360-h1020-rw",
  },
  {
    title: "Your Voice Matters",
    desc: "Start blogging today and grow your audience.",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipOpPLbrPC3ZVnJbwcFF9ceO1T6Kfigt8vhz6_xf=s1360-w1360-h1020-rw",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO CAROUSEL */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* SLIDES */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-20" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/30 z-30"></div>

        {/* CONTENT */}
        <div className="relative z-40 flex h-full items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {slides[current].title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              {slides[current].desc}
            </p>
          </div>
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/40 px-3 py-2 rounded-full text-white hover:bg-black/60"
        >
          ‹
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() =>
            setCurrent((prev) => (prev + 1) % slides.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/40 px-3 py-2 rounded-full text-white hover:bg-black/60"
        >
          ›
        </button>
      </div>
    </>
  );
}

export default Hero;
