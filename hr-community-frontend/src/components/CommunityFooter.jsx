import React from 'react';
import { Phone, Mail } from 'lucide-react';

const CommunityFooter = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/eduskillsfoundation/",
      icon: (
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="bg-[#1161A0]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start text-white">
          
          {/* Logo Section - Left Side */}
          <div className="flex-shrink-0">
            <div className="mb-6">
              <img 
                src="https://eduskillsfoundation.org/wp-content/uploads/2020/06/cropped-logo-2-1.png" 
                alt="EduSkills Foundation Logo" 
                className="h-12 w-auto mb-4"
              />
              <div className="flex space-x-3 justify-center">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand_orange  hover:bg-opacity-30 p-2 rounded transition-all duration-300 "
                    title={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Us - Right Side */}
          <div className="flex-shrink-0">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3 text-sm text-blue-100">
              
              {/* Corporate Office */}
              <div>
                <p className="font-medium text-white mb-1">Corp. Office:</p>
                <p>B-7, Awfis - Allied House, Near AICTE,</p>
                <p>Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070</p>
              </div>

              {/* Contact Person */}
              <div className="mt-4 pt-3 border-t border-blue-400">
                <p className="font-medium text-white">Paritosh Sinha</p>
                <p className="text-blue-100 text-xs">Program Coordinator</p>
                <a 
                  href="tel:8093254919" 
                  className="inline-flex items-center gap-2 text-white hover:text-blue-200 transition-colors duration-300 mt-1"
                >
                  <Phone size={14} />
                  8093254919
                </a>
                <div className="mt-2">
                  <a 
                    href="mailto:community@eduskillsfoundation.org"
                    className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors duration-300"
                  >
                    <Mail size={14} />
                    <span className="text-xs">Community@eduskillsfoundation.org</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#0d4d7a] text-white py-4 border-t border-blue-500">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-blue-100 text-sm">
              © Copyright 2025. All Rights Reserved by EduSkills Foundation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CommunityFooter;
