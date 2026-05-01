import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WinnerDetails = () => {
  const { id } = useParams(); // get category ID from URL
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/winners/${id}`
        );
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching winner details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [id]);

  return (
    <div className="px-6 py-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <div className="rounded-3xl mx-auto">
          <h1 className="text-2xl font-extrabold text-gray-800 mb-3">
            🏆 Winner Details
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          // Loading Spinner
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : categoryData && categoryData.winners && categoryData.winners.length > 0 ? (
          <>
            {/* Category Info */}
            

            {/* Winners List */}
            <div className="space-y-6">
              {categoryData.winners.map((winner, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-yellow-500 transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-6">
                    {/* Profile Image */}
                    <div className="w-16 h-16 flex-shrink-0">
                      {winner.profile_image ? (
                        <img
                          src={`data:image/jpeg;base64,${winner.profile_image}`}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(winner.winner_name)}&background=6366f1&color=fff&size=64`;
                          }}
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
                          {winner.winner_name || "N/A"}
                        </h3>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">
                          {winner.company_name || "N/A"}
                        </p>
                        <p className="text-gray-500 text-sm">Company</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md">
                          🏆 Winner
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Winners Found
              </h3>
              <p className="text-gray-500">
                No winner details found for this category.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnerDetails;
