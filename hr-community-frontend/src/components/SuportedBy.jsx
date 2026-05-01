// import React from 'react';

// const SupportedBy = () => {
//   const partnerData = [
//     { title: "Title Partner", partners: [{ name: "Microchip", logo: "https://res.cloudinary.com/dydvdfmgo/image/upload/v1754701620/MCHP_Logo_Horizontal_4C_nvnjvv.png" }] },
//     { title: "Gold Partner", partners: [{ name: "Juniper", logo: "https://res.cloudinary.com/dydvdfmgo/image/upload/v1754701872/290_hsjgts.jpg" }] },
//     { title: "Associate Partner", partners: [{ name: "Celonis", logo: "https://res.cloudinary.com/dydvdfmgo/image/upload/v1754702079/celonis2_zfbeuh.png" }] },
//     { title: "Presenting Partner", partners: [{ name: "Zscaler", logo: "https://res.cloudinary.com/dydvdfmgo/image/upload/v1754701817/zscalar_xzrfai.jpg" }] }
//   ];

//   return (
//     <div className="bg-gray-50 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Title */}
//         <h2 className="text-center text-brand_orange text-3xl font-medium mb-8">
//           Supported By
//         </h2>

//         {/* Main Support Logos */}
//         <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16">
//           <div className="flex items-center justify-center h-28 w-28">
//             <img
//               src="https://connect.eduskillsfoundation.org/images/Landing/partnership/AICTE.png"
//               alt="AICTE"
//               className="h-full object-contain"
//             />
//           </div>
//           <div className="flex items-center justify-center h-32 w-32">
//             <img
//               src="https://connect.eduskillsfoundation.org/images/Landing/partnership/NIP.png"
//               alt="Internship Program"
//               className="h-full object-contain"
//             />
//           </div>
//         </div>

//         {/* Partner Categories with Logos */}
//         <div className="mt-10 flex flex-wrap justify-between gap-8 text-center">
//           {partnerData.map((category, idx) => (
//             <div key={idx} className="flex flex-col items-center">
//               <span className="font-semibold text-brand_orange mb-2">{category.title}</span>
//               <img
//                 src={category.partners[0].logo}
//                 alt={category.partners[0].name}
//                 className="h-16 object-contain mb-1"
//               />
//               {/* <span className="text-gray-600">{category.partners[0].name}</span> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportedBy;

import React from 'react';

const SupportedBy = () => {
  const partnerData = [
    // { title: "Title Partner", partners: [{ name: "Microchip", logo: "https://res.cloudinary.com/dydvdfmgo/image/upload/v1754701620/MCHP_Logo_Horizontal_4C_nvnjvv.png" }] },
    { title: "Title Partner", partners: [{ name: "Microchip", logo: "https://res.cloudinary.com/dleznkbgs/image/upload/v1755147840/MCHP_Logo_Horizontal_4C_lywqne.png" }] },
    { title: "Presenting Partner", partners: [{ name: "Zscaler", logo: "https://res.cloudinary.com/dydvdfmgo/image/upload/v1754740356/zscalar-removebg-preview-Picsart-AiImageEnhancer_aqboeq.png" }] },
    { title: "Gold Partner", partners: [{ name: "Juniper", logo: "https://res.cloudinary.com/dydvdfmgo/image/upload/v1754740078/juniper-removebg-preview-Picsart-AiImageEnhancer_e9xugu.png" }] },
    { title: "Associate Partner", partners: [{ name: "Celonis", logo: "https://res.cloudinary.com/dydvdfmgo/image/upload/v1754740315/celonis-removebg-preview-Picsart-AiImageEnhancer_ox3yt8.png" }] },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-brand_orange text-3xl font-medium mb-8">
          Supported By
        </h2>

        {/* Main Support Logos */}
        <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16">
          <div className="flex items-center justify-center w-24 h-28 bg-transparent">
            <img
              src="https://connect.eduskillsfoundation.org/images/Landing/partnership/AICTE.png"
              alt="AICTE"
              className="w-full h-full object-contain bg-transparent"
            />
          </div>
          <div className="flex items-center justify-center w-44 h-40 bg-transparent">
            <img
              src="https://connect.eduskillsfoundation.org/images/Landing/partnership/NIP.png"
              alt="Internship Program"
              className="w-full h-full object-contain bg-transparent"
            />
          </div>
        </div>

        {/* Partner Categories with Logos */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-16 text-center">
          {partnerData.map((category, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-semibold text-brand_orange mb-2">{category.title}</span>
              <div className="w-48 h-28 flex items-center justify-center bg-transparent">
                <img
                  src={category.partners[0].logo}
                  alt={category.partners[0].name}
                  className="w-full h-full object-contain bg-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportedBy;
