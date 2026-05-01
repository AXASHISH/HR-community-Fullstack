import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const cards = [
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308506/1st_Edition_dmypqb.png",
  },
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308566/2nd_Edition_c9hhbw.png",
  },
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308589/3rd_Edition_bcyovs.png",
  },
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308608/4th_Edition_vkfooy.png",
  },
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308630/5th_Edition_nwjps7.png",
  },
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308649/6th_Edition_cxm2pr.png",
  },
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308784/7th_Edition_oxao1e.png",
  },
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308918/8th_Edition_jeppnh.png",
  },
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308951/9th_Edition_smsdqr.png",
  },
  {
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754308971/10th_Edition_tn52rr.png",
  },
];

const CARD_WIDTH = 340;

const TARoundtable = () => {
  const carouselRef = useRef(null);
  const combinedCards = [...cards, ...cards];
  const numCards = cards.length;
  const [index, setIndex] = useState(0);

  const scrollToIndex = (idx, behavior = "smooth") => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: idx * CARD_WIDTH,
        behavior,
      });
    }
  };

  useEffect(() => {
    scrollToIndex(numCards, "auto");
  }, [numCards]);

  const handleScroll = (direction) => {
    const newIndex =
      direction === "left"
        ? (index - 1 + numCards) % numCards
        : (index + 1) % numCards;
    setIndex(newIndex);
    scrollToIndex(newIndex + numCards);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const approxIndex = Math.round(scrollLeft / CARD_WIDTH);
    if (approxIndex < numCards) {
      scrollToIndex(approxIndex + numCards, "auto");
    } else if (approxIndex >= numCards * 2) {
      scrollToIndex(approxIndex - numCards, "auto");
    }
  };

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto text-center bg-white">
      <h2 className="text-3xl md:text-3xl text-brand_orange mt-2 ">
        Talent Forum
      </h2>
      <br />
      <div className="relative">
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
          aria-label="Scroll left"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide transition-all"
          style={{ scrollBehavior: "smooth", overflowX: "hidden" }}
        >
          {combinedCards.map((card, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[340px] mx-1 bg-white rounded-xl shadow-sm flex flex-col overflow-hidden hover:shadow-md transition border-2 border-black"
              style={{ scrollSnapAlign: "center" }}
            >
              <div className="relative w-full aspect-[5/2] bg-white overflow-hidden">
                <img
                  src={card.img}
                  alt={`Edition ${idx % numCards + 1}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
          aria-label="Scroll right"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TARoundtable;
