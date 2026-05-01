import React from "react";

// Example Unsplash Award Background Image (replace with a suitable URL)
const backgroundUrl =
  "https://image.shutterstock.com/image-photo/cropped-shot-people-hands-holding-260nw-2507850131.jpg"; // Placeholder, replace with a trophy/hands image

const WinnerRewards = () => {
  const rewards = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFD700" />
          <path d="M12 6v6l4 2" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: "Trophy & Certificate by EduSkills & AICTE, MoE, Govt. of India",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFD700" />
          <path d="M5 18h14v-6a6 6 0 0 0-12 0v6z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: "Complimentary 1-Night Stay",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFD700" />
          <rect x="7" y="10" width="10" height="4" rx="2" stroke="#000" strokeWidth="2" />
        </svg>
      ),
      text: "Gift Voucher",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFD700" />
          <path d="M7 7h10v10H7z" stroke="#000" strokeWidth="2" />
          <path d="M7 13h10" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      text: "Profile in HR Leaders Insight Magazine",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFD700" />
          <path d="M5 12h14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 5v14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      text: "Event Participation",
    },
  ];

  return (
    <div
      className="relative min-h-[400px] flex flex-col items-center justify-center px-4 md:px-8 py-12"
      style={{
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start w-full h-full">
        <h2 className="text-3xl md:text-3xl text-white drop-shadow-md mb-8 text-start">
          What Winners Will Receive
        </h2>
        <ul className="text-white text-lg md:text-xl space-y-4 max-w-2xl">
          {rewards.map((reward, index) => (
            <li key={index} className="flex items-center space-x-4">
              <span className="text-yellow-300">{reward.icon}</span>
              <span className="drop-shadow">{reward.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WinnerRewards;