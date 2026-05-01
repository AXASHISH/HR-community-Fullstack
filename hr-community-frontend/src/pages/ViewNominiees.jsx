import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ViewNominiees = () => {
  const { category_id } = useParams();
  const { category } = useLocation()?.state || {};
  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (category_id) {
      fetchNomineesByCategory(category_id);
    }
  }, [category_id]);

  const fetchNomineesByCategory = async (category_id) => {
    setLoading(true); // Start loading
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/get-nomination-by-category?category_id=${category_id}`
      );
      const data = await res.json();
      setNominees(data);
    } catch (error) {
      console.error("Failed to fetch nominees:", error);
    } finally {
      setLoading(false); // Stop loading in both success & error cases
    }
  };

  const getCardBorder = (index) => {
    if (index === 0) return "border-l-4 border-yellow-500";
    if (index === 1) return "border-l-4 border-gray-400";
    if (index === 2) return "border-l-4 border-amber-600";
    return "border-l-4 border-blue-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-8">
      {/* Header Section */}
      {category && (
        <div className="mb-10 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 mx-auto max-w-4xl">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
              🏆 {category.category_name} Leaderboard
            </h1>
            <p className="text-gray-600 text-lg mb-4">{category.description}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                📅 {new Date(category.start_date).toLocaleDateString()} -{" "}
                {new Date(category.end_date).toLocaleDateString()}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                🎯 {category.nomination_type}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          // Loading Spinner
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : nominees.length > 0 ? (
          <>
            {/* All Nominees List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Cast Your Vote
              </h2>
              {nominees.map((nominee, index) => {
                const leader = nominee.leader || {};
                const company = leader?.company || {};
                return (
                  <div
                    key={nominee.nomination_id}
                    className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 ${getCardBorder(
                      index
                    )} transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-6">
                      {/* Profile Image */}
                      <div className="w-16 h-16 flex-shrink-0">
                        {leader?.profile_image ? (
                          <img
                            src={`data:image/png;base64,${leader?.profile_image}`}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-400 text-2xl">👤</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">
                            {leader?.name || "N/A"}
                          </h3>
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">
                            {company?.company_name || "N/A"}
                          </p>
                          <p className="text-gray-500 text-sm">Company</p>
                        </div>
                        <div className="flex items-center justify-center">
                          <a
                            href={nominee?.sharable_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                          >
                            🗳️ Vote Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Nominees Yet
              </h3>
              <p className="text-gray-500">
                The leaderboard is waiting for nominees to join the competition!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewNominiees;
