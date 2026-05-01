import { useEffect, useState } from "react";
import EduSkillsAboutSection from "./EduSkillsSummit";
import AppFooter from "./Footer";
import CategoryModal from "../components/CategoryModal";
import awardimg from "../assets/awards.png";
import {
  Edit,
  Send,
  Users,
  ClipboardCheck,
  Gavel,
  Trophy,
  FileText,
  Award,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import GuidelinesSection from "../components/GuidelinesSection";
import { useLocation } from "react-router-dom";
import WinnersRewards from "../components/WinerRewards";


/* ──────────────────────────────
   Awards data & images array
─────────────────────────────── */
const defaultAwardImage = awardimg;

// Card component
const AwardCard = ({ category, onKnowMore }) => (
  <div className="relative flex flex-col items-center justify-center h-80 bg-black rounded-xl overflow-hidden group">
    <img
      src={category.image_url || defaultAwardImage}
      alt={category.category_name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0  mix-blend-multiply" />
    <div className="relative z-10 px-6 text-center flex flex-col items-center">
      <span className="text-md tracking-widest text-[#ffd75e] uppercase">
        {category.is_open ? "Open for Nominations" : "Closed"}
      </span>
      <span className="text-xs text-gray-300 italic mt-1 font-semibold">
        Nomination for:{" "}
        {category.nomination_type === "individual"
          ? "Individual"
          : "Organization"}
      </span>
      <h3 className="mt-2 mb-6 text-md lg:text-lg italic font-semibold text-white leading-snug drop-shadow-lg capitalize">
        {category.category_name}
      </h3>
      <button
        onClick={() => onKnowMore(category)}
        className="inline-block px-5 py-2 border text-sm border-[#ffd75e] text-[#ffd75e] rounded transition-colors duration-200 hover:bg-[#ffd75e] hover:text-[#351744] mt-auto"
      >
        KNOW MORE
      </button>
    </div>
  </div>
);


// Section component
const AwardsSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const maxNominations = 10;

  const today = new Date();
  const winnerOpenDate = new Date('2025-09-02T10:00:00+05:30');
  console.log(winnerOpenDate.toString());


  const isWithinDateRange = (startStr, endStr) => {
    const start = startStr ? new Date(startStr) : null;
    const end = endStr ? new Date(endStr) : null;
    return start && end && today >= start && today <= end;
  };

  const hasNominationStarted = (startStr) => {
    return startStr && today >= new Date(startStr);
  };

  const isNominationClosed = (endStr) => {
    return endStr && today > new Date(endStr);
  };

  const isVotingOpen = (voteStartStr, voteEndStr) => {
    return isWithinDateRange(voteStartStr, voteEndStr);
  };

  const isWinnerButtonEnabled = () => {
    return today >= winnerOpenDate;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/nomination-categories?winners_only=true`
        );
        
        if (!res.ok) {
          console.error(`API Error: ${res.status} ${res.statusText}`);
          setCategories([]);
          setLoading(false);
          return;
        }
        
        const data = await res.json();
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("API returned non-array data:", data);
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleKnowMore = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <section className="py-12 " id="awards">
        <div className="max-w-6xl mx-auto px-2">
          <h2 className="text-2xl md:text-3xl  text-center text-brand_orange mb-2">
            Award Categories
          </h2>
          <div className="w-16 h-1 bg-[#ffd75e] mx-auto mb-6" />
          {loading ? (
            <p className="text-center text-gray-600 text-sm">
              Loading categories...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow text-lg">
                <thead>
                  <tr className="bg-brand_blue text-white text-md">
                    <th className="py-5 px-6 text-left font-semibold">
                      Category & Description
                    </th>
                    <th className="py-5 px-6 font-semibold whitespace-nowrap">
                      Nomination Limits
                    </th>
                    <th className="py-5 px-6 font-semibold">Nominate</th>
                    <th className="py-5 px-6 font-semibold">Vote</th>
                    <th className="py-5 px-6 font-semibold">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {categories
                    ?.filter(category => category.nomination_count > 0)
                    .map((category) => {
                      const {
                        nomination_count,
                        start_date,
                        end_date,
                        vote_start_date,
                        vote_end_date,
                      } = category;

                      const nominationStarted = hasNominationStarted(start_date);
                      const nominationClosed = isNominationClosed(end_date);
                      const nominationsReached = nomination_count >= maxNominations;
                      const disableNominate = nominationsReached || !nominationStarted || nominationClosed;

                      const votingOpen = isVotingOpen(vote_start_date, vote_end_date);
                      const voteStartsInFuture = vote_start_date && today < new Date(vote_start_date);

                      const winnerButtonDisabled = !isWinnerButtonEnabled();

                      return (
                        <tr
                          key={category.category_id}
                          className="border-b last:border-0"
                        >
                          <td className="py-2 px-3">
                            <div className="font-semibold text-[#351744] text-sm">
                              {category.category_name}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {category.description}
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center font-semibold text-md">
                            {nomination_count}/{maxNominations}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <button
                              className={`px-2 py-1 rounded text-sm font-semibold border-2 ${
                                disableNominate
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                  : "bg-[#FFA500] text-[#1161A0] border-[#FFA500] hover:bg-[#FFB733]"
                              }`}
                              disabled={disableNominate}
                              onClick={() => !disableNominate && navigate("/login")}
                            >
                              Nominate
                            </button>
                            {nominationsReached && (
                              <div className="text-[10px] text-red-500 mt-1">
                                Limit reached
                              </div>
                            )}
                            {!nominationStarted && !nominationClosed && (
                              <div className="text-[10px] text-gray-500 mt-1">
                                Not started yet
                              </div>
                            )}
                            {nominationClosed && (
                              <div className="text-[10px] text-gray-500 mt-1">
                                Nominations closed
                              </div>
                            )}
                          </td>
                          <td className="py-2 px-3 text-center text-sm">
                            <button
                              onClick={() => navigate(`/nominees/${category.category_id}`)}
                              className={`px-2 py-1 rounded border text-xs font-semibold ${
                                votingOpen
                                  ? "bg-[#1161A0] text-white border-[#1161A0] hover:bg-[#0b4f83]"
                                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                              }`}
                              disabled={!votingOpen}
                            >
                              Vote
                            </button>
                            {!votingOpen && voteStartsInFuture && (
                              <div className="text-[10px] text-gray-500 mt-1">
                                Voting opens on{" "}
                                {new Date(vote_start_date).toLocaleDateString("en-GB")}
                              </div>
                            )}
                            {!votingOpen && !vote_start_date && (
                              <div className="text-[10px] text-gray-500 mt-1">
                                Voting not started
                              </div>
                            )}
                            {!votingOpen &&
                              vote_start_date &&
                              new Date() > new Date(vote_end_date) && (
                                <div className="text-[10px] text-red-500 mt-1">
                                  Voting closed
                                </div>
                              )}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <button
                              className={`px-2 py-1 rounded text-sm font-semibold border-2 ${
                                winnerButtonDisabled
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                  : "bg-[#FFD700] text-[#351744] border-[#FFD700] hover:bg-[#FFC107]"
                              }`}
                              disabled={winnerButtonDisabled}
                              onClick={() => 
                                !winnerButtonDisabled && navigate(`/winner-by-category/${category.category_id}`)
                              }
                            >
                              Winner
                            </button>
                            {winnerButtonDisabled && (
                              <div className="text-[10px] text-gray-500 mt-1">
                                Opens on 2nd September
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <CategoryModal
        isOpen={isModalOpen}
        category={selectedCategory}
        onClose={closeModal}
      />
    </>
  );
};

/* ──────────────────────────────
   Main Landing Component
─────────────────────────────── */
const HrAwardsLanding = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const steps = [
    {
      icon: Edit,
      title: "Nominations Open",
      desc: "Start submitting your nominations",
      date: "August 5, 2025",
    },
    {
      icon: Send,
      title: "Submission Deadline",
      desc: "Last date to submit nominations",
      date: "August 20, 2025",
    },
    {
      icon: ClipboardList,
      title: "Preliminary Screening",
      desc: "Initial screening by the internal panel",
      date: "August 20, 2025",
    },
    {
      icon: Users,
      title: "Public Voting Starts",
      desc: "Community can vote and support nominations",
      date: "August 16, 2025",
    },
    {
      icon: Gavel,
      title: "Final Jury Review",
      desc: "Expert jury evaluates top nominations",
      date: "September 1, 2025",
    },
    {
      icon: Trophy,
      title: "Winner Announcement",
      desc: "Final results revealed to the public",
      date: "September 2, 2025",
    },
  ];

  return (
    <div className="hr-summit-landing">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXdhcmR8ZW58MHx8MHx8fDA%3D')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 max-w-4xl px-6">
          <div className="w-full flex items-center justify-center">
            <div className=" flex items-center justify-center">
              <img className="h-32 px-4 py-2 animate-pulse-glow-white" src="https://res.cloudinary.com/dleznkbgs/image/upload/v1754307961/HR_Excellence_Award_white_qaipvc.png" alt="Logo" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-4 drop-shadow-lg text-white">
            Welcome To
          </h1>
          <h2 className="text-4xl md:text-7xl font-bold mb-8 text-white drop-shadow-lg">
            HR Excellence Awards 2025
          </h2>
          <div className="mb-8">
            <p className="text-2xl md:text-3xl mb-3 drop-shadow-md">
              19th September 2025
            </p>
            <p className="text-lg md:text-xl drop-shadow-md">
              Queen of Hills, Shimla
            </p>
          </div>
          <button 
            className="bg-brand_orange hover:bg-orange-400 text-white px-10 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl" 
            onClick={() => navigate("/login")}
          >
            Nominate Now
          </button>
        </div>
      </section>

      {/* Evaluation Process */}
      <section
        id="process"
        className="py-20 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand_orange/5 via-transparent to-brand_blue/5" />
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-brand_orange/10 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand_blue/10 rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl text-brand_orange mb-4">
              Process
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r bg-brand_orange mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A transparent and comprehensive evaluation journey designed to
              recognize excellence
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6 relative z-10">
              {steps?.map((step, index, arr) => {
                const isBlue = index % 2 === 0;
                const bgColor = isBlue ? "bg-brand_blue" : "bg-brand_orange";
                const gradientBg = isBlue
                  ? "bg-gradient-to-br from-brand_blue to-blue-600"
                  : "bg-gradient-to-br from-brand_orange to-orange-600";
                const textColor = "text-white";
                const arrowColor = isBlue
                  ? "text-brand_blue"
                  : "text-brand_orange";
                const Icon = step.icon;

                return (
                  <div key={index} className="text-center relative group">
                    <div className=" p-6 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand_orange/5 rounded-full -translate-y-8 translate-x-8" />

                      <div className="absolute top-4 right-4 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-500">
                          {index + 1}
                        </span>
                      </div>

                      <div className="relative z-10 mb-6">
                        <div
                          className={`relative w-20 h-20 ${gradientBg} ${textColor} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon size={32} />
                          <div
                            className={`absolute inset-0 w-20 h-20 ${bgColor} rounded-full animate-ping opacity-20`}
                          />
                        </div>
                      </div>

                      <div className="relative z-10">
                        <h4 className="text-lg  text-gray-800 mb-3">
                          {step.title}
                        </h4>

                        <div
                          className={`inline-block ${gradientBg} text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 shadow-md`}
                        >
                          {step.date}
                        </div>

                        <p className="text-gray-600 text-md leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {index < arr.length - 1 && (
                      <div className="hidden lg:flex absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-20 items-center">
                        <div
                          className={`h-1 w-8 ${gradientBg} rounded-full shadow-sm`}
                        />
                        <div
                          className={`w-3 h-3 ${gradientBg} rounded-full transform rotate-45 -ml-1.5 shadow-sm`}
                        />
                      </div>
                    )}

                    {index < arr.length - 1 && (
                      <div className="lg:hidden flex justify-center mt-6 mb-2">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-1 h-8 ${gradientBg} rounded-full`}
                          />
                          <div
                            className={`w-2 h-2 ${bgColor} rounded-full mt-1`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="categories">
        <AwardsSection />
      </section>
      <section id="guidelines">
        <GuidelinesSection />
      </section>
      <WinnersRewards />
      <AppFooter />
    </div>
  );
};

export default HrAwardsLanding;
