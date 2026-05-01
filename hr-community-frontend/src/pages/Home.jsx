import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TARoundtable from "./TARoundtable";
import AppFooter from "./Footer";
import AboutCommunitySection from "./About";
import Activity from "../components/Home/Activity";
import KeyHilight from "./Keyhilight";
import MissionVision from "../components/Home/MissionVision";
import CommunityFooter from "../components/CommunityFooter";

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
        desktop: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754375337/Community_1024_2_v638gw.png",
        tablet: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754375337/Community_1024_2_v638gw.png",
        mobile: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754402461/Community_424_2_epx41n.png",
      },
      {
        desktop: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754462259/SUMMIT_rqs69t.png",
        tablet: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754465673/SUMMIT_600px_jrrjv4.pnghttps://res.cloudinary.com/dleznkbgs/image/upload/v1754120366/Untitled_design_20250802_130231_0000_hwppm9.png",
        mobile: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754465650/SUMMIT_424_cqzbdc.png",
      },
      {
        desktop: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754370859/HR_Excellence_1024_j7wt5b.png",
        tablet: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754468085/HR_Excellence_600_orkngx.png",
        mobile: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754468069/HR_Excellence_424_dfkwza.png",
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
      {/* HERO SECTION - Replaced with HeroSection component functionality */}
      <header className="relative min-h-[70vh] w-full overflow-hidden">
        <div className="absolute -top-28 inset-0 w-full h-screen">
          {/* Render all hero images with transitions */}
          {backgroundImages.hero.map((imageSet, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-screen transition-opacity duration-1000  ${
                currentHeroImage === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Desktop Hero Image (lg and above) */}
              <img
                src={imageSet.desktop}
                alt={`EduSkills Summit Background ${index + 1}`}
                className="hidden lg:block w-full h-full object-contain object-center"
                loading={index === 0 ? "eager" : "lazy"}
                style={{ imageRendering: "crisp-edges" }}
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
