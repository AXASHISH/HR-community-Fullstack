import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AppFooter from '../pages/Footer';
import glimpse1 from '../assets/glimpses/IMG_1016.JPG'
import glimpse2 from '../assets/glimpses/IMG_1081.JPG'
import glimpse3 from '../assets/glimpses/IMG_1168.JPG'
import glimpse4 from '../assets/glimpses/IMG_1202.JPG'
import glimpse5 from '../assets/glimpses/RAJ06223.JPG'
import glimpse6 from '../assets/glimpses/RAJ06237.JPG'
import glimpse7 from '../assets/glimpses/RAJ06253.JPG'
import glimpse8 from '../assets/glimpses/RAJ06254.JPG'
import glimpse9 from '../assets/glimpses/RAJ06269.JPG'
import glimpse10 from '../assets/glimpses/RAJ06279.JPG'
import glimpse11 from '../assets/glimpses/RAJ06299.JPG'
import glimpse12 from '../assets/glimpses/RAJ06325.JPG'
import glimpse13 from '../assets/glimpses/RAJ06345.JPG'
import glimpse14 from '../assets/glimpses/RAJ06366.JPG'

const HorizontalImageGallery = () => {
  const scrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const intervalRef = useRef(null);
  
  // Memoize the images array to prevent recreation on every render
  const images = useMemo(() => [
    { id: 1, src: glimpse1 },
    { id: 2, src: glimpse2 },
    { id: 3, src: glimpse3 },
    { id: 4, src: glimpse4 },
    { id: 5, src: glimpse5 },
    { id: 6, src: glimpse6 },
    { id: 7, src: glimpse7 },
    { id: 8, src: glimpse8 },
    { id: 9, src: glimpse9 },
    { id: 10, src: glimpse10 },
    { id: 11, src: glimpse11 },
    { id: 12, src: glimpse12 },
    { id: 13, src: glimpse13 },
    { id: 14, src: glimpse14 },
  ], []);

  // Memoize duplicated images to prevent recreation
  const duplicatedImages = useMemo(() => [...images, ...images, ...images], [images]);

  // Handle image load for performance tracking
  const handleImageLoad = useCallback((imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  }, []);

  // Optimized auto-scroll with requestAnimationFrame for better performance
  useEffect(() => {
    let animationId;
    let lastTime = 0;
    const scrollSpeed = 1; // Reduced speed for smoother animation

    const animate = (currentTime) => {
      if (currentTime - lastTime >= 16) { // ~60fps
        if (isAutoScrolling && scrollRef.current) {
          const { current } = scrollRef;
          current.scrollLeft += scrollSpeed;

          // Infinite scrolling: jump to middle set if at end
          const maxScroll = current.scrollWidth / 3;
          if (current.scrollLeft >= maxScroll * 2) {
            current.scrollLeft -= maxScroll;
          }
        }
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };

    if (isAutoScrolling) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAutoScrolling]);

  // Set initial scroll position to middle set
  useEffect(() => {
    if (scrollRef.current) {
      const maxScroll = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = maxScroll;
    }
  }, []);

  // Optimized manual scroll with smoother animation
  const scroll = useCallback((direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 320;
      setIsAutoScrolling(false);

      // Use smooth scrolling for better UX
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      // Clear existing timeout
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }

      // Resume auto-scroll after manual interaction
      intervalRef.current = setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  }, []);
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
  

  // Throttled scroll handler to reduce frequency of calls
  const handleScroll = useCallback(() => {
    const { current } = scrollRef;
    if (current) {
      const maxScroll = current.scrollWidth / 3;
      
      // Use requestAnimationFrame for smooth position adjustment
      requestAnimationFrame(() => {
        if (current.scrollLeft <= 0) {
          current.scrollLeft += maxScroll;
        } else if (current.scrollLeft >= maxScroll * 2) {
          current.scrollLeft -= maxScroll;
        }
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => setIsAutoScrolling(false), []);
  const handleMouseLeave = useCallback(() => setIsAutoScrolling(true), []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <h2 className="text-3xl font-semibold mb-4 text-[#1161A0]">The Past Event</h2>
        <div className="w-24 h-1 bg-[#F68833]"></div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <img
            src="https://connect.eduskillsfoundation.org/red-fort-delhi1-attr-hero.jpeg"
            alt="Connect-2024 at Delhi"
            className="w-80 h-64 object-cover rounded-md mb-4"
            loading="lazy"
          />
          <button
            type="button"
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-150 text-lg shadow"
            onClick={() => window.open('https://connect.eduskillsfoundation.org/connect_2024/', '_blank')}
          >
            HR Submit-2024 at Delhi
          </button>
        </div>
      </div>
      
      <div className="w-full max-w-full mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1161A0] mb-2">
            2024 Glimpses
          </h1>
          <div className="w-24 h-1 bg-[#F68833] mx-auto rounded-full"></div>
        </div>

        {/* Image Gallery Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'auto',
              willChange: 'scroll-position', // Optimize for scrolling
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="flex-shrink-0 relative group/item cursor-pointer"
              >
                <div className="w-80 h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <img
                    src={image.src}
                    alt={`Gallery image ${image.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                    loading="lazy" // Lazy load images for better performance
                    decoding="async" // Async decoding
                    onLoad={() => handleImageLoad(`${image.id}-${index}`)}
                    style={{
                      willChange: 'transform', // Optimize for transform animations
                      backfaceVisibility: 'hidden', // Prevent flickering
                    }}
                  />
                  
                  {/* Overlay - only render if image is loaded */}
                  {loadedImages.has(`${image.id}-${index}`) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        {/* Add content here if needed */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <AppFooter />
    </>
  );
};

export default HorizontalImageGallery;
