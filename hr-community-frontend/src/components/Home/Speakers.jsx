
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Speakers = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchSpeakers = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr_community_speakers`, {
//           params: {
//             guest_types: ['speaker'],
//           },
//           paramsSerializer: params =>
//             params.guest_types.map(v => `guest_types=${v}`).join("&"),
//         });

//         // Sort speakers by sequence_no
//         const sortedSpeakers = response.data.sort((a, b) => {
//           const seqA = a.sequence_no ?? 999999;
//           const seqB = b.sequence_no ?? 999999;
//           return seqA - seqB;
//         });

//         setSpeakers(sortedSpeakers);
//       } catch (error) {
//         console.error("Error fetching speaker data:", error);
//         setError("Failed to load speakers");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpeakers();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center p-8">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand_orange mx-auto"></div>
//         <p className="mt-2">Loading speakers...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-center text-red-500 p-4">{error}</p>;
//   }

//   return (
//     <>
//       <h1 className='text-3xl text-brand_orange mb-3 text-center'>Speakers</h1>
//       <div className="p-4 grid gap-4 max-w-7xl mx-auto 
//                 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] 
//                 justify-items-center">
//         {speakers.map((speaker) => (
//           <div key={speaker?.speaker_id} className="max-w-52 bg-white shadow-lg overflow-hidden border border-gray-200">
//             <div className="w-full aspect-square bg-white overflow-hidden">
//               <img
//                 src={speaker?.profile_image || "https://via.placeholder.com/150"}
//                 alt={speaker?.speaker_name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="p-3 text-center">
//               <h3 className="text-sm font-semibold text-gray-800">{speaker?.speaker_name}</h3>
//               <p className="text-gray-600 text-xs mt-1">
//                 {speaker?.designation}, {speaker?.company_name}
//               </p>

//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Speakers;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/hr_community_speakers`, {
          params: {
            guest_types: ['speaker'],
          },
          paramsSerializer: params =>
            params.guest_types.map(v => `guest_types=${v}`).join("&"),
        });

        // Sort speakers by sequence_no
        const sortedSpeakers = response.data.sort((a, b) => {
          const seqA = a.sequence_no ?? 999999;
          const seqB = b.sequence_no ?? 999999;
          return seqA - seqB;
        });

        setSpeakers(sortedSpeakers);
      } catch (error) {
        console.error("Error fetching speaker data:", error);
        setError("Failed to load speakers");
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  if (error) {
    return <p className="text-center text-red-500 p-4">{error}</p>;
  }

  return (
    <>
      <h1 className='text-3xl text-brand_orange mb-3 text-center'>Speakers</h1>
      <div className="p-4 grid gap-4 max-w-7xl mx-auto 
                grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] 
                justify-items-center">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-52 bg-white shadow-lg overflow-hidden border border-gray-200 animate-pulse"
            >
              {/* Image Placeholder */}
              <div className="w-full aspect-square bg-gray-200"></div>

              {/* Text Placeholders */}
              <div className="p-3 text-center">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ))
          : speakers.map((speaker) => (
            <div
              key={speaker?.speaker_id}
              className="w-52 bg-white shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="w-full aspect-square bg-white overflow-hidden">
                <img
                  src={speaker?.profile_image || "https://via.placeholder.com/150"}
                  alt={speaker?.speaker_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-gray-800">{speaker?.speaker_name}</h3>
                <p className="text-gray-600 text-xs mt-1">
                  {speaker?.designation}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                   {speaker?.company_name}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Speakers;

