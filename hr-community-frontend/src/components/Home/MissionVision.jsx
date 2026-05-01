import React from 'react';

const MissionVision = () => {
  return (
     <section className="h-full flex flex-col justify-between ">
      <div className="text-center">
        <h2 className="text-xl md:text-3xl text-brand_orange mb-12">
          Mission & Vision
        </h2>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed pt-4 text-justify flex-grow">
        To become India's most trusted and collaborative HR ecosystem, shaping the future of
        talent by bridging industry and academia, and empowering professionals to lead
        inclusive, innovative, and future-ready workforce strategies.
      </p>
    </section>
  );
};

export default MissionVision;
