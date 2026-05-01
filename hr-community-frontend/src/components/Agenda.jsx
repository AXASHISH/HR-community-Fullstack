// import React, { useState, useEffect } from "react";
// import { ChevronDown, ChevronUp, Users, Clock, Mic, Utensils, Presentation, Calendar, Flag } from "lucide-react";
// import AppFooter from "../pages/Footer";

// const agendaDays = [
//   {
//     day: "DAY-01",
//     date: "19 SEPTEMBER 2025", 
//     isActive: false,
//   },
// ];

// const agendaItems = [
//   {
//     time: "09:00AM - 11.30AM",
//     title: "Inauguration (HR summit)",
//     speakers: [
//       {
//         name: "Dr. Subhas Sarkar",
//         position: "Former Union Minister of State for Education, Govt. of India",
//         img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111745/pic17_ufwnkk.jpg",
//       },
//       {
//         name: "Prof. (Dr.) T. G. Sitharam",
//         position: "Chairman, AICTE, Ministry of Education, Govt. of India",
//         img: "https://res.cloudinary.com/dleznkbgs/image/upload/v1754111745/pic13_rmlvid.jpg",
//       },
//       {
//         name: "Dr. John Smith",
//         position: "Director of Educational Innovation, Harvard University",
//         img: "https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=JS",
//       },
//     ],
//   },
//   {
//     time: "11:30AM - 12.00PM",
//     title: "Keynote Session",
//     speakers: [],
//   },
//   {
//     time: "12:00PM - 01.00PM",
//     title: "Panel Discussion",
//     speakers: [
//       {
//         name: "Prof. Sarah Wilson",
//         position: "Dean of Academic Affairs, MIT",
//         img: "https://via.placeholder.com/150x150/50C878/FFFFFF?text=SW",
//       },
//       {
//         name: "Dr. Michael Chen",
//         position: "Research Director, Stanford Institute",
//         img: "https://via.placeholder.com/150x150/FF6347/FFFFFF?text=MC",
//       },
//     ],
//   },
//   {
//     time: "01:00PM - 02.30PM",
//     title: "Lunch Break",
//     speakers: [],
//   },
//   {
//     time: "02:30PM - 03.00PM",
//     title: "Keynote Session",
//     speakers: [],
//   },
//   {
//     time: "03:00PM - 04.00PM",
//     title: "Panel Discussion",
//     speakers: [],
//   },
//   {
//     time: "04:00PM - 04.30PM",
//     title: "Keynote Session",
//     speakers: [],
//   },
// ];

// const bgColors = {
//   keynote: "bg-blue-50 border-l-4 border-blue-500",
//   panel: "bg-orange-50 border-l-4 border-orange-500",
//   lunch: "bg-green-50 border-l-4 border-green-500",
//   inauguration: "bg-indigo-50 border-l-4 border-indigo-500",
// };

// const iconColors = {
//   keynote: "text-blue-600",
//   panel: "text-orange-600",
//   lunch: "text-green-600",
//   inauguration: "text-indigo-600",
// };

// const icons = {
//   keynote: <Mic size={18} />,
//   panel: <Users size={18} />,
//   lunch: <Utensils size={18} />,
//   inauguration: <Flag size={18} />,
// };

// function getType(title) {
//   if (title.toLowerCase().includes("keynote")) return "keynote";
//   if (title.toLowerCase().includes("panel")) return "panel";
//   if (title.toLowerCase().includes("lunch")) return "lunch";
//   if (title.toLowerCase().includes("inauguration")) return "inauguration";
//   return "panel";
// }

// // Function to parse time string to minutes for comparison
// function parseTimeToMinutes(timeString) {
//   const [time, ampm] = timeString.split(/([AP]M)/);
//   let [hours, minutes] = time.split(':').map(Number);
  
//   if (ampm === 'PM' && hours !== 12) {
//     hours += 12;
//   } else if (ampm === 'AM' && hours === 12) {
//     hours = 0;
//   }
  
//   return hours * 60 + minutes;
// }

// // Function to check if current time is within agenda item time range
// function isCurrentTimeInRange(timeRange, currentTime) {
//   const [startTime, endTime] = timeRange.split(' - ');
//   const currentMinutes = parseTimeToMinutes(currentTime);
//   const startMinutes = parseTimeToMinutes(startTime);
//   const endMinutes = parseTimeToMinutes(endTime);
  
//   return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
// }

