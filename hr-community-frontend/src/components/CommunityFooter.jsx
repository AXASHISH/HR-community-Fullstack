import React from "react";
import {
  Award,
  BookOpenCheck,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
} from "lucide-react";

const footerLinks = [
  {
    title: "Community",
    links: [
      { label: "About", href: "/#About" },
      { label: "Activities", href: "/#Activity" },
      { label: "TA Roundtable", href: "/#TARoundtable" },
      { label: "Member Features", href: "/#member-features" },
    ],
  },
  {
    title: "Member Tools",
    links: [
      { label: "LMS", href: "/#member-features" },
      { label: "Community Chat", href: "/#member-features" },
      { label: "Awards", href: "/#member-features" },
      { label: "Nomination Form", href: "/login" },
    ],
  },
];

const featureChips = [
  { label: "LMS", icon: BookOpenCheck },
  { label: "Community Chat", icon: MessageSquareText },
  { label: "Awards", icon: Award },
];

const LinkedInIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const CommunityFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#082f4f] text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F47B34] via-[#f6a33b] to-[#1161A0]" />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr_1.1fr]">
          <div>
            <img
              src="https://eduskillsfoundation.org/wp-content/uploads/2020/06/cropped-logo-2-1.png"
              alt="EduSkills Foundation"
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-md text-sm leading-6 text-blue-100">
              EduSkills HR Talent Community brings HR leaders together through
              learning, community collaboration, awards, and industry-led
              engagement.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {featureChips.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white"
                  >
                    <Icon className="h-4 w-4 text-[#F47B34]" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#F47B34]">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-blue-100 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/10">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="mt-5 space-y-4 text-sm text-blue-100">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#F47B34]" />
                <p>
                  B-7, Awfis - Allied House, Near AICTE, Nelson Mandela Marg,
                  Vasant Kunj, New Delhi - 110070
                </p>
              </div>
              <a
                href="tel:8093254919"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 text-[#F47B34]" />
                <span>Paritosh Sinha, Program Coordinator: 8093254919</span>
              </a>
              <a
                href="mailto:community@eduskillsfoundation.org"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 text-[#F47B34]" />
                <span>community@eduskillsfoundation.org</span>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/eduskillsfoundation/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#F47B34] text-white transition-transform hover:-translate-y-0.5 hover:bg-[#e86720]"
                title="Follow EduSkills Foundation on LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#062740]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-blue-100 md:flex-row md:items-center md:justify-between md:px-8">
          <p>Copyright {year}. All Rights Reserved by EduSkills Foundation.</p>
          <p className="text-blue-200">Learning. Networking. Recognition.</p>
        </div>
      </div>
    </footer>
  );
};

export default CommunityFooter;
