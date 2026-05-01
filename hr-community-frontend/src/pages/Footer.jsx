import React from 'react';
import { Phone, Mail } from 'lucide-react';

const AppFooter = () => {
  const socialLinks = [
   
   
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/eduskillsfoundation/",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
  
  ];

  return (
    <footer>
      {/* Contact Section - White Background with Blue/Black Text */}
      <div className=" py-6 bg-brand_blue">
  <div className="container mx-auto px-4 ">
    <div className="max-w-sm mx-auto ">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-white relative">
          Contact Us
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-orange-500 rounded-full"></div>
        </h2>
      </div>

      {/* Compact Contact Card */}
      <div >
        <div className="text-center ">
          {/* Contact Person */}
          <div>
            <p className="text-base  text-white mb-2">Paritosh Sinha </p>
            <p className="text-sm text-white">Program Coordinator</p>
            <a 
              href="tel:8093254919" 
              className="inline-flex items-center gap-2 px-3 py-1.5 text-white font-medium rounded-full transition-all duration-300 text-sm"
            >
              <Phone size={14} />
              8093254919
            </a>
          </div>

          {/* Email */}
          <div>
            <a 
              href="mailto:hrcommunity@eduskillsfoundation.org"
              className="inline-flex items-center gap-2  text-white  font-medium rounded-full  text-xs"
              style={{ backgroundColor: '#1161A0' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0d4d7a'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#1161A0'}
            >
              <Mail size={14} />
              <span>Community@eduskillsfoundation.org</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Copyright and Social Media Section - Blue Background */}
      <div className="bg-[#1161A0] text-white py-6 border-t border-blue-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright - Left Side */}
            <p className="text-blue-100 text-sm">
              © Copyright 2025. All Rights Reserved by EduSkills Foundation
            </p>
            
            {/* Social Media Icons - Right Side */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF5A1F]  p-2 rounded-lg shadow-md"
                  title={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