// function EnhancedMinimalistAgenda() {
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [activeDay, setActiveDay] = useState(0);
//   const [currentTime, setCurrentTime] = useState("");
//   const [currentItemIndex, setCurrentItemIndex] = useState(null);

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const hours = now.getHours();
//       const minutes = now.getMinutes();
//       const ampm = hours >= 12 ? 'PM' : 'AM';
//       const formattedHours = hours % 12 || 12;
//       const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
//       const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;
//       setCurrentTime(formattedTime);
      
//       // Find current agenda item based on time
//       const currentIndex = agendaItems.findIndex(item => 
//         isCurrentTimeInRange(item.time, formattedTime)
//       );
//       setCurrentItemIndex(currentIndex !== -1 ? currentIndex : null);
//     };

//     // Initial time set
//     updateTime();
    
//     // Update time every minute
//     const timer = setInterval(updateTime, 60000);
    
//     return () => clearInterval(timer);
//   }, []);

//   const toggleExpand = (index) => {
//     setExpandedIndex(index === expandedIndex ? null : index);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ 
//       top: 0, 
//       behavior: 'smooth' 
//     });
//   };

//   return (
//     <>
//     <div className="max-w-6xl mx-auto my-10 px-4">
//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             max-height: 0;
//             transform: translateY(-20px);
//           }
//           to {
//             opacity: 1;
//             max-height: 1000px;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes bounceIn {
//           0% {
//             transform: scale(0.3);
//             opacity: 0;
//           }
//           50% {
//             transform: scale(1.05);
//           }
//           70% {
//             transform: scale(0.9);
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }
        
//         @keyframes pulse {
//           0%, 100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.05);
//           }
//         }

//         @keyframes bounce {
//           0%, 20%, 53%, 80%, 100% {
//             transform: translate3d(0, 0, 0);
//           }
//           40%, 43% {
//             transform: translate3d(0, -8px, 0);
//           }
//           70% {
//             transform: translate3d(0, -4px, 0);
//           }
//           90% {
//             transform: translate3d(0, -2px, 0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out;
//         }
        
//         .animate-slideDown {
//           animation: slideDown 0.4s ease-out;
//         }
        
//         .animate-bounceIn {
//           animation: bounceIn 0.6s ease-out;
//         }
        
//         .animate-pulse-custom {
//           animation: pulse 2s infinite;
//         }
        
//         .animate-bounce-custom {
//           animation: bounce 2s infinite;
//         }
        
//         .hover-lift {
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }
        
//         .hover-lift:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//         }
        
//         .hover-scale {
//           transition: all 0.2s ease-in-out;
//         }
        
//         .hover-scale:hover {
//           transform: scale(1.02);
//         }
        
//         .smooth-scroll {
//           scroll-behavior: smooth;
//         }
//       `}</style>

//       {/* Header */}
//       <div className="text-center mb-10 animate-fadeIn">
//         <h1 className="text-4xl font-bold text-blue-800 mb-2 hover-scale"> Agenda</h1>
//       </div>

//       {/* Agenda Items */}
//       <div className="space-y-4">
//         {agendaItems.map((item, idx) => {
//           const type = getType(item.title);
//           const isExpanded = idx === expandedIndex;
//           const isCurrent = idx === currentItemIndex;

//           return (
//             <div
//               key={idx}
//               className={`group transition-all duration-500 ease-in-out rounded-xl overflow-hidden hover-lift transform hover:scale-[1.01] ${
//                 isExpanded ? 'mb-4' : 'mb-0'
//               } ${isCurrent ? 'animate-bounce-custom' : ''}`}
//               style={{
//                 animationDelay: `${idx * 0.1}s`
//               }}
//             >
//               <div
//                 className={`cursor-pointer transition-all duration-500 ease-in-out hover:shadow-lg ${
//                   bgColors[type]
//                 } ${isExpanded ? 'rounded-t-xl' : 'rounded-xl'}`}
//                 // onClick={() => toggleExpand(idx)}
//               >
//                 <div className="px-6 py-5">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-6">
//                       {/* Time Display */}
//                       <div className="flex flex-col items-center min-w-[110px]">
//                         <div className="flex items-center space-x-2">
//                           <div className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-6 ${iconColors[type]}`}>
//                             {icons[type]}
//                           </div>
//                           <div className="font-medium text-gray-700">
//                             <div className="font-bold transition-all duration-300 group-hover:text-blue-600">{item.time.split(' - ')[0]}</div>
//                             <div className="text-xs opacity-80">{item.time.split(' - ')[1]}</div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Session Info */}
//                       <div className="flex-1">
//                         <div className="flex items-center">
//                           <h3 className="text-xl font-bold text-gray-800 mb-1 transition-all duration-300 group-hover:text-blue-700">{item.title}</h3>
//                         </div>
                        
