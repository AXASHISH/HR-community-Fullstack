import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TARoundtable from "./TARoundtable";
import AppFooter from "./Footer";
import AboutCommunitySection from "./About";
import Activity from "../components/Home/Activity";
import KeyHilight from "./Keyhilight";
import MissionVision from "../components/Home/MissionVision";
import CommunityFooter from "../components/CommunityFooter";
import MemberFeatures from "../components/Home/MemberFeatures";

const Home = () => {
  const location = useLocation();
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Background images configuration
  const backgroundImages = {
    hero: [
      {
        desktop: "/carosal_bg_1.jpeg",
        tablet: "/carosal_bg_1.jpeg",
        mobile: "/carosal_bg_1.jpeg",
      },
      {
        desktop: "/carosal_bg_2.jpeg",
        tablet: "/carosal_bg_2.jpeg",
        mobile: "/carosal_bg_2.jpeg",
      },
      {
        desktop: "/carosal_bg_3.jpeg",
        tablet: "/carosal_bg_3.jpeg",
        mobile: "/carosal_bg_3.jpeg",
      }
    ]
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

  // Scroll to section on route change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  // Hero image cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % backgroundImages.hero.length);
    }, 5000);
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

  // CountdownTimer component
  const CountdownTimer = ({ className }) => (
    <div className={className}>
      <div className="bg-white/10 backdrop-blur-sm py-4 px-4 md:py-6 md:px-6 rounded-2xl shadow-xl max-w-sm md:max-w-lg mx-auto">
        <div className="flex justify-center space-x-2 md:space-x-3">
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-2xl xl:text-3xl font-bold text-[#F47B34]">
              {timeLeft.days.toString().padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-600">DAYS</span>
          </div>
          <span className="text-xl md:text-2xl xl:text-3xl font-bold text-[#1161A0]">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-2xl xl:text-3xl font-bold text-[#F47B34]">
              {timeLeft.hours.toString().padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-600">HOURS</span>
          </div>
          <span className="text-xl md:text-2xl xl:text-3xl font-bold text-[#1161A0]">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-2xl xl:text-3xl font-bold text-[#F47B34]">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-600">MINUTES</span>
          </div>
          <span className="text-xl md:text-2xl xl:text-3xl font-bold text-[#1161A0]">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-2xl xl:text-3xl font-bold text-[#F47B34]">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-600">SECONDS</span>
          </div>
        </div>
        <p className="mt-3 text-sm font-semibold text-[#1161A0] text-center md:block hidden">
          September 19, 2025
        </p>
      </div>
      <p className="mt-3 text-sm font-semibold text-[#1161A0] text-center md:hidden">
        September 19, 2025
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HERO SECTION - Modern Carousel */}
      <header 
        className="relative w-full h-[50vh] max-h-[50vh] overflow-hidden rounded-b-[2.5rem] shadow-[0_35px_90px_rgba(0,0,0,0.22)]"
      >
        {/* Carousel Container */}
        <div className="relative w-full h-full bg-[#071828]">
          {/* Render all hero images with smooth transitions */}
          {backgroundImages.hero.map((imageSet, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                currentHeroImage === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              {/* Desktop Hero Image */}
              <img
                src={imageSet.desktop}
                alt={`Carousel Slide ${index + 1}`}
                className="hidden lg:block w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Tablet Hero Image */}
              <img
                src={imageSet.tablet}
                alt={`Carousel Slide ${index + 1} Tablet`}
                className="hidden md:block lg:hidden w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Mobile Hero Image */}
              <img
                src={imageSet.mobile}
                alt={`Carousel Slide ${index + 1} Mobile`}
                className="block md:hidden w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>

          {/* Left Navigation Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 group"
            aria-label="Previous slide"
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/15 hover:bg-white/30 backdrop-blur-md rounded-full transition-all duration-300 group-hover:scale-110 active:scale-95 shadow-lg border border-white/20">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 group"
            aria-label="Next slide"
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/15 hover:bg-white/30 backdrop-blur-md rounded-full transition-all duration-300 group-hover:scale-110 active:scale-95 shadow-lg border border-white/20">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>

          {/* Modern Indicator Dots */}
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
            {backgroundImages.hero.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentHeroImage(index);
                  setIsAutoPlay(false);
                }}
                className="group relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={`transition-all duration-500 rounded-full ${
                  currentHeroImage === index
                    ? "w-10 sm:w-12 h-2.5 sm:h-3 bg-[#F47B34] shadow-lg"
                    : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/50 hover:bg-white/80"
                }`}></div>
              </button>
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-6 sm:top-8 right-6 sm:right-8 z-30">
            <div className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white/15 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
              <p className="text-white text-xs sm:text-sm font-semibold">
                <span className="text-[#F47B34]">{currentHeroImage + 1}</span>
                <span className="text-white/70"> / {backgroundImages.hero.length}</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN SECTIONS */}
      <main className="flex-1 w-full mt-8 md:mt-12 pb-8">
       <div className="w-full bg-white dark:bg-gray-900 py-20 px-2 md:px-4 lg:px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:items-stretch">
    <div id="About" className="flex flex-col">
      <AboutCommunitySection />
    </div>
    <div id="mission-vision" className="border-l-4 border-brand_blue pl-6 flex flex-col justify-between">
      <MissionVision />
    </div>
  </div>
</div>


        <div className="pt-20">
          <MemberFeatures />
        </div>
        <div className="pt-20">
          <KeyHilight />
        </div>
        <div id="Activity" className="pt-20">
          <Activity />
        </div>
        <div id="TARoundtable" className="mt-10">
          <TARoundtable />
        </div>
      </main>
      <CommunityFooter />
    </div>
  );
};

export default Home;
