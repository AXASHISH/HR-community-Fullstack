import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const NominationButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full ">
      {/* Main Ribbon Container */}
      <div className="relative w-100% mx-auto flex  ">
        
        {/* Main Ribbon Container */}
        <div className="relative bg-[#1262A0] text-orange-500 py-6 px-8 flex items-center justify-center w-full gap-10">
          
          {/* Left Side Text */}
          <div className='text-white text-3xl font-semibold'>
            <p>Nomination opened for HR Excellence Awards 2025</p>
          </div>
          
          {/* Right Side Button */}
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate("/hr-awards")}
          >
            {/* Calendar Icon */}
           
            
            {/* Button Text */}
            <span className="text-md">Nominate</span>
            
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

export default NominationButton;
