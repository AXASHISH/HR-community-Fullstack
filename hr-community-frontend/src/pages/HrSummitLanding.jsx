import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import EduSkillsAboutSection from "./EduSkillsSummit";
import FocusArea from "../components/Awards/FocusArea";
import EventHighlight from "../components/Awards/EventHighlight";
import AppFooter from "./Footer";
import AgendaRibbon from "../components/AgendaRibbon";
import { Section } from "lucide-react";
import NominationButton from "../components/NominationButton";
import PersonCards from "../components/Home/Guest";
import { Speaker } from "lucide-react";
import Speakers from "../components/Home/Speakers";
import SupportedBy from "../components/SuportedBy";

const EduSkillsLanding = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0); // New state for hero image cycling
  const [isVisible, setIsVisible] = useState({});
  const [imageLoaded, setImageLoaded] = useState({
    hero: false,
    about: false,
    focus: false,
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const testimonials = [
    {
      text: "EduSkills Foundation has been instrumental in bridging the gap between industry requirements and academic preparation.",
      author: "Industry Leader",
    },
    {
      text: "The initiatives by EduSkills have transformed how we approach skill development in our institution.",
      author: "Academic Head",
    },
    {
      text: "A remarkable platform that truly understands the future of workforce development.",
      author: "HR Director",
    },
  ];

  // Updated background images configuration with multiple hero images
  const backgroundImages = {
    hero: [
      {
        desktop: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754462259/SUMMIT_rqs69t.png",
        tablet: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754465673/SUMMIT_600px_jrrjv4.png",
        mobile: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754465650/SUMMIT_424_cqzbdc.png",
      },
      {
        desktop: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754370859/HR_Excellence_1024_j7wt5b.png",
        tablet: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754468085/HR_Excellence_600_orkngx.png",
        mobile: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754468069/HR_Excellence_424_dfkwza.png",
      }
    ],
    about: {
      desktop: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      mobile: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    focus: {
      desktop: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      mobile: "https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentHeroImage((prev) => 
      prev === 0 ? backgroundImages.hero.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentHeroImage((prev) => (prev + 1) % backgroundImages.hero.length);
  };

  // Hero image cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % backgroundImages.hero.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Countdown timer calculation
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2025-09-19T00:00:00");
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
    

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Helper function to handle image load
  const handleImageLoad = (section) => {
    setImageLoaded((prev) => ({ ...prev, [section]: true }));
  };
   useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        // Add a slight delay to ensure rendering is complete
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // Scroll to top when no hash is present
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-hidden">
      {/* Hero Section with Scrolling Images */}
      <header className="relative min-h-[75vh] w-full overflow-hidden">
        <div className="absolute -top-28 inset-0 w-full h-screen">
          {/* Render all hero images with transitions */}
          {backgroundImages.hero.map((imageSet, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                currentHeroImage === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Desktop Hero Image (lg and above) */}
              <img
                src={imageSet.desktop}
                alt={`EduSkills Summit Background ${index + 1}`}
                className="hidden lg:block w-full h-full object-contain object-center"
                loading={index === 0 ? "eager" : "lazy"}
                style={{ imageRendering: "crisp-edges"  }}
              />

              {/* Tablet Hero Image (md to lg) */}
              <img
                src={imageSet.tablet}
                alt={`EduSkills Summit Background Tablet ${index + 1}`}
                className="hidden md:block lg:hidden w-full h-full object-contain object-center"
                loading={index === 0 ? "eager" : "lazy"}
                style={{ imageRendering: "crisp-edges" }}
              />

              {/* Mobile Hero Image (below md) */}
              <img
                src={imageSet.mobile}
                alt={`EduSkills Summit Background Mobile ${index + 1}`}
                className="block md:hidden w-full h-full object-contain object-center"
                loading={index === 0 ? "eager" : "lazy"}
                style={{ imageRendering: "crisp-edges" }}
              />
            </div>
          ))}

          {/* Fallback background color */}
          <div className="absolute inset-0 bg-[#1161A0] -z-10"></div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 z-20">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="group bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            aria-label="Previous image"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="group bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
            aria-label="Next image"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Countdown Timer - Only show on first image (Desktop) */}
        {currentHeroImage === 0 && (
          <div className="hidden lg:block absolute top-[65%] left-8 xl:left-[25%] z-20 transition-opacity duration-500">
            <div className="bg-white/10 backdrop-blur-sm py-6 px-6 rounded-2xl shadow-xl max-w-sm">
              <div className="flex justify-center space-x-2">
                <div className="flex flex-col items-center">
                  <span className="text-2xl xl:text-3xl font-bold text-[#F47B34]">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">DAYS</span>
                </div>
                <span className="text-2xl xl:text-3xl font-bold text-[#1161A0]">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl xl:text-3xl font-bold text-[#F47B34]">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">HOURS</span>
                </div>
                <span className="text-2xl xl:text-3xl font-bold text-[#1161A0]">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl xl:text-3xl font-bold text-[#F47B34]">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">MINUTES</span>
                </div>
                <span className="text-2xl xl:text-3xl font-bold text-[#1161A0]">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl xl:text-3xl font-bold text-[#F47B34]">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">SECONDS</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Countdown Timer - Only show on first image (Tablet) */}
        {currentHeroImage === 0 && (
          <div className="hidden md:block lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 w-full px-4 transition-opacity duration-500">
            <div className="bg-white/10 backdrop-blur-sm py-4 px-6 rounded-2xl shadow-xl max-w-lg mx-auto">
              <div className="flex justify-center space-x-3">
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#F47B34]">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">DAYS</span>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-[#1161A0]">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#F47B34]">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">HOURS</span>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-[#1161A0]">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#F47B34]">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">MINUTES</span>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-[#1161A0]">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-[#F47B34]">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">SECONDS</span>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-[#1161A0] text-center">
                September 19, 2025
              </p>
            </div>
          </div>
        )}

        {/* Countdown Timer - Only show on first image (Mobile) */}
        {currentHeroImage === 0 && (
          <div className="block md:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 w-full px-4 transition-opacity duration-500">
            <div className="bg-white/10 backdrop-blur-sm py-4 px-4 rounded-2xl shadow-xl max-w-sm mx-auto">
              <div className="flex justify-center space-x-2">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[#F47B34]">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">DAYS</span>
                </div>
                <span className="text-xl font-bold text-[#1161A0]">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[#F47B34]">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">HOURS</span>
                </div>
                <span className="text-xl font-bold text-[#1161A0]">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[#F47B34]">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">MINUTES</span>
                </div>
                <span className="text-xl font-bold text-[#1161A0]">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold text-[#F47B34]">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-gray-600">SECONDS</span>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-[#1161A0] text-center">
                September 19, 2025
              </p>
            </div>
          </div>
        )}

        {/* Image Indicators */}
        <div className="absolute bottom-24 md:bottom-32 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {backgroundImages.hero.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentHeroImage === index
                    ? "bg-[#F47B34] scale-110"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Rest of your sections remain the same */}
      <section
        id="about"
        className={`relative overflow-hidden transition-all duration-1000 ${
          isVisible.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <section>
          <div className="relative z-10">
            <NominationButton />
          </div>
        </section>
      </section>

      <section
        id="about"
        className={`relative py-5 overflow-hidden transition-all duration-1000 ${
          isVisible.about ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative z-10">
          <EduSkillsAboutSection />
        </div>
      </section>

      <section
        id="focusarea"
        className={`relative py-5 overflow-hidden transition-all duration-1000 ${
          isVisible.focusarea ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative z-10">
          <FocusArea />
        </div>
      </section>

      <div className="relative z-10">
        <AgendaRibbon />
      </div>

      <section className="py-5 bg-white relative z-10">
        <EventHighlight />
      </section>

      <section className="py-5 bg-white relative z-10">
        <PersonCards />
      </section>

      <section>
        <Speakers />
      </section>
      <section >
        <SupportedBy />
      </section>

      <AppFooter />
    </div>
  );
};

export default EduSkillsLanding;
