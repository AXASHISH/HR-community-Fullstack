
import React from 'react';
import { motion } from 'framer-motion';
import AppFooter from '../../pages/Footer';

const boardMembers = [
  {
    name: "Madhu Mangal Kaushal",
    title: "Director Human Resource",
    company: "Technmatrix Consulting",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754293121/Madhu_Mangal_Kaushal_eu3hy9.png"
  },
  {
    name: "Sundaralata A",
    title: "Associate Vice President Human Resource",
    company: "Sonata Software",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754293413/Sundaralata_A_hsibyg.png"
  },
  {
    name: "Anshul Bhargava",
    title: "Senior Vice President Human Resource",
    company: "First Source",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754292855/Anshul_Bhargava_tjgvsd.png"
  },
  {
    name: "Shailesh Banaeet",
    title: "Global CHRO",
    company: "Cybernate",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754293336/Shailesh_Banaeet_xupwbu.png"
  },
  {
    name: "Devi Prasad Dash",
    title: "Chief Human Resources Officer",
    company: "Apollo Health and Lifestyle Ltd.",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754292991/Devi_Prasad_Dash_qmizeh.png"
  },
  {
    name: "Reshmi Menon",
    title: "Head of Campus and University Relation",
    company: "Providence",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754293257/Reshmi_Menon_vu1z1a.png"
  },
  {
    name: "Ancy Nimsha Sreenivasan",
    title: "Vice President Human Resources",
    company: "Infoedge",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754292754/Ancy_Nimsha_Sreenivasan_mvsspr.png"
  },
  {
    name: "Pavani Saripella",
    title: "Function Head Recruitment – India, Americas, Africa and Middle East",
    company: "Tech Mahindra",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754293157/Pavani_Saripella_dillur.png"
  },
  {
    name: "Arun Kumar Sahu",
    title: "Lead Global People Services",
    company: "Electronic Arts (EA)",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754292945/Arun_Kumar_Sahu_fjdcey.png"
  },
  {
    name: "Vinod Prakash Sharma",
    title: "Head of Human Resources",
    company: "",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754293452/Vinod_Prakash_Sharma_zeo56f.png"
  },
  {
    name: "Pramod Kumar Bebarta",
    title: "Vice President Human Resources",
    company: "C-1 InfoSystems",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754293209/Pramod_Kumar_Bebarta_o0dsel.png"
  },
  {
    name: "Harsh Raj Jain",
    title: "Talent Acquisition Head APAC + Americas & India Campus Head",
    company: "Edbx",
    img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754293061/Harsh_Raj_Jain_fa0nxa.png"
  }
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut',
    }
  })
};

const AdvisoryBoard = () => (
  <>
  <div className="min-h-screen py-10">
    <div className="max-w-6xl mx-auto">
      {/* Badge */}
      <div className="flex justify-center mb-10">
        <span className="bg-brand_orange px-6 py-2 rounded-full text-white  text-2xl tracking-wider shadow-md">
          Advisory Board
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {boardMembers.map((m, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center text-center p-6 "
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={idx}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
            <p className="text-sm text-gray-700 mt-1 font-medium">{m.title}</p>
            {m.company && (
              <p className="text-xs text-gray-500 mt-1">{m.company}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
  <AppFooter />
  </>

);

export default AdvisoryBoard;