//                         {/* {item.speakers.length > 0 && (
//                           <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2 transition-all duration-300 group-hover:text-gray-700">
//                             <Users className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
//                             <span>{item.speakers.length} speaker{item.speakers.length > 1 ? 's' : ''}</span>
//                           </div>
//                         )} */}
//                       </div>
//                     </div>
                    
//                     {/* Expand Button */}
//                     <div className="flex flex-col items-center justify-center h-full">
//                       <button disabled
//                         className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180 ${
//                           isExpanded 
//                             ? 'bg-blue-100 text-blue-600 rotate-180' 
//                             : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
//                         }`}
//                       >
//                         {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Expanded Speaker Section */}
//               {isExpanded && item.speakers.length > 0 && (
//                 <div className="bg-white px-6 py-6 rounded-b-xl border-t border-gray-100 animate-slideDown">
//                   <h4 className="font-bold text-gray-700 mb-4 flex items-center animate-fadeIn">
//                     <Presentation className="mr-2 w-5 h-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
//                     Featured Speakers
//                   </h4>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {item.speakers.map((speaker, i) => (
//                       <div 
//                         key={i} 
//                         className="bg-gray-50 rounded-xl p-5 transition-all duration-500 ease-in-out hover:shadow-xl hover:border-blue-200 border border-transparent hover-lift transform hover:scale-105"
//                         style={{
//                           animationDelay: `${i * 0.1}s`
//                         }}
//                       >
//                         <div className="flex items-start animate-fadeIn">
//                           {/* Speaker Profile Image */}
//                           <div className="relative mr-4">
//                             <img
//                               src={speaker.img}
//                               alt={speaker.name}
//                               className="w-16 h-16 rounded-lg object-cover transition-all duration-300 hover:scale-110 hover:rotate-3"
//                             />
//                             <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm transition-all duration-300 hover:scale-110">
//                               <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-600">
//                                 <Mic className="text-white w-3 h-3 transition-transform duration-300 hover:scale-110" />
//                               </div>
//                             </div>
//                           </div>
                          
//                           {/* Speaker Info */}
//                           <div className="flex-1">
//                             <h4 className="font-bold text-gray-800 text-lg leading-tight transition-all duration-300 hover:text-blue-600">
//                               {speaker.name}
//                             </h4>
//                             <p className="text-sm text-gray-600 mt-1 leading-relaxed transition-all duration-300 hover:text-gray-700">
//                               {speaker.position}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Navigation */}
//       <div className="mt-10 flex justify-between items-center animate-fadeIn">
//         <button 
//           className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-all duration-300 hover-scale transform hover:-translate-y-1"
//           onClick={scrollToTop}
//         >
//           <ChevronUp className="mr-2 transition-transform duration-300 hover:scale-110" /> Back to top
//         </button>
//       </div>
//     </div>
//       <AppFooter />
//       </>
//   );
// }

// export default EnhancedMinimalistAgenda;


import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Users, Clock, Mic, Utensils, Presentation, Calendar, Flag } from "lucide-react";
import AppFooter from "../pages/Footer";
import axios from "axios";

const bgColors = {
  keynote: "bg-blue-50 border-l-4 border-blue-500",
  panel: "bg-orange-50 border-l-4 border-orange-500",
  lunch: "bg-green-50 border-l-4 border-green-500",
  inauguration: "bg-indigo-50 border-l-4 border-indigo-500",
};

const iconColors = {
  keynote: "text-blue-600",
  panel: "text-orange-600",
  lunch: "text-green-600",
  inauguration: "text-indigo-600",
};

const icons = {
  keynote: <Mic size={18} />,
  panel: <Users size={18} />,
  lunch: <Utensils size={18} />,
  inauguration: <Flag size={18} />,
};

function getType(title) {
  if (title.toLowerCase().includes("keynote")) return "keynote";
  if (title.toLowerCase().includes("panel")) return "panel";
  if (title.toLowerCase().includes("lunch")) return "lunch";
  if (title.toLowerCase().includes("inauguration")) return "inauguration";
  return "panel";
}

