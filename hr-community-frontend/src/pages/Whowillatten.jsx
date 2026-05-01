import React from "react";
import {
  Users,
  Briefcase,
  UserCheck,
  BookOpen,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";

const attendees = [
  {
    title: "CHROs / HR Leaders",
    icon: <Users className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "CEOs / MDs",
    icon: <Briefcase className="h-8 w-8 text-orange-500" />,
  },
  {
    title: "Talent Acquisition Heads",
    icon: <UserCheck className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "Policymakers, Thinkers, Educationists",
    icon: <BookOpen className="h-8 w-8 text-orange-500" />,
  },
  {
    title: "Academicians / Vice Chancellors / Deans",
    icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "DEI Heads / Practitioners",
    icon: <HeartHandshake className="h-8 w-8 text-orange-500" />,
  },
];

const WhoShouldAttend = () => {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-12">
          Who Should Attend?
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {attendees.map((attendee, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-lg border border-blue-100 rounded-2xl p-6 hover:shadow-xl transition"
            >
              <div className="mb-4">{attendee.icon}</div>
              <p className="text-lg font-medium text-gray-800 text-center">
                {attendee.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoShouldAttend;
