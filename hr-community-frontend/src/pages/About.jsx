import React from "react";

export default function AboutCommunitySection() {
  return (
   <section className="space-y-10 h-full flex flex-col">
      <div className="text-center">
        <h2 className="text-xl md:text-3xl text-brand_orange dark:text-white mb-6">
          About 
        </h2>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-justify flex-grow">
        The <strong>EduSkills HR Talent Community</strong> is a dynamic, national platform that unites HR
        leaders, Talent Acquisition experts, and Early Careers professionals across industries.
        It serves as a collaborative ecosystem that promotes innovation, continuous learning,
        and shared responsibility in shaping India's future workforce.
        <br /><br />
        This initiative is dedicated to advancing the Human Resource Management profession by
        offering members a rich array of professional development opportunities, peer engagement,
        and a common forum to exchange ideas, experiences, and solutions.
      </p>
    </section>
  );
}
