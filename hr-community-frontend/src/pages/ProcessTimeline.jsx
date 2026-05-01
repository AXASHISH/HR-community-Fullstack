import React from "react";

const processData = [
  {
    icon: "📝",
    title: "Nominations Open",
    desc: "Start submitting your nominations",
    date: "July 28, 2025",
  },
  {
    icon: "📤",
    title: "Last Date to Submit",
    desc: "Deadline for all nominations",
    date: "August 6, 2025",
  },
  {
    icon: "💬",
    title: "Public Perception",
    desc: "Public insights and support",
    date: "July 28 - August 13, 2025",
  },
  {
    icon: "📋",
    title: "Initial Screening",
    desc: "Shortlisting process begins",
    date: "August 14 - August 20, 2025",
  },
  {
    icon: "👨‍⚖️",
    title: "Final Jury Evaluation",
    desc: "Expert panel reviews nominations",
    date: "August 20 - August 25, 2025",
  },
  {
    icon: "🏆",
    title: "Winner Announcement",
    desc: "Final results are announced",
    date: "August 26, 2025",
  },
];

const ProcessTimeline = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-16 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
          Process Timeline
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center border-l-4 border-blue-500 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
              <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
