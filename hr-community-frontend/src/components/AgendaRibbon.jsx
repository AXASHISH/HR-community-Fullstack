import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const StylishAgendaRibbon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full px-4 py-8">
      {/* Main Ribbon Container */}
      <div className="relative max-w-7xl mx-auto ">
        
        {/* Main Ribbon Container */}
        <div className="relative bg-[#1262A0] text-orange-500 py-6 px-8 flex items-center justify-between">
          
          {/* Left Side Text */}
          <div className="flex-1">
            <p className="text-orange-300 mt-2 text-lg sm:text-xl">
              Stay organized and manage your schedule effectively
            </p>
          </div>
          
          {/* Right Side Button */}
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate("/hr-summit/agenda")}
          >
            {/* Calendar Icon */}
           
            
            {/* Button Text */}
            <span className="text-md">Agenda</span>
            
            {/* Arrow Icon */}
            <svg className={`w-5 h-5 transform transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default StylishAgendaRibbon;
