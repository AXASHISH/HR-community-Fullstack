import React from 'react';

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col justify-center items-center text-white px-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-pulse">
        Coming Soon
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-center max-w-lg">
        We're working hard to bring you something amazing. Stay tuned!
      </p>

      <div className="flex gap-4">
        
      </div>

      <footer className="absolute bottom-6 text-sm text-white/80">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </footer>
    </div>
  );
};

export default Community;