// Function to parse time string to minutes for comparison
function parseTimeToMinutes(timeString) {
  const [time, ampm] = timeString.split(/([AP]M)/);
  let [hours, minutes] = time.split(':').map(Number);
  
  if (ampm === 'PM' && hours !== 12) {
    hours += 12;
  } else if (ampm === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + minutes;
}

// Function to check if current time is within agenda item time range
function isCurrentTimeInRange(timeRange, currentTime) {
  const [startTime, endTime] = timeRange.split(' - ');
  const currentMinutes = parseTimeToMinutes(currentTime);
  const startMinutes = parseTimeToMinutes(startTime);
  const endMinutes = parseTimeToMinutes(endTime);
  
  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

// Function to format date for display
function formatDateForDisplay(dateString) {
  const date = new Date(dateString);
  const options = { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  };
  return date.toLocaleDateString('en-IN', options).toUpperCase();
}

// Function to format time from ISO string to 12-hour format
function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Function to create time range string
function createTimeRange(startTime, endTime) {
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

function EnhancedMinimalistAgenda() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [agendaData, setAgendaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agendaDays, setAgendaDays] = useState([]);
  const [agendaItems, setAgendaItems] = useState([]);

  // Fetch agenda data from API
  useEffect(() => {
    const fetchAgendaData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/agendas?agenda_type=summit`);
        
        // Filter for summit type only
        const summitData = response.data.filter(agenda => agenda.type === "summit");
        setAgendaData(summitData);
        
        // Create agenda days
        const days = summitData.map((agenda, index) => ({
          day: `DAY-${String(index + 1).padStart(2, '0')}`,
          date: formatDateForDisplay(agenda.date),
          isActive: index === 0,
          agendaId: agenda.id
        }));
        
        setAgendaDays(days);
        
        // Set initial agenda items (first day)
        if (summitData.length > 0) {
          const firstDayItems = summitData[0].details.map(detail => ({
            time: createTimeRange(detail.start_time, detail.end_time),
            title: detail.title,
            subTitle: detail.sub_title || "",
            speakers: detail.speakers || []
          }));
          setAgendaItems(firstDayItems);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching agenda data:", err);
        setError("Failed to load agenda data");
      } finally {
        setLoading(false);
      }
    };

    fetchAgendaData();
  }, []);

  // Handle day change
  const handleDayChange = (dayIndex) => {
    setActiveDay(dayIndex);
    
    // Update agenda items for selected day
    if (agendaData[dayIndex]) {
      const dayItems = agendaData[dayIndex].details.map(detail => ({
        time: createTimeRange(detail.start_time, detail.end_time),
        title: detail.title,
        subTitle: detail.sub_title || "",
        speakers: detail.speakers || []
      }));
      setAgendaItems(dayItems);
    }
    
    // Reset expanded state when changing days
    setExpandedIndex(null);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;
      setCurrentTime(formattedTime);
      
      // Find current agenda item based on time
      const currentIndex = agendaItems.findIndex(item => 
        isCurrentTimeInRange(item.time, formattedTime)
      );
      setCurrentItemIndex(currentIndex !== -1 ? currentIndex : null);
    };

    // Initial time set
    updateTime();
    
    // Update time every minute
    const timer = setInterval(updateTime, 60000);
    
    return () => clearInterval(timer);
  }, [agendaItems]);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agenda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Check if we should show date tabs (more than one date)
  const showDateTabs = agendaDays.length > 1;

  return (
    <>
    <div className="max-w-6xl mx-auto my-10 px-4">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            max-height: 1000px;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.6s ease-out;
        }
        
        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }
        
        .animate-bounce-custom {
          animation: bounce 2s infinite;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .hover-scale {
          transition: all 0.2s ease-in-out;
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
        
        .smooth-scroll {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-4xl font-bold text-blue-800 mb-2 hover-scale">Agenda</h1>
      </div>

      {/* Date Tabs - Only show if multiple dates */}
      {showDateTabs && (
        <div className="flex justify-center mb-8 animate-fadeIn">
          <div className="flex bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {agendaDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayChange(index)}
                className={`px-6 py-4 transition-all duration-300 hover-scale ${
                  activeDay === index
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-sm">{day.day}</div>
                  <div className="text-xs mt-1 opacity-90">{day.date}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Agenda Items */}
      <div className="space-y-4">
        {agendaItems.map((item, idx) => {
          const type = getType(item.title);
          const isExpanded = idx === expandedIndex;
          const isCurrent = idx === currentItemIndex;

          return (
            <div
              key={idx}
              className={`group transition-all duration-500 ease-in-out rounded-xl overflow-hidden hover-lift transform hover:scale-[1.01] ${
                isExpanded ? 'mb-4' : 'mb-0'
              } ${isCurrent ? 'animate-bounce-custom' : ''}`}
              style={{
                animationDelay: `${idx * 0.1}s`
              }}
            >
              <div
                className={`cursor-pointer transition-all duration-500 ease-in-out hover:shadow-lg ${
                  bgColors[type]
                } ${isExpanded ? 'rounded-t-xl' : 'rounded-xl'}`}
                onClick={() => item.speakers && item.speakers.length > 0 && toggleExpand(idx)}
              >
                <div className="px-6 py-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6">
                      {/* Time Display */}
                      <div className="flex flex-col items-center min-w-[110px]">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-6 ${iconColors[type]}`}>
                            {icons[type]}
                          </div>
                          <div className="font-medium text-gray-700">
                            <div className="font-bold transition-all duration-300 group-hover:text-blue-600">{item.time.split(' - ')[0]}</div>
                            <div className="text-xs opacity-80">{item.time.split(' - ')[1]}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Session Info */}
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-xl font-bold text-gray-800 mb-1 transition-all duration-300 group-hover:text-blue-700">{item.title}</h3>
                        </div>
                        
                        {item.subTitle && (
                          <p className="text-sm text-gray-600 mt-1">{item.subTitle}</p>
                        )}
                        
                        {item.speakers && item.speakers.length > 0 && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2 transition-all duration-300 group-hover:text-gray-700">
                            <Users className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                            <span>{item.speakers.length} speaker{item.speakers.length > 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Expand Button - Only show if there are speakers */}
                    {item.speakers && item.speakers.length > 0 && (
                      <div className="flex flex-col items-center justify-center h-full">
                        <button
                          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180 ${
                            isExpanded 
                              ? 'bg-blue-100 text-blue-600 rotate-180' 
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Speaker Section */}
              {isExpanded && item.speakers && item.speakers.length > 0 && (
                <div className="bg-white px-6 py-6 rounded-b-xl border-t border-gray-100 animate-slideDown">
                  <h4 className="font-bold text-gray-700 mb-4 flex items-center animate-fadeIn">
                    <Presentation className="mr-2 w-5 h-5 text-blue-600 transition-transform duration-300 hover:scale-110" />
                    Featured Speakers
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {item.speakers.map((speaker, i) => (
                      <div 
                        key={i} 
                        className="bg-gray-50 rounded-xl p-5 transition-all duration-500 ease-in-out hover:shadow-xl hover:border-blue-200 border border-transparent hover-lift transform hover:scale-105"
                        style={{
                          animationDelay: `${i * 0.1}s`
                        }}
                      >
                        <div className="flex items-start animate-fadeIn">
                          {/* Speaker Profile Image */}
                          <div className="relative mr-4">
                            <img
                              src={speaker.profile_image || speaker.img || "https://via.placeholder.com/150x150/4A90E2/FFFFFF?text=" + (speaker.speaker_name || speaker.name).charAt(0)}
                              alt={speaker.speaker_name || speaker.name}
                              className="w-16 h-16 rounded-lg object-cover transition-all duration-300 hover:scale-110 hover:rotate-3"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm transition-all duration-300 hover:scale-110">
                              <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-blue-600">
                                <Mic className="text-white w-3 h-3 transition-transform duration-300 hover:scale-110" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Speaker Info */}
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-lg leading-tight transition-all duration-300 hover:text-blue-600">
                              {speaker.speaker_name || speaker.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed transition-all duration-300 hover:text-gray-700">
                              {speaker.designation || speaker.position}
                            </p>
                            {speaker.company_name && (
                              <p className="text-xs text-gray-500 mt-1">
                                {speaker.company_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="mt-10 flex justify-between items-center animate-fadeIn">
        <button 
          className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-all duration-300 hover-scale transform hover:-translate-y-1"
          onClick={scrollToTop}
        >
          <ChevronUp className="mr-2 transition-transform duration-300 hover:scale-110" /> Back to top
        </button>
      </div>
    </div>
      <AppFooter />
      </>
  );
}

export default EnhancedMinimalistAgenda;
