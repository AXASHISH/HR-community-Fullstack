import React, { useState, useEffect } from "react";

const cards = [
  {
    icon: "K1.png",
    title: "Professional Development",
    description:
      "Offering curated learning opportunities to help members strengthen their expertise across functional domains of HR.",
  },
  {
    icon: "K2.png",
    title: "Future of Work, Workplace & Workforce",
    description:
      "Fostering awareness and strategic understanding of how technology, generational shifts, and global trends are reshaping the HR landscape.",
  },
  {
    icon: "k3.png",
    title: "Industry–Academia Collaboration",
    description:
      "Building strong bridges between corporate hiring strategies and academic training programs to develop a skill-ready talent pool.",
  },
  {
    icon: "K4.png",
    title: "Recognition & Benchmarking",
    description:
      "Celebrating HR excellence through national awards, recognizing best practices, and setting performance benchmarks for professionals and organizations.",
  },
  {
    icon: "K5.png",
    title: "Community Engagement",
    description:
      "Facilitating strategic dialogue through roundtables, podcast series, policy labs, and mentorship programs to drive collective impact.",
  },
];

function Card({ icon, title, description }) {
  return (
    <div className="bg-brand_blue rounded-xl shadow-lg py-8 px-2 flex flex-col items-center text-center text-white mx-3 min-w-[300px] max-w-[400px] w-full min-h-[300px] transition-transform duration-500 hover:scale-105">

      <div className="bg-orange-500 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        <img src={icon} alt={`${title} icon`} className="w-8 h-8" />
      </div>
      <h3 className="font-semibold text-md mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}

export default function KeyHilight() {
  const [current, setCurrent] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

 useEffect(() => {
  function handleResize() {
    if (window.innerWidth < 768) {
      setCardsToShow(1);
    } else {
      setCardsToShow(3); // changed from 2 to 3
    }
  }
  window.addEventListener("resize", handleResize);
  handleResize(); // Set initial value
  return () => window.removeEventListener("resize", handleResize);
}, []);


  // Get visible cards by count
  const getVisibleCards = () => {
    let shown = [];
    for (let i = 0; i < cardsToShow; i++) {
      shown.push(cards[(current + i) % cards.length]);
    }
    return shown;
  };

  const visibleCards = getVisibleCards();

  const nextCard = () => setCurrent((prev) => (prev + 1) % cards.length);
  const prevCard = () => setCurrent((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto px-2 sm:px-4">
      <h2 className="text-2xl text-brand_orange mb-6">Key Focus Area</h2>
      <div className="relative w-full flex items-center justify-center">
        {/* Prev Arrow */}
        <button
          onClick={prevCard}
          aria-label="Previous"
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 absolute left-1 z-20"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cards */}
        <div className="flex justify-center items-center w-full px-12">
          <div
            className={`flex flex-nowrap w-full ${
              cardsToShow === 3 ? "max-w-3xl" : "max-w-xs"
            } justify-center`}
          >
            {visibleCards.map((card, idx) => (
              <Card key={idx} {...card} />
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button
          onClick={nextCard}
          aria-label="Next"
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 absolute right-1 z-20"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex mt-6 space-x-2">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 ${
              current === idx ? "bg-orange-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
